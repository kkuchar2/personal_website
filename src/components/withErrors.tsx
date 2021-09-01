import {getFormFieldError} from "util/api_util";

import React, {useCallback, useEffect, useState} from "react";

import {FieldError} from "components/FormComponents/FormErrors/FieldError";
import {Input} from "kuchkr-react-component-library";
import {InputProps} from "kuchkr-react-component-library/build/components/Input/Input.types";
import {BaseComponentProps} from "kuchkr-react-component-library/build/hoc/baseComponent";
import {useTranslation} from "react-i18next";

const formFieldTheme = {
    backgroundColor: "rgba(255,255,255,0)",
    textColor: "#1f1f1f",
    placeholderTextColor: "#dbdbdb",
    border: "1px solid " + "#afafaf",
    borderFocus: "1px solid " + "#0088ff",
    borderRadius: "0",
    height: "40px",
    width: "280px",
    margin: "30px 0px 0px 0px",

    textTheme: {
        fontWeight: "500",
        textColor: '#3b3b3b',
        fontSize: '1em'
    }
};

export interface WrappedInputProps {
    errors?: any, // TODO
}

const withErrors = (WrappedInput: typeof Input) => {

    function wrapped(props: (WrappedInputProps & InputProps & BaseComponentProps)) {

        const {t} = useTranslation();

        const {id, theme, errors, ...rest} = props;

        const [error, setError] = useState([]);

        useEffect(() => setError(getFormFieldError(errors, id)), [id, errors]);

        const renderError = useCallback(() => {
            if (!error) {
                return;
            }
            if (error.length === 0) {
                return;
            }

            let rows = [];
            for (let i = 0; i < error.length; i++) {
                console.log(error[i]['message']);
                rows.push(<FieldError key={i} error={t(error[i]['message'])}/>);
            }
            return <>{rows}</>;
        }, [error]);

        return <>
            <WrappedInput
                id={id}
                theme={theme ? theme : formFieldTheme}
                {...rest} />
            {renderError()}
        </>;
    }

    return wrapped;
};

export default withErrors;