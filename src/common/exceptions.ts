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

export class TooManyRequestsException extends HttpException {
  constructor(cause?: unknown) {
    const statusCode = HttpStatus.TOO_MANY_REQUESTS;

    super(
      {
        error: 'Too Many Requests',
        message: 'too many requests exception',
        statusCode,
      },
      statusCode,
      { cause },
    );
  }
}
