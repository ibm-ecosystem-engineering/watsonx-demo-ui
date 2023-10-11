import {atom} from "jotai";
import {loadable} from "jotai/utils";

import {isPersonModel, NegativeScreeningModel, PersonModel} from "../models";
import {negativeNewsApi} from "../services/negative-news";

const baseAtom = atom<Promise<NegativeScreeningModel>>(Promise.resolve(undefined))

export const negativeScreeningAtom = atom(
    get => get(baseAtom),
    (_, set, param: PersonModel | Promise<NegativeScreeningModel>) => {
        const value: Promise<NegativeScreeningModel> = isPersonModel(param)
            ? negativeNewsApi().screenPerson(param)
            : param;

        set(baseAtom, value);
    }
)

export const negativeScreeningLoadable = loadable(negativeScreeningAtom)
