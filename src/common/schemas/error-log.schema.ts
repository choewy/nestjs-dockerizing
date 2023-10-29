import { HydratedDocument, SchemaTypes } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ErrorLog' })
export class ErrorLog {
  @Prop({
    _id: true,
    required: true,
    type: SchemaTypes.String,
  })
  errorId: string;

  @Prop()
  requestId?: string;

  @Prop()
  name?: string;

  @Prop()
  message?: string;

  @Prop()
  className?: string;

  @Prop()
  handlerName?: string;

  @Prop({ type: SchemaTypes.Mixed })
  error?: unknown;

  @Prop()
  date: Date;
}

export type ErrorLogDocument = HydratedDocument<ErrorLog>;
export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
