import IoRedis from 'ioredis';

import { Injectable, Logger } from '@nestjs/common';

import { RedisConfig } from '@app-common/config';

@Injectable()
export class RedisService extends IoRedis {
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    super(new RedisConfig().getConnectionOptions());
  }

  private toJSON<T>(value: string): T | null {
    try {
      const val = JSON.parse(value) as T;

      return val;
    } catch {
      this.logger.error(`cannot transform string to json - (${value})`);

      return null;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    return this.toJSON<T>(await super.get(key));
  }

  async set<T extends { value: any; ttl?: number }>(key: string, value: T): Promise<'OK'> {
    await super.set(key, JSON.stringify(value.value));

    if (value.ttl) {
      await super.expire(key, value.ttl);
    }

    return 'OK';
  }
}
