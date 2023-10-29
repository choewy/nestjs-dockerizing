import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfig } from '@app-common/config';
import { LoggingModule } from '@app-core/logging';
import { CatchModule } from '@app-core/catch';
import { LogModule } from '@app-module/log';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoConnectionName, MongoDbName } from '@app-common/enums';

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
    LoggingModule,
    CatchModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
