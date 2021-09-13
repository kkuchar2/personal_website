import React, {useCallback, useEffect} from 'react';

import {selectorRegistration, tryResetRegistrationState} from "appRedux/reducers/api/account";
import EmailSentPopup from "components/EmailSentPopup/EmailSentPopup";
import RegistrationForm from "components/FormComponents/RegistrationForm/RegistrationForm";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {useDispatch, useSelector} from "react-redux";

import {StyledRegistrationPage} from "./style";

const RegistrationPage = () => {

    const registrationState = useSelector(selectorRegistration);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tryResetRegistrationState());
    }, []);

    const renderRegistrationForm = useCallback(() => {
        return <div className={"wrapperSignIn"}>
            <RegistrationForm/>
        </div>;
    }, []);

    const renderEmailSentPopup = useCallback(() => {
        return <div className={"wrapperEmailSent"}>
            <EmailSentPopup
                resetFunc={tryResetRegistrationState}
                title={"Registration successful!"}
                message={"We've sent you a link to confirm your email address. Please check your inbox."}/>
        </div>;
    }, []);

    return <StyledRegistrationPage>
        {renderRegistrationForm()}
    </StyledRegistrationPage>;
};

export default EnsureAuthorized(RegistrationPage) as React.FC;