import { HydratedDocument, SchemaTypes } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';

@Schema({ collection: 'request_log' })
export class RequestLog {
  @Prop({ required: true })
  requestId: string;

  @Prop({ required: true })
  protocol: string;

  @Prop()
  ip?: string;

  @Prop()
  method?: string;

  @Prop()
  path?: string;

  @Prop()
  event?: string;

  @Prop()
  success: boolean;

  @Prop({ type: SchemaTypes.Mixed })
  body?: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed })
  params?: Record<string, string>;

  @Prop({ type: SchemaTypes.Mixed })
  query?: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed })
  exception?: HttpException;
}

export type RequestLogDocument = HydratedDocument<RequestLog>;
export const RequestLogSchema = SchemaFactory.createForClass(RequestLog);
