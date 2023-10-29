import { NestFactory } from '@nestjs/core';

import { HttpRequestLoggingInterceptor } from '@app-core/logging';
import { HttpExceptionCatchFilter } from '@app-core/catch';
import { HttpTrafficGuard } from '@app-core/traffic';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(await app.resolve(HttpRequestLoggingInterceptor));
  app.useGlobalFilters(await app.resolve(HttpExceptionCatchFilter));
  app.useGlobalGuards(await app.resolve(HttpTrafficGuard));

  await app.listen(3000);
}

bootstrap();
