import { Controller, Get } from '@nestjs/common';

import { LogService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('request')
  async getRequestLogs() {
    return this.logService.getRequestLogs();
  }

  @Get('error')
  async getErrorLogs() {
    return this.logService.getErrorLogs();
  }
}
