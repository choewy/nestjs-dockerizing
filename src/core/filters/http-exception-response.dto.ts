import { HttpException, HttpStatus } from '@nestjs/common';

import { CustomRequest } from '@app-common/interfaces';

export class HttpExceptionResponseDto {
  requestId: string;
  status: HttpStatus;
  name: string;
  message: string;
  error?: any;

  constructor(exception: HttpException, request?: CustomRequest, error?: unknown) {
    this.requestId = request?.requestId;
    this.status = exception.getStatus();
    this.name = exception.name;
    this.message = exception.message;

    if (error instanceof Error) {
      this.error = {
        name: error.name,
        message: error.message,
        cause: error.cause,
      };
    }
  }
}
