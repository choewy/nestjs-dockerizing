import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';

import { LogType } from '../enums';

export class GetLogQueryDto {
  @IsNotEmpty()
  @IsEnum(LogType)
  type: LogType;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  skip: number;

  @IsNotEmpty()
  @IsInt()
  take: number;
}
