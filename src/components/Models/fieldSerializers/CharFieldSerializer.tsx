import React from "react";

import {Input, Text} from "kuchkr-react-component-library";

import {FieldSerializerProps} from "./fieldSerializer.types";

const textTheme = {
    textColor: "#323232",
    fontSize: "1em",
    textAlign: "left"
};

const inputTheme = {
    backgroundColor: "#ffffff",
    textColor: "#2f2f2f",
    placeholderTextColor: "#c5c5c5",
    border: "none",
    borderFocus: "none",
    borderRadius: "6px",
    height: "40px",
    width: "100%",
    padding: "10px",
    fontSize: '1em',

    textTheme: {
        textColor: '#545454',
        fontSize: '1em'
    }
};

export interface CharFieldSerializerProps extends FieldSerializerProps {
    inputCustomTheme: object
}

export const CharFieldSerializer = (props: CharFieldSerializerProps) => {

    const {name, value, inEditMode, onChange, isEditable, inputCustomTheme} = props;

    if (inEditMode && isEditable) {
        return <Input theme={inputCustomTheme ? inputCustomTheme : inputTheme} initialValue={value}
                      placeholder={'Enter new ' + name} title={undefined} onChange={onChange}/>;
    }
    return <Text theme={textTheme} style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default CharFieldSerializer;