import { Injectable } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';

import { RedisService } from '@app-core/redis';

@Injectable()
export class TrafficStorage implements ThrottlerStorage {
  constructor(private readonly redisService: RedisService) {}

  async increment(key: string, ttl: number): Promise<ThrottlerStorageRecord> {
    let value = await this.redisService.get<ThrottlerStorageRecord>(key);

    if (value) {
      value.totalHits += 1;
      value.timeToExpire = ttl;
    } else {
      value = { totalHits: 1, timeToExpire: ttl } as ThrottlerStorageRecord;
    }

    await this.redisService.set(key, {
      value,
      ttl: Math.ceil(ttl / 1000),
    });

    return value;
  }
}
