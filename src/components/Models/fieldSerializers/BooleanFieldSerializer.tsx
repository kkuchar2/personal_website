import React from "react";

import {booleanSelectTheme} from "components/Models/TableRow/style";
import {Select, Text} from "kuchkr-react-component-library";

import {FieldSerializerProps} from "./fieldSerializer.types";

const textTheme = {
    textColor: "#323232",
    fontSize: "1.0em",
    textAlign: "left"
};

export const BooleanFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange, isEditable} = props;

    if (inEditMode && isEditable) {
        return <Select
            theme={booleanSelectTheme}
            initialIndex={value ? 0 : 1}
            items={[true, false]}
            onChange={(idx, value) => onChange(value)}
        />;
    }
    return <Text theme={textTheme} style={{width: '100%'}} text={value ? 'True' : 'False'}/>;
};

export default BooleanFieldSerializer;