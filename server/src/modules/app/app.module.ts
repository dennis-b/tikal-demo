import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirbnbModule } from "../airbnb/airbnb.module";

@Module({
    imports: [
        AirbnbModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule {
}
