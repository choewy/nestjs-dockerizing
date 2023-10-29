import { Injectable } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';

@Injectable()
export class TrafficStorage implements ThrottlerStorage {
  increment(key: string, ttl: number): Promise<ThrottlerStorageRecord> {}
}
