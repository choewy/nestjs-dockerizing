import { Injectable } from '@nestjs/common';

import { AppConfig } from '@app-common/config';

@Injectable()
export class AppService {
  getVersion(): string {
    return new AppConfig().getVersionLabel();
  }
}
