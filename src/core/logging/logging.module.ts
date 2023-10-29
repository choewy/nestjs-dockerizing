import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RequestLog, RequestLogSchema } from '@app-common/schemas';
import { MongoConnectionName } from '@app-common/enums';

import { HttpRequestLoggingInterceptor } from './http-request-logging.interceptor';
import { LoggingService } from './logging.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RequestLog.name, schema: RequestLogSchema }], MongoConnectionName.Logs)],
  providers: [LoggingService, HttpRequestLoggingInterceptor],
  exports: [HttpRequestLoggingInterceptor],
})
export class LoggingModule {}
