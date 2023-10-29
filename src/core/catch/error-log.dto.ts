import { ErrorLog } from '@app-common/schemas';

export class ErrorLogDto {
  requestId?: string;
  errorId: string;
  name: string;
  message: string;
  className?: string;
  handlerName?: string;

  constructor(errorLog: ErrorLog) {
    this.requestId = errorLog.requestId;
    this.errorId = errorLog.errorId;
    this.name = errorLog.name;
    this.message = errorLog.message;
    this.className = errorLog.className;
    this.handlerName = errorLog.handlerName;
  }

  public toJsonString(): string {
    return JSON.stringify(this, null, 2);
  }

  public toMessage(): string {
    return `${this.name}(${this.message}) - ${this.toJsonString()}`;
  }
}
