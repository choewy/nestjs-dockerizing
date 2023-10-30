import { HttpException } from '@nestjs/common';

import { ErrorLog, RequestLog } from '@app-common/schemas';

import { RequestErrorLogResponseDto } from './request-error-log.response.dto';

export class RequestLogResponseDto {
  requestId: string;
  method: string;
  path: string;
  body: Record<string, any>;
  params: Record<string, string>;
  query: Record<string, any>;
  exception: HttpException;

  constructor(requestLog: RequestLog, errorLog?: ErrorLog) {
    this.requestId = requestLog.requestId;
    this.method = requestLog.method;
    this.path = requestLog.path;
    this.body = requestLog.body;
    this.params = requestLog.params;
    this.query = requestLog.query;
    this.exception = requestLog.exception;

    if (errorLog) {
      this.exception.cause = new RequestErrorLogResponseDto(errorLog);
    }
  }
}
