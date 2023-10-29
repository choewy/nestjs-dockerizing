import { Request } from 'express';

export interface CustomRequest extends Request {
  requestId: string;
  className: string;
  handlerName: string;
}
