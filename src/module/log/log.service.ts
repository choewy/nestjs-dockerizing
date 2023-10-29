import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ErrorLog, RequestLog } from '@app-common/schemas';

import { ErrorLogResponseDto, RequestLogResponseDto } from './dto';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(RequestLog.name)
    private readonly requestLogModel: Model<RequestLog>,
    @InjectModel(ErrorLog.name)
    private readonly errorLogModel: Model<ErrorLog>,
  ) {}

  async getRequestLogs() {
    const requestLogs = await this.requestLogModel.find().sort({ date: 'desc' }).exec();
    const requestIds = requestLogs.map(({ requestId }) => requestId);
    const errorLogs = await this.errorLogModel.find({ requestId: { $in: requestIds } }).exec();

    return requestLogs.map(
      (requestLog) =>
        new RequestLogResponseDto(
          requestLog,
          errorLogs.find(({ requestId }) => requestId === requestLog.requestId),
        ),
    );
  }

  async getErrorLogs() {
    const errorLogs = await this.errorLogModel.find().sort({ date: 'desc' }).exec();
    const requestIds = errorLogs.filter(({ requestId }) => requestId).map(({ requestId }) => requestId);
    const requestLogs = await this.requestLogModel.find({ requestId: { $in: requestIds } }).exec();

    return errorLogs.map(
      (errorLog) =>
        new ErrorLogResponseDto(
          errorLog,
          requestLogs.find(({ requestId }) => requestId === errorLog.requestId),
        ),
    );
  }
}
