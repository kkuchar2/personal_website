import React from "react";

import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Text} from "kuchkr-react-component-library";

import {errorTextTheme, StyledFormError} from "./style";

export interface FormErrorProps {
    error: string
}

export const FormError = (props: FormErrorProps) => {

    const {error} = props;

    return <StyledFormError {...props}>
        <FontAwesomeIcon className={"icon"} icon={faExclamationCircle}/>
        <Text theme={errorTextTheme} text={error}/>
    </StyledFormError>;
};