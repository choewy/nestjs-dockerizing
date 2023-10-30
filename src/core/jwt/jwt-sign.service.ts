import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtConfig } from '@app-common/config';
import { Auth } from '@app-common/entities';

import { JwtSignResult } from './interfaces';
import { JwtAccessTokenPayloadDto, JwtRefreshTokenPayloadDto } from './jwt-sign.payload.dto';

@Injectable()
export class JwtSignService extends JwtService {
  private getAccessTokenExpires() {
    return Date.now() + 1000 * 60 * 60 * 24;
  }

  private getRefreshTokenExpires() {
    return Date.now() + 1000 * 60 * 60 * 24 * 14;
  }

  issueAccessToken(auth: Auth): JwtSignResult<JwtAccessTokenPayloadDto> {
    const payload = new JwtAccessTokenPayloadDto(auth);
    const secret = new JwtConfig().getSecret();
    const expiresIn = this.getAccessTokenExpires();
    const token = this.sign(payload.toPlain(), { secret, expiresIn });

    return { token, expiresIn, payload };
  }

  issueRefreshToken(auth: Auth): JwtSignResult<JwtRefreshTokenPayloadDto> {
    const payload = new JwtRefreshTokenPayloadDto(auth);
    const secret = new JwtConfig().getSecret();
    const expiresIn = this.getRefreshTokenExpires();
    const token = this.sign(payload.toPlain(), { secret, expiresIn });

    return { token, expiresIn, payload };
  }
}
