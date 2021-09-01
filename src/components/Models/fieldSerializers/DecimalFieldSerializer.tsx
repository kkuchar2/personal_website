import React from "react";

import {FieldSerializerProps} from "components/Models/fieldSerializers/fieldSerializer.types";
import {Input, Text} from "kuchkr-react-component-library";

const textTheme = {
    textColor: "#323232",
    fontSize: "1.0em",
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

export interface DecimalFieldSerializerProps extends FieldSerializerProps {
    inputCustomTheme: object
}

export const DecimalFieldSerializer = (props: DecimalFieldSerializerProps) => {

    const {name, value, inEditMode, onChange, inputCustomTheme} = props;

    if (inEditMode) {
        return <Input theme={inputCustomTheme ? inputCustomTheme : inputTheme} value={value} title={undefined}
                      placeholder={'Enter value'} onChange={onChange}/>;
    }
    return <Text theme={textTheme} style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default DecimalFieldSerializer;