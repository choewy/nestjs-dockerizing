import { ConfigService } from '@nestjs/config';

export class MongoConfig {
  private readonly configService = new ConfigService();

  private readonly MONGO_HOST = this.configService.get<string>('MONGO_HOST');
  private readonly MONGO_PORT = this.configService.get<number>('MONGO_PORT');
  private readonly MONGO_USERNAME = this.configService.get<string>('MONGO_USERNAME');
  private readonly MONGO_PASSWORD = this.configService.get<string>('MONGO_PASSWORD');
  private readonly MONGO_DB = this.configService.get<string>('MONGO_DB');

  public getConnectionUrl(): string {
    return `mongodb://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}`;
  }

  public getDBName(): string {
    return this.MONGO_DB;
  }
}
