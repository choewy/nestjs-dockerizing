import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';

import { CustomRequest } from '@app-common/interfaces';
import { RedisService } from '@app-core/redis';

import { TrafficStorage } from './traffic.storage';
import { TrafficOption } from './traffic.option';

@Injectable()
export class HttpTraffic60SecondsGuard extends ThrottlerGuard {
  constructor() {
    super([TrafficOption.LIMIT_60S], new TrafficStorage(new RedisService()), new Reflector());
  }

  protected generateKey(ctx: ExecutionContext, suffix: string, name: string): string {
    return ['throttler', name, super.generateKey(ctx, suffix, name)].join(':');
  }

  async handleRequest(ctx: ExecutionContext, limit: number, ttl: number, throttler: ThrottlerOptions): Promise<boolean> {
    const http = ctx.switchToHttp();
    const request = http.getRequest<CustomRequest>();
    const key = this.generateKey(ctx, request.ip, throttler.name);

    const { totalHits } = await this.storageService.increment(key, ttl);

    if (totalHits > limit) {
      throw new ThrottlerException();
    }

    return true;
  }
}
