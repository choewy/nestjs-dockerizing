import { Model } from 'mongoose';

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoConnectionName } from '@app-common/enums';
import { CustomRequest } from '@app-common/interfaces';
import { RequestLog } from '@app-common/schemas';

@Injectable()
export class LoggingService {
  constructor(
    @InjectModel(RequestLog.name, MongoConnectionName.Logs)
    private readonly requestLogModel: Model<RequestLog>,
  ) {}

  async saveHttpRequestLog(request: CustomRequest, exception?: HttpException): Promise<RequestLog> {
    return new this.requestLogModel({
      protocol: 'http',
      requestId: request.requestId,
      ip: request.ip,
      method: request.method,
      path: request.path,
      body: request.body,
      params: request.params,
      query: request.query,
      exception: exception ? exception.getResponse() : undefined,
    }).save();
  }
}
