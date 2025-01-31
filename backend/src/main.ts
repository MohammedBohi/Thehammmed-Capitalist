import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'; // Import nécessaire pour le chemin
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
