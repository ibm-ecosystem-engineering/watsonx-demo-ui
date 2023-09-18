export interface KycCaseModel {
    id: string;
    status: string;
    customer: CustomerModel;
    documents: DocumentModel[];
    counterparty?: PersonModel;
    customerOutreach?: string;
    negativeScreening?: NegativeScreeningModel;
    counterpartyNegativeScreening?: NegativeScreeningModel;
    customerRiskAssessment?: CustomerRiskAssessmentModel;
}

export interface PersonModel {
    name: string;
    countryOfResidence: string;
}

export interface CustomerModel extends PersonModel {
    personalIdentificationNumber: string;
    industryType: string;
    entityType: string;
}

export interface DocumentModel {
    id: string;
    name: string;
    path: string;
}

export interface NegativeScreeningModel {
    result: string;
}

export interface CustomerRiskAssessmentModel {
    result: string;
}

export interface ReviewCaseModel {
    id: string;
    counterparty: PersonModel;
    customerOutreach?: string;
    documents: DocumentModel[];
}

export interface ApproveCaseModel {
    id: string;
    customerOutreach: string;
    documents: DocumentModel[];
}


export const createEmptyCase = (): KycCaseModel => {
    return {
        id: 'new',
        customer: {
            name: '',
            countryOfResidence: 'US',
            personalIdentificationNumber: '',
            industryType: '',
            entityType: '',
        },
        status: 'New',
        documents: [],
    }
}

export const createEmptyCustomer = (): CustomerModel => {
    return {
        name: '',
        countryOfResidence: 'US',
        personalIdentificationNumber: '',
        industryType: '',
        entityType: ''
    }
}

export const createNewCase = (customer: CustomerModel): KycCaseModel => {
    return {
        id: '',
        customer,
        status: 'New',
        documents: [],
    }
}

export const createEmptyReviewCase = (id: string): ReviewCaseModel => {
    return {
        id,
        counterparty: {
            name: '',
            countryOfResidence: 'US'
        },
        customerOutreach: '',
        documents: []
    }
}

export const createEmptyApproveCase = (id: string): ApproveCaseModel => {
    return {
        id,
        customerOutreach: 'Completed',
        documents: []
    }
}
