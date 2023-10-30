import { JwtPayload } from 'jsonwebtoken';

import { Auth } from '@app-common/entities';
import { instanceToPlain } from 'class-transformer';

export class JwtAccessTokenPayloadDto implements JwtPayload {
  readonly authId: number;
  readonly userId: number;
  readonly email: string;
  readonly name: string;

  constructor(auth: Auth) {
    this.authId = auth.id;
    this.email = auth.email;
    this.userId = auth.user.id;
    this.name = auth.user.name;
  }

  public toPlain() {
    return instanceToPlain(this);
  }
}

export class JwtRefreshTokenPayloadDto implements JwtPayload {
  readonly authId: number;
  readonly userId: number;

  constructor(auth: Auth) {
    this.authId = auth.id;
    this.userId = auth.user.id;
  }

  public toPlain() {
    return instanceToPlain(this);
  }
}
