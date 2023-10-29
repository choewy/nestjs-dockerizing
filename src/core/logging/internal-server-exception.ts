import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerException extends HttpException {
  constructor(cause?: unknown) {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    super(
      {
        error: 'Internal Server Error',
        message: 'internal server error exception',
        statusCode,
      },
      statusCode,
      { cause },
    );
  }
}
