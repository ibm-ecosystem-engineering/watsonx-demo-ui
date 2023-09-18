// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {ChangeEvent, CSSProperties} from 'react';
import {Select, SelectItem} from "@carbon/react";
import {Loadable} from "jotai/vanilla/utils/loadable";

import {FormOptionModel} from "../../models";

export interface AtomSelectProps {
    id: string;
    loadable: Loadable<Promise<FormOptionModel[]>>;
    value: string;
    invalidText: string;
    labelText: string;
    required?: boolean;
    readOnly?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    className?: string;
    style?: CSSProperties;
}

export interface SpecificAtomSelectProps {
    id: string;
    required?: boolean;
    readOnly?: boolean;
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    className?: string;
    style?: CSSProperties;
}

export const AtomSelect: React.FunctionComponent<AtomSelectProps> = (props: AtomSelectProps) => {

    const items: FormOptionModel[] = props.loadable.state === 'hasData' ? props.loadable.data : [];

    return (
        <Select
            id={props.id}
            invalidText={props.invalidText}
            labelText={props.labelText}
            disabled={props.loadable.state !== 'hasData'}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            readOnly={props.readOnly}
            className={props.className}
            style={props.style}
        >
            {items.map(option => <SelectItem key={option.value} text={option.text} value={option.value} />)}
        </Select>
    )
}
