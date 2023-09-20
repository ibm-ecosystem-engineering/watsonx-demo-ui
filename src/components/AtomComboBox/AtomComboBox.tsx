
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {CSSProperties} from 'react';
import {ComboBox} from "@carbon/react";
import {Loadable} from "jotai/vanilla/utils/loadable";

import {FormOptionModel} from "../../models";
import {first} from "../../utils";

export interface AtomComboBoxProps {
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


export interface SpecificAtomComboBoxProps {
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

export const AtomComboBox: React.FunctionComponent<AtomComboBoxProps> = (props: AtomComboBoxProps) => {

    const items: FormOptionModel[] = loadFormItems(props.loadable);

    const selectedItem = first(items.filter(item => item.value === props.value))
        .orElseGet(() => items.length > 0 ? items[0] : undefined)

    const filterItems = (item) => {
        return item?.item?.value?.toLowerCase().includes(item?.inputValue?.toLowerCase());
    }

    return (
        <ComboBox
            id={props.id}
            items={items}
            onChange={props.onChange || (() => undefined)}
            itemToString={(item: FormOptionModel) => item ? item.text : ''}
            required={props.required}
            readOnly={props.readOnly}
            titleText={props.labelText}
            invalidText={props.invalidText}
            initialSelectedItem={selectedItem}
            className={props.className}
            style={props.style}
            shouldFilterItem={filterItems}
        />
    )
}
