import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfig } from '@app-common/config';
import { LoggingModule } from '@app-core/interceptors';
import { CatchModule } from '@app-core/filters';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new MongoConfig().getConnectionUrl(), new MongoConfig().getLogConnectionOptions()),
    LoggingModule,
    CatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
