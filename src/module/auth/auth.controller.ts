import { Response } from 'express';

import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';

import { HttpTrafficGuard } from '@app-core/traffic';
import { ThrottlerName } from '@app-common/enums';
import { JwtSignService } from '@app-core/jwt';

import { AuthService } from './auth.service';
import { SignInBodyDto, SignUpBodyDto } from './dto';

@Controller('auth')
@UseGuards(HttpTrafficGuard(ThrottlerName.S10))
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtSignService: JwtSignService) {}

  @Post('signup')
  async signUp(@Res() res: Response, @Body() body: SignUpBodyDto): Promise<void> {
    res.status(HttpStatus.CREATED).send(await this.authService.signUp(res, body));
  }

  @Post('signin')
  async signIn(@Res() res: Response, @Body() body: SignInBodyDto): Promise<void> {
    res.status(HttpStatus.OK).send(await this.authService.signIn(res, body));
  }
}
