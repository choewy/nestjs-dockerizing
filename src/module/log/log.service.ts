import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ErrorLog, RequestLog } from '@app-common/schemas';

import { Model } from 'mongoose';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(RequestLog.name)
    private readonly requestLogModel: Model<RequestLog>,
    @InjectModel(ErrorLog.name)
    private readonly errorLogModel: Model<ErrorLog>,
  ) {}

  async getRequestLogs() {
    return this.requestLogModel.find();
  }

  async getErrorLogs() {
    return this.errorLogModel.find();
  }
}
