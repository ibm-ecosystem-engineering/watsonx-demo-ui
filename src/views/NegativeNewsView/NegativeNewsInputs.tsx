// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {useState} from 'react';
import {Button, Form, TextInput} from "@carbon/react";
import {CountrySelect, Stack} from "../../components";
import {FormOptionModel, PersonModel} from "../../models";
import {useNavigate} from "react-router-dom";

export interface NegativeNewsInputsProps {
    party: PersonModel;
    returnUrl: string;
    onSubmit: (subject: PersonModel) => void;
}

export const NegativeNewsInputs: React.FunctionComponent<NegativeNewsInputsProps> = (props: NegativeNewsInputsProps) => {
    const navigate = useNavigate();
    const [party, setParty] = useState<PersonModel>(props.party)

    const setValue = (key: keyof PersonModel, value: string) => {
        const newValue: Partial<PersonModel> = {}

        newValue[key] = value

        setParty(Object.assign({}, party, newValue))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        props.onSubmit(party);
    }

    const handleCancel = () => {
        navigate(props.returnUrl)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div style={{textAlign: 'left'}}>
            <Stack gap={3}>
            <h2>Negative News Screening</h2>
            <TextInput
                id="negativeNewsSubject"
                invalidText="Invalid party name"
                labelText="Party name"
                placeholder="Party name"
                value={party.name}
                onChange={event => setValue('name', event.target.value)}
                required={true}
            />
            <CountrySelect
                id="negativeNewsCountry"
                value={party.countryOfResidence}
                onChange={(data: {selectedItem: FormOptionModel}) => {
                    setValue('countryOfResidence', data.selectedItem?.value || '')
                }}
                required={true}
            />
                <div><Button onClick={handleCancel} kind="tertiary">Cancel</Button> <Button type="submit">Submit</Button></div>
            </Stack>
            </div>
        </Form>
    )
}
