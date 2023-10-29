import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfig } from '@app-common/config';
import { LoggingModule } from '@app-core/logging';
import { CatchModule } from '@app-core/catch';
import { LogModule } from '@app-module/log';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoConnectionName, MongoDbName, ThrottlerName } from '@app-common/enums';
import { ThrottlerModule } from '@nestjs/throttler';
import { TrafficModule } from '@app-core/traffic';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new MongoConfig().getConnectionUrl(), {
      dbName: MongoDbName.App,
    }),
    MongooseModule.forRoot(new MongoConfig().getConnectionUrl(), {
      dbName: MongoDbName.App,
      connectionName: MongoConnectionName.Logs,
    }),
    ThrottlerModule.forRoot([
      { name: ThrottlerName.Short, ttl: 1000, limit: 5 },
      { name: ThrottlerName.Medium, ttl: 10000, limit: 20 },
      { name: ThrottlerName.Long, ttl: 30000, limit: 50 },
    ]),
    TrafficModule,
    LoggingModule,
    CatchModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
