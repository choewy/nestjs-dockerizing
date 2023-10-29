import { HttpRequestLog } from '@app-common/schemas';

export class HttpRequestLogDto {
  public readonly requestId: string;
  public readonly ip: string;
  public readonly method: string;
  public readonly path: string;
  public readonly body?: Record<string, any>;
  public readonly params?: Record<string, string>;
  public readonly query?: Record<string, any>;
  public readonly error?: unknown;

  constructor(httpRequestLog: HttpRequestLog) {
    this.requestId = httpRequestLog.requestId;
    this.ip = httpRequestLog.ip;
    this.method = httpRequestLog.method;
    this.path = httpRequestLog.path;
    this.body = httpRequestLog.body;
    this.params = httpRequestLog.params;
    this.query = httpRequestLog.query;
    this.error = httpRequestLog.error;
  }

  public toJsonString(): string {
    return JSON.stringify(this, null, 2);
  }

  public toMessage(): string {
    return `${this.method}(${this.ip}) - ${this.path} - ${this.toJsonString()}`;
  }
}
