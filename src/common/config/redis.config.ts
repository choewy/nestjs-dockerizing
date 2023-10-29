import { RedisOptions } from 'ioredis';

import { ConfigService } from '@nestjs/config';

export class RedisConfig {
  private readonly configService = new ConfigService();

  private readonly REDIS_HOST = this.configService.get<string>('REDIS_HOST');
  private readonly REDIS_PORT = this.configService.get<number>('REDIS_PORT');
  private readonly REDIS_USERNAME = this.configService.get<string>('REDIS_USERNAME');
  private readonly REDIS_PASSWORD = this.configService.get<string>('REDIS_PASSWORD');
  private readonly REDIS_DB = this.configService.get<number>('REDIS_DB');

  public getConnectionOptions(): RedisOptions {
    return {
      host: this.REDIS_HOST,
      port: this.REDIS_PORT,
      username: this.REDIS_USERNAME,
      password: this.REDIS_PASSWORD,
      db: this.REDIS_DB,
    };
  }
}
