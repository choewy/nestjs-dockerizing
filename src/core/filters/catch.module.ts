import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ErrorLog, ErrorLogSchema } from '@app-common/schemas';
import { MongoConnectionName } from '@app-common/enums';

import { CatchService } from './catch.service';
import { HttpExceptionCatchFilter } from './http-exception-catch.filter';

@Module({
  imports: [MongooseModule.forFeature([{ name: ErrorLog.name, schema: ErrorLogSchema }], MongoConnectionName.Logs)],
  providers: [CatchService, HttpExceptionCatchFilter],
  exports: [HttpExceptionCatchFilter],
})
export class CatchModule {}
