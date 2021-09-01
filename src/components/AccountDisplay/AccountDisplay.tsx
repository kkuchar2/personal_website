import React, {useCallback} from "react";

import {useMediaQuery} from "@material-ui/core";
import {selectorAuth} from "appRedux/reducers/api/account";
import EditableProfilePictureProperty from "components/EditableProfilePictureProperty/EditableProfilePictureProperty";
import LogoutButton from "components/LogoutButton/LogoutButton";
import {Text} from "kuchkr-react-component-library";
import {useSelector} from "react-redux";

import {emailTextTheme, logoutButtonTheme, StyledAccountEmailAndPicture, StyledAccountInfo} from "./style";

export interface AccountDisplayProps {
    showLogoutButton: boolean
}

const AccountDisplay = (props: AccountDisplayProps) => {

    const {showLogoutButton = false} = props;

    const authState = useSelector(selectorAuth);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const renderLogoutButton = useCallback(() => {
        if (!showLogoutButton || isMobile) {
            return;
        }

        return <LogoutButton theme={logoutButtonTheme}/>;
    }, [showLogoutButton, isMobile]);

    const renderUserEmail = useCallback(() => {
        if (isMobile) {
            return;
        }

        return <Text theme={emailTextTheme(isMobile)} text={authState.user.email}/>;
    }, [isMobile]);

    return <StyledAccountInfo>
        <StyledAccountEmailAndPicture>
            <EditableProfilePictureProperty/>
            {renderUserEmail()}
        </StyledAccountEmailAndPicture>
        {renderLogoutButton()}
    </StyledAccountInfo>;
};

export default AccountDisplay;