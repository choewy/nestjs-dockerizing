import { ErrorLog, RequestLog } from '@app-common/schemas';

import { ErrorRequestResponseDto } from './error-request-log.response.dto';

export class ErrorLogResponseDto {
  request?: ErrorRequestResponseDto;
  errorId: string;
  name: string;
  message: string;
  handlerName: string;
  className: string;
  date: Date;
  error: unknown;

  constructor(errorLog: ErrorLog, requestLog?: RequestLog) {
    if (requestLog) {
      this.request = new ErrorRequestResponseDto(requestLog);
    }

    this.errorId = errorLog.errorId;
    this.name = errorLog.name;
    this.message = errorLog.message;
    this.handlerName = errorLog.handlerName;
    this.className = errorLog.className;
    this.date = errorLog.date;
    this.error = errorLog.error;
  }
}
