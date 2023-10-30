import { User } from '@app-common/entities';

import { BaseQuery } from './base.query';

export class UserQuery extends BaseQuery<User> {
  async hasUserById(id: number): Promise<boolean> {
    return !!(await this.repo.findOne({
      select: ['id'],
      where: { id },
    }));
  }

  async findUserById(id: number): Promise<User | null> {
    return this.repo.findOne({
      where: { id },
    });
  }
}
