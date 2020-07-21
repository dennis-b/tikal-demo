export const BASE_URL = 'https://api.airbnb.com/v2'
export const EXPLORE_TABS_URL = `${BASE_URL}/explore_tabs`
export const REVIEWS_URL = `${BASE_URL}/reviews`
export const CALENDAR_DAYS_URL = `${BASE_URL}/calendar_days`
export const CLIENT_ID = '238566025674'
export const API_KEY = 'd306zoyjsyarp7ifhu67rjxn52tv0t20'

export const EXPLORE_TABS_PARAMS = {
    'api_key': API_KEY,
    'section_offset': 0,
    'items_offset': 0,
    _format: "for_explore_search_web",
    'experiences_per_grid': "20",
    'items_per_grid': "50",
    'guidebooks_per_grid': "20",
    'fetch_filters': "true",
    'is_guided_search': "true",
    'selected_tab_id': "home_tab",
    location: "Barcelona",
    _intents: "p1",
    currency: "USD",
    locale: "en",
}
