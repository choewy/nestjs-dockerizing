import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '@app-common/enums';

export class SystemConfig {
  private readonly configService = new ConfigService();

  private readonly TZ = this.configService.get<string>('TZ');
  private readonly NODE_ENV = this.configService.get<NodeEnv>('NODE_ENV');

  public getTimeZone(): string {
    return this.TZ;
  }

  public getNodeEnv(): NodeEnv {
    return this.NODE_ENV;
  }

  public compareNodeEnv(nodeEnv: NodeEnv): boolean {
    return this.NODE_ENV === nodeEnv;
  }
}
