import { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { MySqlConnectionName } from '@app-common/enums';

export class MySqlConfig {
  private readonly configService = new ConfigService();

  private readonly MYSQL_WRITER_HOST = this.configService.get<string>('MYSQL_WRITER_HOST');
  private readonly MYSQL_WRITER_PORT = this.configService.get<number>('MYSQL_READER_PORT');
  private readonly MYSQL_READER_HOST = this.configService.get<string>('MYSQL_READER_HOST');
  private readonly MYSQL_READER_PORT = this.configService.get<number>('MYSQL_READER_PORT');
  private readonly MYSQL_USERNAME = this.configService.get<string>('MYSQL_USERNAME');
  private readonly MYSQL_PASSWORD = this.configService.get<string>('MYSQL_PASSWORD');
  private readonly MYSQL_SYNC = this.configService.get<'true' | 'false'>('MYSQL_SYNC');
  private readonly MYSQL_DROP = this.configService.get<'true' | 'false'>('MYSQL_DROP');
  private readonly MYSQL_DB = this.configService.get<string>('MYSQL_DB');

  public getModuleOptions(connectionName: MySqlConnectionName, entities: Type<any>[]): TypeOrmModuleOptions {
    return {
      entities,
      name: connectionName,
      type: 'mysql',
      host: connectionName === MySqlConnectionName.Writer ? this.MYSQL_WRITER_HOST : this.MYSQL_READER_HOST,
      port: connectionName === MySqlConnectionName.Writer ? this.MYSQL_WRITER_PORT : this.MYSQL_READER_PORT,
      username: this.MYSQL_USERNAME,
      password: this.MYSQL_PASSWORD,
      database: this.MYSQL_DB,
      synchronize: connectionName === MySqlConnectionName.Writer && this.MYSQL_SYNC === 'true',
      dropSchema: connectionName === MySqlConnectionName.Writer && this.MYSQL_DROP === 'true',
      logging: true,
      autoLoadEntities: true,
    };
  }
}
