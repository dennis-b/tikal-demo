import { HttpService, Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { calcMapWeight, sleep } from "./airbnb.utils";
import { API_KEY, CALENDAR_DAYS_URL, CLIENT_ID, EXPLORE_TABS_PARAMS, EXPLORE_TABS_URL, REVIEWS_URL } from "./constant";

@Injectable()
export class AirbnbService {
    listings = [];
    loaded = false;
    offset = 0;
    lastListingIndex = 0;
    cityData = {
        name: '',
        lat: '',
        lng: '',
    };

    constructor(private httpService: HttpService) {
        this.loadProperties({ offset: 0 })
            .then(this.loadPropsData.bind(this))
            .then(() => {
                this.loaded = true;
                console.log(this.getListings())
            })
    }

    getListings() {
        return {
            cityData: this.cityData,
            listings: this.listings,
            loaded: this.loaded,
            offset: this.offset,
            lastListingIndex: this.lastListingIndex,
        }
    }

    async loadPropsData() {
        for (let i = 0; i < this.listings.length; i++) {
            const listing = this.listings[i];
            const { metadata: { reviews_count: reviewsCount } = { reviews_count: 0 } } = await this.getReview({ listingId: listing.id });
            const { calendar_days: calendarDays = [] } = await this.getCalendarDays({ listingId: listing.id });
            console.log('-----', i)
            this.lastListingIndex = i;
            listing.weight = calcMapWeight({
                reviewsCount,
                availableDays: calendarDays.map(day => day.available)
            })
        }
        return Promise.resolve(this.listings);
    }

    async getReview({ listingId }): Promise<any> {
        const params = {
            'listing_id': listingId,
            'role': 'all',
            'client_id': CLIENT_ID,
            'api_key': API_KEY
        }
        try {
            const { data } = await this.httpService.get(REVIEWS_URL, { params }).toPromise()
            return data;
        } catch (e) {
            console.log(e.toString())
            return [];
        }

    }

    async getCalendarDays({ listingId }): Promise<any> {
        const now = moment()
        const params = {
            'listing_id': listingId,
            'client_id': CLIENT_ID,
            'api_key': API_KEY,
            'start_date': now.format('YYYY-MM-DD'),
            'end_date': now.add(1, "month").format('YYYY-MM-DD')
        }
        try {
            const { data } = await this.httpService.get(CALENDAR_DAYS_URL, { params }).toPromise()
            return data;
        } catch (e) {
            console.log(e.toString())
            return [];
        }

    }

    async loadProperties({ offset }) {
        const params = { ...EXPLORE_TABS_PARAMS, 'items_offset': offset, }
        try {
            const { data } = await this.httpService.get(EXPLORE_TABS_URL, { params }).toPromise()
            const { explore_tabs: exploreTabs, metadata: { geography: { city, lat, lng } } } = data as any
            this.updateCityData({ name: city, lat, lng });
            const [sectionsObj] = exploreTabs;
            const { pagination_metadata: { has_next_page: hasNextPage } } = sectionsObj

            const listingsObj = sectionsObj.sections.find(section => section.result_type === 'listings') || {};
            const { listings = [] } = listingsObj;
            console.log('offset', offset)
            this.offset = offset;
            const listingsArr = listings.map(({ listing: { id, lat, lng } }) => ({ id, lat, lng }));
            this.listings = [...this.listings, ...listingsArr]

            if (hasNextPage) {
                await sleep(500)
                await this.loadProperties({ offset: offset + 50 })
            }
        } catch (e) {
            console.error('error', e.toString())
            await sleep(3000)
            await this.loadProperties({ offset: offset })
        }
    }

    private updateCityData({ name, lat, lng }) {
        if (!this.cityData.name) {
            this.cityData.name = name;
        }
        if (!this.cityData.lat) {
            this.cityData.lat = lat;
        }
        if (!this.cityData.lng) {
            this.cityData.lng = lng;
        }

    }

}
