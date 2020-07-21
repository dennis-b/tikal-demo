import { Controller, Get } from '@nestjs/common';
import { AirbnbService } from "./airbnb.service";

@Controller('listings')
export class AirbnbController {
    constructor(private readonly airbnbService: AirbnbService) {
    }

    @Get()
    getListings(): any {
        return this.airbnbService.getListings();
    }
}
