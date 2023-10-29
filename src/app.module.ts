import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { MongoConnectionName, MongoDbName } from '@app-common/enums';
import { MongoConfig } from '@app-common/config';
import { TrafficModule, TrafficOption } from '@app-core/traffic';
import { LoggingModule } from '@app-core/logging';
import { CatchModule } from '@app-core/catch';
import { LogModule } from '@app-module/log';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    ThrottlerModule.forRoot([TrafficOption.LIMIT_10S, TrafficOption.LIMIT_30S, TrafficOption.LIMIT_60S]),
    TrafficModule,
    LoggingModule,
    CatchModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
