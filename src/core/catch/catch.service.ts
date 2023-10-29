import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CustomRequest } from '@app-common/interfaces';
import { MongoConnectionName } from '@app-common/enums';
import { ErrorLog } from '@app-common/schemas';
import { v4 } from 'uuid';

@Injectable()
export class CatchService {
  constructor(
    @InjectModel(ErrorLog.name, MongoConnectionName.Logs)
    private readonly errorLogModel: Model<ErrorLog>,
  ) {}

  async saveHttpErrorLog(error: Error, request?: CustomRequest): Promise<ErrorLog> {
    return new this.errorLogModel({
      errorId: [Date.now(), v4()].join('-'),
      requestId: request?.requestId,
      name: error.name,
      message: error.message,
      className: request?.className,
      handlerName: request?.handlerName,
      date: new Date(),
      error,
    }).save();
  }
}
