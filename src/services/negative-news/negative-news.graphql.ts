import {ApolloClient, gql} from "@apollo/client";

import {NegativeNewsApi} from "./negative-news.api";
import {getApolloClient} from "../../backends";
import {NegativeScreeningModel, PersonModel} from "../../models";

const SCREEN_PERSON = gql`
query ScreenPerson($country: String, $dateOfBirth: String, $name: String!) {
    screenNews(name: $name, dateOfBirth: $dateOfBirth, country: $country) {
        error
        nonNegativeNewsCount
        subject
        summary
        totalScreened
        unrelatedNewsCount
        negativeNewsCount
        negativeNews {
            date
            hasNegativeNews
            link
            negativeNewsTopics
            snippet
            source
            summary
            title
        }
        nonNegativeNews {
            date
            hasNegativeNews
            link
            negativeNewsTopics
            snippet
            source
            summary
            title
        }
        unrelatedNews {
            date
            hasNegativeNews
            link
            negativeNewsTopics
            snippet
            source
            summary
            title
        }
    }
}
`

const VALIDATE_URL = gql`
query ValidateUrl($url: String!) {
    validateUrl(url: $url) {
        isValid
    }
}
`

export class NegativeNewsGraphql implements NegativeNewsApi {
    client: ApolloClient<unknown>;

    constructor() {
        this.client = getApolloClient();
    }

    screenPerson(person: PersonModel): Promise<NegativeScreeningModel> {
        return this.client
            .query<{screenNews: NegativeScreeningModel}>({
                query: SCREEN_PERSON,
                variables: {
                    name: person.name,
                    country: person.countryOfResidence,
                    dateOfBirth: person.dateOfBirth
                }
            })
            .then(result => result.data.screenNews)
    }

    validateUrl<T extends { link: string }, R extends T & { isValid: boolean }>(data: T): Promise<R> {
        return this.client
            .query<{validateUrl: {isValid: boolean, link: string}}>({
                query: VALIDATE_URL,
                variables: {url: data.link}
            })
            .then(result => Object.assign({}, data, result.data.validateUrl)) as any
    }

}