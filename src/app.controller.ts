import { Controller, Get, UseGuards } from '@nestjs/common';

import { SkipSaveLog } from '@app-common/metadata';
import { HttpTraffic10SecondsGuard } from '@app-core/traffic';

import { AppService } from './app.service';

@UseGuards(HttpTraffic10SecondsGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SkipSaveLog()
  getVersion(): string {
    return this.appService.getVersion();
  }
}
