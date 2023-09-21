// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {ChangeEvent, CSSProperties} from 'react';
import {Select, SelectItem, TextInput} from "@carbon/react";
import {Loadable} from "jotai/vanilla/utils/loadable";

import {FormOptionModel} from "../../models";
import {first} from "../../utils";

export interface AtomSelectProps {
    id: string;
    loadable: Loadable<Promise<FormOptionModel[]>>;
    value: string;
    invalidText: string;
    labelText: string;
    required?: boolean;
    readOnly?: boolean;
    onChange?: (data: {selectedItem: FormOptionModel}) => void;
    className?: string;
    style?: CSSProperties;
}

export interface SpecificAtomSelectProps {
    id: string;
    required?: boolean;
    readOnly?: boolean;
    value: string;
    onChange?: (data: {selectedItem: FormOptionModel}) => void;
    className?: string;
    style?: CSSProperties;
}

const loadFormItems = (loadable: Loadable<Promise<FormOptionModel[]>>): FormOptionModel[] => {
    const items: FormOptionModel[] = loadable.state === 'hasData'
        ? loadable.data
        : [];

    return items
        .filter(item => item.value !== null)
        .filter(item => item.text !== undefined)
        .filter(item => item.value !== 'null')
        .filter(item => item.text !== 'undefined')
}

export const AtomSelect: React.FunctionComponent<AtomSelectProps> = (props: AtomSelectProps) => {

    const items: FormOptionModel[] = loadFormItems(props.loadable);

    const selectedItem = first(items.filter(item => item.value === props.value))
        .orElseGet(() => items.length > 0 ? items[0] : undefined)

    const buildSelectItem = (option: FormOptionModel) => {
        const key = `${props.id}-${option.value}`;

        if (option.value === null || option.value === 'null') {
            console.log('Option: ', Object.assign({}, option, {key}));
        }

        return (<SelectItem key={key} text={option.text} value={option.value} />)
    }

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        const value = event.target.value;
        const selectedItem = first(items.filter(item => item.value === value))
            .orElse(undefined)

        if (props.onChange) {
            props.onChange({selectedItem})
        }
    }

    if (props.readOnly) {
        return (
            <TextInput
                id={props.id}
                labelText={props.labelText}
                style={props.style}
                className={props.className}
                readOnly={props.readOnly}
                value={selectedItem?.text || ''}
            />
        )
    }

    return (
        <Select
            id={props.id}
            invalidText={props.invalidText}
            labelText={props.labelText}
            disabled={props.loadable.state !== 'hasData'}
            value={props.value}
            onChange={handleChange}
            required={props.required}
            readOnly={props.readOnly}
            className={props.className}
            style={props.style}
        >
            {items.map(buildSelectItem)}
        </Select>
    )
}
