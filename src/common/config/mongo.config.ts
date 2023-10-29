import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import { MongoConnectionName, MongoDbName } from '@app-common/enums';

export class MongoConfig {
  private readonly configService = new ConfigService();

  private readonly MONGO_HOST = this.configService.get<string>('MONGO_HOST');
  private readonly MONGO_PORT = this.configService.get<number>('MONGO_PORT');
  private readonly MONGO_USERNAME = this.configService.get<string>('MONGO_USERNAME');
  private readonly MONGO_PASSWORD = this.configService.get<string>('MONGO_PASSWORD');

  public getConnectionUrl(): string {
    return `mongodb://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}`;
  }

  public getLogConnectionOptions(): MongooseModuleOptions {
    return { dbName: MongoDbName.Logs, connectionName: MongoConnectionName.Logs };
  }
}
