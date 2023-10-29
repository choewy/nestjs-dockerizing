import { Module } from '@nestjs/common';

import { RedisService } from '@app-core/redis';

import { TrafficStorage } from './traffic.storage';

import { HttpTraffic10SecondsGuard } from './http-traffic-10s.guard';
import { HttpTraffic30SecondsGuard } from './http-traffic-30s.guard';
import { HttpTraffic60SecondsGuard } from './http-traffic-60s.guard';

@Module({
  providers: [RedisService, TrafficStorage, HttpTraffic10SecondsGuard, HttpTraffic30SecondsGuard, HttpTraffic60SecondsGuard],
  exports: [HttpTraffic10SecondsGuard, HttpTraffic30SecondsGuard, HttpTraffic60SecondsGuard],
})
export class TrafficModule {}
