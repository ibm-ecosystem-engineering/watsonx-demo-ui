import {NegativeNewsApi} from "./negative-news.api";
import {NegativeNewsGraphql} from "./negative-news.graphql";

export * from './negative-news.api'

let _instance: NegativeNewsApi
export const negativeNewsApi = (): NegativeNewsApi => {
    if (_instance) {
        return _instance
    }

    return _instance = new NegativeNewsGraphql();
}
