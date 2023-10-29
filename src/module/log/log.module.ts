import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ErrorLog, ErrorLogSchema, RequestLog, RequestLogSchema } from '@app-common/schemas';

import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ErrorLog.name, schema: ErrorLogSchema },
      { name: RequestLog.name, schema: RequestLogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
