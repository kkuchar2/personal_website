import React from 'react';

import { EnsureAuthorized } from "hoc/EnsureAuthorized";


const RegistrationPage = () => {

    return <div />;
};

export default EnsureAuthorized(RegistrationPage) as React.FC;