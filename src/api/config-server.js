import LRU from 'lru-cache';
import websiteConfig from '../config/website';

export function createAPI(){
    let api = {};
    if (process.__API__) {
        api = process.__API__
    } else {
        api = process.__API__ = {
            api: websiteConfig.host,
            cached: LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            cachedItem: {}
        }
    }
    api.onServer = true;
    return api;
}

