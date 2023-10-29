import { Controller, Get } from '@nestjs/common';

import { IgnoreSaveLog } from '@app-core/metadata';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @IgnoreSaveLog()
  getVersion(): string {
    return this.appService.getVersion();
  }
}
