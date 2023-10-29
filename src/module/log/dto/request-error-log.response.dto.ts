import { ErrorLog } from '@app-common/schemas';

export class RequestErrorLogResponseDto {
  errorId: string;
  name: string;
  message: string;
  handlerName: string;
  className: string;
  date: Date;
  error: unknown;

  constructor(errorLog: ErrorLog) {
    this.errorId = errorLog.errorId;
    this.name = errorLog.name;
    this.message = errorLog.message;
    this.handlerName = errorLog.handlerName;
    this.className = errorLog.className;
    this.date = errorLog.date;
    this.error = errorLog.error;
  }
}
