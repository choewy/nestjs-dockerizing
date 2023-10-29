import { HydratedDocument, SchemaTypes } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class HttpRequestLog {
  @Prop({ required: true })
  requestId: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  path: string;

  @Prop({ type: SchemaTypes.Mixed })
  body?: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed })
  params?: Record<string, string>;

  @Prop({ type: SchemaTypes.Mixed })
  query?: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed })
  error?: unknown;
}

export type HttpRequestLogDocument = HydratedDocument<HttpRequestLog>;
export const HttpRequestLogSchema = SchemaFactory.createForClass(HttpRequestLog);
