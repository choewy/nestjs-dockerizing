import { Response } from 'express';
import { DataSource, Repository } from 'typeorm';

import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MySqlConnectionName } from '@app-common/enums';
import { User, Auth } from '@app-common/entities';
import { AuthQuery } from '@app-common/queries';
import { BcryptService } from '@app-core/bcrypt';
import { JwtSignService } from '@app-core/jwt';
import { Cookie } from '@app-core/cookie';

import { SignInBodyDto, SignResponseDto, SignUpBodyDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Auth, MySqlConnectionName.Reader)
    private readonly authRepository: Repository<Auth>,
    private readonly bcryptService: BcryptService,
    private readonly jwtSignService: JwtSignService,
  ) {}

  private setTokensInCookie(res: Response, auth: Auth): SignResponseDto {
    const access = this.jwtSignService.issueAccessToken(auth);
    const refresh = this.jwtSignService.issueRefreshToken(auth);

    Cookie.withResponse(res).setAccessToken(access.token, access.expiresIn).setRefreshToken(refresh.token, refresh.expiresIn);

    return new SignResponseDto(access.payload);
  }

  async signUp(res: Response, body: SignUpBodyDto): Promise<SignResponseDto> {
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException();
    }

    const authQuery = new AuthQuery(this.authRepository);

    if (await authQuery.hasAuthByEmail(body.email)) {
      throw new ConflictException();
    }

    const auth = await this.dataSource.transaction(async (em) => {
      const userRepository = em.getRepository(User);
      const user = await userRepository.save(userRepository.create({ name: body.name }));

      const authRepository = em.getRepository(Auth);
      const auth = authRepository.create({
        user,
        email: body.email,
        ...this.bcryptService.encryptPassword(body.password),
      });

      return authRepository.save(auth);
    });

    console.log(auth);

    return this.setTokensInCookie(res, auth);
  }

  async signIn(res: Response, body: SignInBodyDto): Promise<SignResponseDto> {
    const authQuery = new AuthQuery(this.authRepository);
    const auth = await authQuery.findAuthByEmail(body.email);

    if (!auth) {
      throw new UnauthorizedException();
    }

    if (!this.bcryptService.comparePassword(body.password, auth.password)) {
      throw new UnauthorizedException();
    }

    return this.setTokensInCookie(res, auth);
  }
}
