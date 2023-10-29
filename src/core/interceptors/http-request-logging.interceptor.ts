import { Observable, catchError, tap } from 'rxjs';
import { v4 } from 'uuid';

import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, Scope } from '@nestjs/common';

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
    const context = ctx.getClass()?.name || ctx.getHandler()?.name;

    request.requestId = [Date.now(), v4()].join('-');

    return call$.handle().pipe(
      tap(async () => {
        const httpRequestLog = await this.loggingService.saveHttpRequestLog(request);
        const httpRequestLogDto = new HttpRequestLogDto(httpRequestLog);

        this.logger.verbose(httpRequestLogDto.toMessage(), context);
      }),
      catchError(async (error) => {
        const httpRequestLog = await this.loggingService.saveHttpRequestLog(request);
        const httpRequestLogDto = new HttpRequestLogDto(httpRequestLog);

        this.logger.warn(httpRequestLogDto.toMessage(), context);

        throw error;
      }),
    );
  }
}
