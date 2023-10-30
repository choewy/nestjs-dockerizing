import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MySqlConnectionName } from '@app-common/enums';
import { Auth, User } from '@app-common/entities';
import { BcryptService } from '@app-core/bcrypt';
import { JwtSignService } from '@app-core/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth], MySqlConnectionName.Reader)],
  controllers: [AuthController],
  providers: [BcryptService, JwtSignService, AuthService],
})
export class AuthModule {}
