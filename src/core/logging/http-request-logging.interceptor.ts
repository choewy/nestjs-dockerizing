import { Observable, catchError, tap } from 'rxjs';
import { v4 } from 'uuid';

import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, Logger, NestInterceptor, Scope } from '@nestjs/common';

import { CustomRequest } from '@app-common/interfaces';

import { LoggingService } from './logging.service';
import { HttpRequestLogDto } from './http-request-logging.dto';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  constructor(private readonly loggingService: LoggingService) {}

  intercept(ctx: ExecutionContext, call$: CallHandler): Observable<any> | Promise<Observable<any>> {
    const http = ctx.switchToHttp();
    const request = http.getRequest<CustomRequest>();

    request.requestId = [Date.now(), v4()].join('-');
    request.className = ctx.getClass()?.name;
    request.handlerName = ctx.getHandler()?.name;

    const context = request.className ?? request.handlerName;

    return call$.handle().pipe(
      tap(() => {
        this.loggingService
          .saveHttpRequestLog(request)
          .then((httpRequestLog) => this.logger.verbose(new HttpRequestLogDto(httpRequestLog).toMessage(), context));
      }),
      catchError(async (e) => {
        let exception: HttpException = e;

        if (e instanceof HttpException === false) {
          exception = new HttpException(
            {
              error: 'Internal Server Error',
              message: 'internal server error exception',
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
          exception.cause = e;
        }

        const httpRequestLog = await this.loggingService.saveHttpRequestLog(request, exception);
        this.logger.warn(new HttpRequestLogDto(httpRequestLog, exception.cause).toMessage(), context);

        throw exception;
      }),
    );
  }
}
