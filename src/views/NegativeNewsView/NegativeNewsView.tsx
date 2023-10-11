// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {useState} from 'react';
import {Loading} from "@carbon/react";
import {useAtomValue, useSetAtom} from "jotai";

import {NegativeNewsInputs} from "./NegativeNewsInputs";
import {negativeScreeningAtom, negativeScreeningLoadable} from "../../atoms";
import {NegativeNews, Stack} from "../../components";
import {NegativeScreeningModel, PersonModel} from "../../models";
import {negativeNewsApi} from "../../services/negative-news";

export interface NegativeNewsViewProps {
    returnUrl: string;
}

export const NegativeNewsView: React.FunctionComponent<NegativeNewsViewProps> = (props: NegativeNewsViewProps) => {
    const [party, setParty] = useState<PersonModel>({name: '', countryOfResidence: 'United States', dateOfBirth: ''})
    const loadable = useAtomValue(negativeScreeningLoadable)
    const setNews = useSetAtom(negativeScreeningAtom)

    const handleSubmit = (newSubject: PersonModel) => {
        setNews(negativeNewsApi().screenPerson(newSubject));
        setParty(newSubject)
    }

    const news: NegativeScreeningModel = (loadable as {state: string, data: NegativeScreeningModel}).data
    return (
        <Stack gap={5}>
            <NegativeNewsInputs returnUrl={props.returnUrl} party={party} onSubmit={handleSubmit} />
            {loadable.state === 'loading' ? <Loading active={true} description="Loading negative news" id="negative-news-loading" withOverlay={false} /> : <></>}
            {loadable.state === 'hasError' ? <div>Error: {loadable.error.toString()}</div> : <></>}
            {news ? <NegativeNews type="Party" subject={party.name} news={news} hideTitle={true} /> : <></>}
        </Stack>
    )
}
