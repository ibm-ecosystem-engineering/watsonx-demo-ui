// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {useAtomValue} from "jotai";
import {Loadable} from "jotai/vanilla/utils/loadable";

import {AtomSelect, SpecificAtomSelectProps} from "../AtomSelect";
import {entityTypesAtomLoadable} from "../../atoms";
import {FormOptionModel} from "../../models";

export const EntityTypeSelect: React.FunctionComponent<SpecificAtomSelectProps> = (props: SpecificAtomSelectProps) => {
    const loadable: Loadable<Promise<FormOptionModel[]>> = useAtomValue(entityTypesAtomLoadable);

    return (
        <AtomSelect
            id={props.id}
            invalidText="Invalid entity type selected"
            labelText="Entity type"
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            readOnly={props.readOnly}
            className={props.className}
            style={props.style}
            loadable={loadable}
        />
    )
}
