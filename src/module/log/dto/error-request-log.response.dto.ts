import { HttpException } from '@nestjs/common';

import { RequestLog } from '@app-common/schemas';

export class ErrorRequestResponseDto {
  requestId: string;
  method: string;
  path: string;
  body: Record<string, any>;
  params: Record<string, string>;
  query: Record<string, any>;
  exception: HttpException;

  constructor(requestLog: RequestLog) {
    this.requestId = requestLog.requestId;
    this.method = requestLog.method;
    this.path = requestLog.path;
    this.body = requestLog.body;
    this.params = requestLog.params;
    this.query = requestLog.query;
    this.exception = requestLog.exception;
  }
}
