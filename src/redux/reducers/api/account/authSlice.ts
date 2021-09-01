import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "appRedux/store";
import {sendFilePost, sendPost} from "appRedux/util";

export interface User {
    email: string,
    avatarUrl: string
}

const emptyUser =  {email: '', avatarUrl: ''};

const initialState = {
    path: null,
    requestSent: false,
    responseReceived: false,
    loggedIn: false,
    errors: [],
    user: emptyUser,
};

const setState = (state: any, action: PayloadAction<any>, loggedIn: boolean, user: User, requestSent: boolean, responseReceived: boolean = false) => {

    const {errors = state.errors, path = 'default'} = action.payload ? action.payload : {};

    state.loggedIn = loggedIn;
    state.errors = errors;
    state.user = user;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        // Request: password login
        sentLoginRequest: (state, action) => {
            setState(state, action, false, emptyUser, true, false);
        },
        loginSuccess: (state, action) => {
            setState(state, action, true, action.payload.user, false, true);
        },
        loginFailed: (state, action) => {
            setState(state, action, false, emptyUser, false, true);
        },

        // Request: autologin
        sentAutologinRequest: (state, action) => {
            setState(state, action, false, emptyUser, true, false);
        },
        autoLoginSuccess: (state, action) => {
            setState(state, action, true, action.payload.user, false, true);
        },
        autoLoginFailed: (state, action) => {
            setState(state, action, false, emptyUser, false, true);
        },

        // Request: google login
        sentGoogleLoginRequest: (state, action) => {
            setState(state, action, false, emptyUser, true, false);
        },
        googleLoginRequestSuccess: (state, action) => {
            setState(state, action, true, action.payload.user, false, true);
        },
        googleLoginRequestFailure: (state, action) => {
            setState(state, action, false, emptyUser, false, true);
        },

        // Request: logout
        sentLogoutRequest: (state, action) => {
            setState(state, action, state.loggedIn, state.user, true, false);
        },
        logoutSuccess: (state, action) => {
            setState(state, action, false, emptyUser, false, true);
        },
        logoutFailed: (state, action) => {
            setState(state, action, false, emptyUser, false, true);
        },

        // Request: delete account
        sentDeleteAccountRequest: (state, action) => {
            setState(state, action, true, state.user, true, false);
        },
        deleteAccountSuccess: (state, action) => {
            setState(state, action, false, emptyUser, false, true);
        },
        deleteAccountFailed: (state, action) => {
            setState(state, action, state.loggedIn, state.user, false, true);
        },

        removeErrors: (state, action: PayloadAction) => {
            setState(state, action, state.loggedIn, state.user, state.requestSent, state.responseReceived);
        },
        logUserOut: (state, action: PayloadAction) => {
            setState(state, action, false, emptyUser, false, false);
        },

        sentChangeProfileImage: (state, action) => {
            setState(state, action, state.loggedIn, state.user, true, false);
        },
        changeProfileImageSuccess: (state, action) => {
            setState(state, action, state.loggedIn, action.payload.user, false, true);
        },
        changeProfileImageFailed: (state, action) => {
            setState(state, action, state.loggedIn, state.user, true);
        }
    }
});

export const tryLoginWithGoogleCredentials = (accessToken: string) => {
    return sendPost({
        path: 'googleLogin',
        onBefore: sentGoogleLoginRequest,
        onSuccess: googleLoginRequestSuccess,
        onFail: googleLoginRequestFailure,
        body: {access_token: accessToken}
    });
};

export const tryAutoLogin = () => {
    return sendPost({
        path: 'autoLogin',
        onBefore: sentAutologinRequest,
        onSuccess: autoLoginSuccess,
        onFail: autoLoginFailed,
        body: {}
    });
};

export const tryLogin = (user: string, password: string) => {
    return sendPost({
        path: 'login',
        onBefore: sentLoginRequest,
        onSuccess: loginSuccess,
        onFail: loginFailed,
        body: {email: user, password: password}
    });
};

export const tryLogout = () => {
    return sendPost({
        path: 'logout',
        onBefore: sentLogoutRequest,
        onSuccess: logoutSuccess,
        onFail: logoutFailed,
        body: {}
    });
};

export const tryDeleteAccount = () => {
    return sendPost({
        path: 'deleteAccount',
        onBefore: sentDeleteAccountRequest,
        onSuccess: deleteAccountSuccess,
        onFail: deleteAccountFailed,
        body: {}
    });
};

export const tryChangeProfileImage = (file: File) => {
    return sendFilePost({
        path: 'changeProfileImage',
        onBefore: sentChangeProfileImage,
        onSuccess: changeProfileImageSuccess,
        onFail: changeProfileImageFailed,
        body: file
    });
};

export const clearAuthErrors = () => async (dispatch: AppDispatch) => dispatch(removeErrors());

export const selectorAuth = (state: RootState) => state.auth;

export const logOut = () => async (dispatch: AppDispatch) => dispatch(logUserOut());

export const {
    sentLoginRequest,
    sentAutologinRequest,
    loginSuccess,
    autoLoginSuccess,
    loginFailed,
    autoLoginFailed,
    sentLogoutRequest,
    logoutSuccess,
    logoutFailed,
    sentDeleteAccountRequest,
    deleteAccountSuccess,
    deleteAccountFailed,
    removeErrors,
    logUserOut,
    sentGoogleLoginRequest,
    googleLoginRequestSuccess,
    googleLoginRequestFailure,
    sentChangeProfileImage,
    changeProfileImageSuccess,
    changeProfileImageFailed,
} = authSlice.actions;
export default authSlice.reducer;
