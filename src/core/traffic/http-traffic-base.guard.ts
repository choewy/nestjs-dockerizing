import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';

import { CustomRequest } from '@app-common/interfaces';
import { RedisService } from '@app-core/redis';
import { TooManyRequestsException } from '@app-common/exceptions';

import { TrafficStorage } from './traffic.storage';

export class HttpTrafficBaseGuard extends ThrottlerGuard {
  constructor(option: ThrottlerOptions) {
    super([option], new TrafficStorage(new RedisService()), new Reflector());
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
      throw new TooManyRequestsException();
    }

    return true;
  }
}
