import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ThrottlerName } from '@app-common/enums';
import { SkipSaveLog } from '@app-common/metadata';
import { HttpTrafficGuard } from '@app-core/traffic';

import { LogService } from './log.service';
import { GetLogQueryDto } from './dto';

@UseGuards(HttpTrafficGuard(ThrottlerName.S10))
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @SkipSaveLog()
  async getLogs(@Query() query: GetLogQueryDto) {
    return this.logService.getLogs(query);
  }
}
