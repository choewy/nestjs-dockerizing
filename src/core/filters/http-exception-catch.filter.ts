import { Response } from 'express';

import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { CustomRequest } from '@app-common/interfaces';

import { CatchService } from './catch.service';
import { HttpExceptionResponseDto } from './http-exception-response.dto';

@Catch()
export class HttpExceptionCatchFilter extends BaseExceptionFilter {
  constructor(private readonly catchService: CatchService) {
    super();
  }

  async catch(e: Error | HttpException, host: ArgumentsHost): Promise<void> {
    let error: Error;
    let exception = e as HttpException;

    if (exception instanceof HttpException === false) {
      error = e;
      exception = new HttpException(
        {
          error: 'Internal Server Error',
          message: 'internal server error exception',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const http = host.switchToHttp();
    const request = http.getRequest<CustomRequest>();
    const response = http.getResponse<Response>();

    await this.catchService.saveErrorLog(e, request);

    response.send(new HttpExceptionResponseDto(exception, request, error));
  }
}
