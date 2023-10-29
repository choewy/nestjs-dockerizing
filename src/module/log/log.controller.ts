import { Controller, Get } from '@nestjs/common';

import { LogService } from './log.service';
import { IgnoreSaveLog } from '@app-core/metadata';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('request')
  @IgnoreSaveLog()
  async getRequestLogs() {
    return this.logService.getRequestLogs();
  }

  @Get('error')
  @IgnoreSaveLog()
  async getErrorLogs() {
    return this.logService.getErrorLogs();
  }
}
