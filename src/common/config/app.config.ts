import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '@app-common/enums';

export class AppConfig {
  private readonly configService = new ConfigService();

  private readonly VERSION = this.configService.get<string>('VERSION');
  private readonly NODE_ENV = this.configService.get<NodeEnv>('NODE_ENV');

  public getVersionLabel(): string {
    const subfix = this.NODE_ENV === NodeEnv.Production ? '' : `-${this.NODE_ENV}`;

    return `${this.VERSION}${subfix}`;
  }
}
