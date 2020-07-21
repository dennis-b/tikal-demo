import { API_KEY, BASE_URL, CLIENT_ID } from "./constant";

function getParamsStr({ params }) {
    const keys = Object.keys(params);
    let result = '&';
    keys.forEach((key) => result += `${key}=${params[key]}&`)
    return result;
}

export const getApiEndPoint = ({ url, params }: { url: string, params: any }) => {
    const paramsStr = getParamsStr({ params })
    return `${BASE_URL}/${url}?client_id=${CLIENT_ID}&api_key=${API_KEY}${paramsStr}`
}

export function sleep(time) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), time))

}
