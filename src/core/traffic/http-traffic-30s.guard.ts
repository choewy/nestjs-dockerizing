import { Injectable } from '@nestjs/common';

import { TrafficOption } from './traffic.option';
import { HttpTrafficBaseGuard } from './http-traffic-base.guard';

@Injectable()
export class HttpTraffic30SecondsGuard extends HttpTrafficBaseGuard {
  constructor() {
    super(TrafficOption.LIMIT_30S);
  }
}
