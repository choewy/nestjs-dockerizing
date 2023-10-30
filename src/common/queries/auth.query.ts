import { BaseQuery } from './base.query';

import { Auth, User } from '@app-common/entities';

export class AuthQuery extends BaseQuery<Auth> {
  async hasAuthByEmail(email: string): Promise<boolean> {
    return !!(await this.repo.findOne({
      select: { email: true },
      where: { email },
    }));
  }

  async findAuthByEmail(email: string): Promise<(Auth & { user: User }) | null> {
    return this.repo.findOne({
      relations: { user: true },
      where: { email },
    });
  }
}
