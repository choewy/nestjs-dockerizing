import { Controller, Get, UseGuards } from '@nestjs/common';

import { SkipSaveLog } from '@app-core/metadata';
import { HttpTraffic10SecondsGuard } from '@app-core/traffic';

import { LogService } from './log.service';

@UseGuards(HttpTraffic10SecondsGuard)
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('request')
  @SkipSaveLog()
  async getRequestLogs() {
    return this.logService.getRequestLogs();
  }

  @Get('error')
  @SkipSaveLog()
  async getErrorLogs() {
    return this.logService.getErrorLogs();
  }
}
