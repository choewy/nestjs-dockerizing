import { Response } from 'express';

import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { CustomRequest } from '@app-common/interfaces';

import { CatchService } from './catch.service';
import { ErrorLogDto } from './error-log.dto';
import { HttpExceptionResponseDto } from './http-exception-response.dto';

@Catch()
export class HttpExceptionCatchFilter extends BaseExceptionFilter {
  private readonly logger = new Logger();

  constructor(private readonly catchService: CatchService) {
    super();
  }

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const http = host.switchToHttp();
    const request = http.getRequest<CustomRequest>();
    const response = http.getResponse<Response>();

    if (exception.cause instanceof Error) {
      const errorLog = await this.catchService.saveHttpErrorLog(exception.cause, request);
      this.logger.error(new ErrorLogDto(errorLog).toMessage());
    }

    response.send(new HttpExceptionResponseDto(exception, request, exception.cause));
  }
}
