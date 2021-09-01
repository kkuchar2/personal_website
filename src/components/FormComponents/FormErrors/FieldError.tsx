import React from "react";

import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Text} from "kuchkr-react-component-library";

import {errorTextTheme, StyledFieldError} from "./style";

export interface FieldErrorProps {
    error: string
}

export const FieldError = (props: FieldErrorProps) => {

    const {error} = props;

    return <StyledFieldError {...props}>
        <FontAwesomeIcon className={"icon"} icon={faExclamationCircle}/>
        <Text theme={errorTextTheme} text={error}/>
    </StyledFieldError>;
};