import express from 'express';

import { NestFactory } from '@nestjs/core';

import { HttpRequestLoggingInterceptor } from '@app-core/logging';
import { HttpExceptionCatchFilter } from '@app-core/catch';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalInterceptors(await app.resolve(HttpRequestLoggingInterceptor));
  app.useGlobalFilters(await app.resolve(HttpExceptionCatchFilter));

  await app.listen(3000);
}

bootstrap();
