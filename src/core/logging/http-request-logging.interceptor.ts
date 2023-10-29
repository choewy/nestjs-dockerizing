import { v4 } from 'uuid';
import { Observable, catchError, tap } from 'rxjs';

import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor, Scope } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CustomRequest } from '@app-common/interfaces';
import { MetadataKey } from '@app-common/enums';
import { InternalServerException } from '@app-common/exceptions';

import { LoggingService } from './logging.service';
import { HttpRequestLogDto } from './http-request-logging.dto';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  constructor(private readonly reflector: Reflector, private readonly loggingService: LoggingService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const http = ctx.switchToHttp();
    const request = http.getRequest<CustomRequest>();

    request.requestId = [Date.now(), v4()].join('-');
    request.className = ctx.getClass()?.name;
    request.handlerName = ctx.getHandler()?.name;

    const logContext = request.className ?? request.handlerName;
    const skipSaveLog = this.reflector.getAllAndOverride<boolean>(MetadataKey.SkipSaveLog, [ctx.getClass(), ctx.getHandler()]);

    return next.handle().pipe(
      tap(() => {
        this.loggingService
          .saveHttpRequestLog(request, null, skipSaveLog)
          .then((httpRequestLog) => this.logger.verbose(new HttpRequestLogDto(httpRequestLog).toMessage(), logContext));
      }),
      catchError(async (e) => {
        let exception: HttpException = e;

        if (e instanceof HttpException === false) {
          exception = new InternalServerException(e);
        }

        await this.loggingService.saveHttpRequestLog(request, exception).then((httpRequestLog) => {
          this.logger.warn(new HttpRequestLogDto(httpRequestLog, exception.cause).toMessage(), logContext);
        });

        throw exception;
      }),
    );
  }
}
