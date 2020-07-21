import { Module } from '@nestjs/common';
import { CoreModule } from "../core/core.module";
import { AirbnbService } from "./airbnb.service";
import { AirbnbController } from "./airbnb.controller";

@Module({
    imports: [
        CoreModule
    ],
    controllers: [
        AirbnbController
    ],
    providers: [
        AirbnbService
    ],
})
export class AirbnbModule {
}
