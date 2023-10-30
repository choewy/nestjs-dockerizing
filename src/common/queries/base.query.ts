import { Repository } from 'typeorm';

export class BaseQuery<T> {
  constructor(protected readonly repo: Repository<T>) {}
}
