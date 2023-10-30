import { JwtAccessTokenPayloadDto } from '@app-core/jwt';

export class SignResponseDto {
  readonly name: string;
  readonly email: string;

  constructor(payload: JwtAccessTokenPayloadDto) {
    this.name = payload.name;
    this.email = payload.email;
  }
}
