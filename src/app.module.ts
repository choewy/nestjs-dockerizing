import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { MongoConnectionName, MySqlConnectionName } from '@app-common/enums';
import { MongoConfig, MySqlConfig } from '@app-common/config';
import * as Entities from '@app-common/entities';

import { TrafficModule, TrafficOption } from '@app-core/traffic';
import { LoggingModule } from '@app-core/logging';
import { CatchModule } from '@app-core/catch';
import { LogModule } from '@app-module/log';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new MongoConfig().getConnectionUrl(), { dbName: new MongoConfig().getDBName() }),
    MongooseModule.forRoot(new MongoConfig().getConnectionUrl(), {
      dbName: new MongoConfig().getDBName(),
      connectionName: MongoConnectionName.Logs,
    }),
    TypeOrmModule.forRoot(new MySqlConfig().getModuleOptions(MySqlConnectionName.Writer, Object.values(Entities))),
    TypeOrmModule.forRoot(new MySqlConfig().getModuleOptions(MySqlConnectionName.Reader, Object.values(Entities))),
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
