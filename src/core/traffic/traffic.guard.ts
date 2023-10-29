import { CustomRequest } from '@app-common/interfaces';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';

@Injectable()
export class HttpTrafficGuard extends ThrottlerGuard {
  async handleRequest(ctx: ExecutionContext, limit: number, ttl: number, throttler: ThrottlerOptions): Promise<boolean> {
    const http = ctx.switchToHttp();
    const request = http.getRequest<CustomRequest>();

    const ip = request.ip;
    const key = this.generateKey(ctx, ip, throttler.name);

    await this.storageService.increment(key, ttl);

    console.log(key + ttl);

    return true;
  }
}
