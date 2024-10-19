import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // Security middleware
  app.enableCors();
  const logger = new Logger('Bootstrap');
  await app.listen(3000);
  logger.log('Server running on http://localhost:3000');
}
bootstrap();
