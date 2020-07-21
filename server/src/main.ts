import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cors());
    await app.listen(process.env.PORT || 3003);
}

bootstrap();
