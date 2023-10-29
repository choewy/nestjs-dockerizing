import { NestFactory } from '@nestjs/core';

import { HttpRequestLoggingInterceptor } from '@app-core/interceptors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(await app.resolve(HttpRequestLoggingInterceptor));

  await app.listen(3000);
}

bootstrap();
