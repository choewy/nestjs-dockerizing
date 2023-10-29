import { RequestLog } from '@app-common/schemas';
import { HttpException } from '@nestjs/common';

export class HttpRequestLogDto {
  public readonly requestId: string;
  public readonly ip: string;
  public readonly method: string;
  public readonly path: string;
  public readonly body?: Record<string, any>;
  public readonly params?: Record<string, string>;
  public readonly query?: Record<string, any>;
  public readonly exception?: HttpException;
  public readonly error?: unknown;

  constructor(requestLog: RequestLog, error?: unknown) {
    this.requestId = requestLog.requestId;
    this.ip = requestLog.ip;
    this.method = requestLog.method;
    this.path = requestLog.path;
    this.body = requestLog.body;
    this.params = requestLog.params;
    this.query = requestLog.query;
    this.exception = requestLog.exception;

    if (error instanceof Error) {
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
  }

  public toJsonString(): string {
    return JSON.stringify(this, null, 2);
  }

  public toMessage(): string {
    return `${this.method}(${this.ip}) - ${this.path} - ${this.toJsonString()}`;
  }
}
