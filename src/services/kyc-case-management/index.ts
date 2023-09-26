import {KycCaseManagementApi} from "./kyc-case-management.api";
import {KycCaseManagementGraphqlHack} from "./kyc-case-management.graphql-hack";
// import {KycCaseManagementGraphql} from "./kyc-case-management.graphql";

export * from './kyc-case-management.api';

let _instance: KycCaseManagementApi;
export const kycCaseManagementApi = (): KycCaseManagementApi => {
    if (_instance) {
        return _instance;
    }

    return _instance = new KycCaseManagementGraphqlHack();
}
