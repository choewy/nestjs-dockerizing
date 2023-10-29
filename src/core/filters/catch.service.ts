import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CustomRequest } from '@app-common/interfaces';
import { MongoConnectionName } from '@app-common/enums';
import { ErrorLog } from '@app-common/schemas';

@Injectable()
export class CatchService {
  constructor(
    @InjectModel(ErrorLog.name, MongoConnectionName.Logs)
    private readonly errorLogModel: Model<ErrorLog>,
  ) {}

  async saveErrorLog(error: unknown, request?: CustomRequest): Promise<ErrorLog> {
    return new this.errorLogModel({
      requestId: request?.requestId,
      className: request?.className,
      handlerName: request?.handlerName,
      date: new Date(),
      error,
    }).save();
  }
}
