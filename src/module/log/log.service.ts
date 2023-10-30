import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ErrorLog, RequestLog } from '@app-common/schemas';
import { ListResponseDto } from '@app-common/dtos';

import { LogType } from './enums';
import { ErrorLogResponseDto, GetLogQueryDto, RequestLogResponseDto } from './dto';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(RequestLog.name)
    private readonly requestLogModel: Model<RequestLog>,
    @InjectModel(ErrorLog.name)
    private readonly errorLogModel: Model<ErrorLog>,
  ) {}

  private async getRequestLogsAndCount(skip: number, take: number): Promise<[number, number, Array<RequestLogResponseDto>]> {
    const [total, requestLogs] = await Promise.all([
      this.requestLogModel.count(),
      this.requestLogModel.find().skip(skip).limit(take).sort({ date: 'desc' }).exec(),
    ]);

    const requestIds = requestLogs.map(({ requestId }) => requestId);
    const errorLogs = await this.errorLogModel.find({ requestId: { $in: requestIds } }).exec();

    const rows = requestLogs.map(
      (row) =>
        new RequestLogResponseDto(
          row,
          errorLogs.find(({ requestId }) => requestId === row.requestId),
        ),
    );

    return [total, rows.length, rows];
  }

  private async getErrorLogsAndCount(skip: number, take: number): Promise<[number, number, Array<ErrorLogResponseDto>]> {
    const [total, errorLogs] = await Promise.all([
      this.errorLogModel.count(),
      this.errorLogModel.find().skip(skip).limit(take).sort({ date: 'desc' }).exec(),
    ]);

    const requestIds = errorLogs.filter(({ requestId }) => requestId).map(({ requestId }) => requestId);
    const requestLogs = await this.requestLogModel.find({ requestId: { $in: requestIds } }).exec();

    const rows = errorLogs.map(
      (row) =>
        new ErrorLogResponseDto(
          row,
          requestLogs.find(({ requestId }) => requestId === row.requestId),
        ),
    );

    return [total, rows.length, rows];
  }

  async getLogs(query: GetLogQueryDto) {
    let total: number;
    let count: number;
    let rows: RequestLogResponseDto[] | ErrorLogResponseDto[];

    switch (query.type) {
      case LogType.Request:
        [total, count, rows] = await this.getRequestLogsAndCount(query.skip, query.take);
        break;

      case LogType.Error:
        [total, count, rows] = await this.getErrorLogsAndCount(query.skip, query.take);
        break;
    }

    return new ListResponseDto(total, count, rows, query);
  }
}
