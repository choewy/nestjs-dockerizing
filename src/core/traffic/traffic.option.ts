import { ThrottlerOptions } from '@nestjs/throttler';

import { ThrottlerLimit, ThrottlerName, ThrottlerTtl } from '@app-common/enums';

export class TrafficOption {
  public static get LIMIT_10S(): ThrottlerOptions {
    return {
      name: ThrottlerName.S10,
      ttl: ThrottlerTtl.S10,
      limit: ThrottlerLimit.S10,
    };
  }

  public static get LIMIT_30S(): ThrottlerOptions {
    return {
      name: ThrottlerName.S30,
      ttl: ThrottlerTtl.S30,
      limit: ThrottlerLimit.S30,
    };
  }

  public static get LIMIT_60S(): ThrottlerOptions {
    return {
      name: ThrottlerName.S60,
      ttl: ThrottlerTtl.S60,
      limit: ThrottlerLimit.S60,
    };
  }
}
