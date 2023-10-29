import { Controller, Get, UseGuards } from '@nestjs/common';

import { ThrottlerName } from '@app-common/enums';
import { SkipSaveLog } from '@app-common/metadata';
import { HttpTrafficGuard } from '@app-core/traffic';

import { LogService } from './log.service';

@UseGuards(HttpTrafficGuard(ThrottlerName.S10))
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
