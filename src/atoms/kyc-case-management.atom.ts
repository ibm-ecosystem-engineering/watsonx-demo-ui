import {atom, Atom} from "jotai";
import {atomWithObservable, loadable} from "jotai/utils";

import {kycCaseManagementApi} from "../services";
import {KycCaseModel} from "../models";

const kycCasesAtom = atom(() => kycCaseManagementApi().listCases())
export const kycCasesLoadable = loadable(kycCasesAtom)

export const kycCaseAtom: Atom<KycCaseModel[]> = atomWithObservable(
    () => kycCaseManagementApi().subscribeToCases(),
    {initialValue: []}
)

const baseSelectedCaseAtom = atom<Promise<KycCaseModel | undefined>>(Promise.resolve(undefined))

type CaseInput = string | KycCaseModel;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const selectedKycCaseAtom = atom<Promise<KycCaseModel | undefined>, CaseInput[]>(
    (get) => get(baseSelectedCaseAtom),
    (_, set, caseId: CaseInput) => {
        const result = (typeof caseId === 'string') ? kycCaseManagementApi().getCase(caseId) : Promise.resolve(caseId);

        set(baseSelectedCaseAtom, result);

        return result;
    }
);

export const selectedKycCaseAtomLoadable = loadable(selectedKycCaseAtom);

export const watchSelectedKycCaseAtom = atom(
    get => get(selectedKycCaseAtom),
    async (_get, set, caseId: CaseInput) => {

        const service = kycCaseManagementApi();

        set(selectedKycCaseAtom, caseId)

        const result = (typeof caseId === 'string') ? service.getCase(caseId) : Promise.resolve(caseId);

        const kycCase = await result;

        if (kycCase !== undefined) {
            service.watchCase(kycCase.id)
                .subscribe({
                    next: kycCase => {
                        console.log('Case change')
                        set(selectedKycCaseAtom, kycCase)
                    },
                    error: err => console.error('Error watching case: ', {err}),
                    complete: () => console.log('Complete')
                })
        }
    }
)