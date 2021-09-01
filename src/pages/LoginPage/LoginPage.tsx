import React from 'react';

import LoginForm from "components/FormComponents/LoginForm/LoginForm";
import  { EnsureAuthorized } from "hoc/EnsureAuthorized";

import {StyledLoginPage} from "./style";

const LoginPage = () => {

    return <StyledLoginPage>
        <div className={"wrapper"}>
            <LoginForm/>
        </div>
    </StyledLoginPage>;
};

export default EnsureAuthorized(LoginPage) as React.FC;