import bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { EncodePasswordResult } from './interfaces';

@Injectable()
export class BcryptService {
  public encryptPassword(password: string, salt?: string): EncodePasswordResult {
    if (salt === undefined) {
      salt = bcrypt.genSaltSync(10);
    }

    return { salt, password: bcrypt.hashSync(password, salt) };
  }

  public comparePassword(password: string, encrypted: string): boolean {
    return bcrypt.compareSync(password, encrypted);
  }
}
