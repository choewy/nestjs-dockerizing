import { BadRequestException, Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getVersion(): string {
    return this.appService.getVersion();
  }

  @Get('error')
  raiseError(): string {
    throw new Error('any error');
  }

  @Get('exception')
  raiseException(): string {
    throw new BadRequestException('bad request exception');
  }
}
