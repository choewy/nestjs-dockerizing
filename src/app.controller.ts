import { Controller, Get, UseGuards } from '@nestjs/common';

import { ThrottlerName } from '@app-common/enums';
import { HttpTrafficGuard } from '@app-core/traffic';

import { AppService } from './app.service';

@UseGuards(HttpTrafficGuard(ThrottlerName.S10))
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @SkipSaveLog()
  getVersion(): string {
    return this.appService.getVersion();
  }
}
