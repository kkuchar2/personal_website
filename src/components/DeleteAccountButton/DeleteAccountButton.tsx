import React, {useCallback} from "react";

import {tryDeleteAccount} from "appRedux/reducers/api/account";
import {hideDialog, showDialog} from "appRedux/reducers/application";
import {ConfirmationDialog} from "components/Dialogs/ConfirmationDialog/ConfirmationDialog";
import {Button} from "kuchkr-react-component-library";
import {useDispatch} from "react-redux";

import {deleteAccountButtonTheme} from "./style";

const DeleteAccountButton = () => {

    const dispatch = useDispatch();

    const onDeleteAccountConfirmed = useCallback(() => {
        dispatch(hideDialog());
        dispatch(tryDeleteAccount());
    }, []);

    const onDeleteAccountCanceled = useCallback(() => {
        dispatch(hideDialog());
    }, []);

    const deleteAccount = useCallback(() => {
        dispatch(showDialog({
            component: ConfirmationDialog,
            props: {
                title: 'Delete account',
                description: 'All data associated with this account will be deleted',
                onConfirm: onDeleteAccountConfirmed,
                onCancel: onDeleteAccountCanceled,
            },
        }));
    }, []);

    return <Button theme={deleteAccountButtonTheme} text={"Delete Account"} onClick={deleteAccount}/>;
};

export default DeleteAccountButton;