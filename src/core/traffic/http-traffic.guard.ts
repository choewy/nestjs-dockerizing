import { ThrottlerName } from '@app-common/enums';

import { HttpTraffic10SecondsGuard } from './http-traffic-10s.guard';
import { HttpTraffic30SecondsGuard } from './http-traffic-30s.guard';
import { HttpTraffic60SecondsGuard } from './http-traffic-60s.guard';

export const HttpTrafficGuard = (name: ThrottlerName) => {
  switch (name) {
    case ThrottlerName.S10:
      return HttpTraffic10SecondsGuard;

    case ThrottlerName.S30:
      return HttpTraffic30SecondsGuard;

    case ThrottlerName.S60:
      return HttpTraffic60SecondsGuard;
  }
};
