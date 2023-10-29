import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoConnectionName } from '@app-common/enums';
import { CustomRequest } from '@app-common/interfaces';
import { HttpRequestLog } from '@app-common/schemas';

@Injectable()
export class LoggingService {
  constructor(
    @InjectModel(HttpRequestLog.name, MongoConnectionName.Logs)
    private readonly httpRequestLogModel: Model<HttpRequestLog>,
  ) {}

  async saveHttpRequestLog(request: CustomRequest, error?: unknown): Promise<HttpRequestLog> {
    return new this.httpRequestLogModel({
      requestId: request.requestId,
      ip: request.ip,
      method: request.method,
      path: request.path,
      body: request.body,
      params: request.params,
      query: request.query,
      error,
    }).save();
  }
}
