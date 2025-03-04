import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:4000', // Địa chỉ của ứng dụng Next.js
      credentials: true, // Nếu có cookie hoặc auth header
    }),
  );
  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server run at http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();
