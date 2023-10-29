import { Module } from '@nestjs/common';
import { HttpTrafficGuard } from './traffic.guard';

@Module({
  providers: [HttpTrafficGuard],
  exports: [HttpTrafficGuard],
})
export class TrafficModule {}
