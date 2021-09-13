import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_URL, AppDispatch, RootState} from "appRedux/store";
import {sendFilePost, sendPost} from "axios-client-wrapper";
import {customResponseParser} from "axios-client-wrapper";

export interface User {
    email: string,
    avatar: string
}

const emptyUser = {email: '', avatar: ''};

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
        apiUrl: API_URL,
        path: 'googleLogin',
        onBefore: sentGoogleLoginRequest,
        onSuccess: googleLoginRequestSuccess,
        onFail: googleLoginRequestFailure,
        responseParser: customResponseParser,
        body: {access_token: accessToken}
    });
};

export const tryAutoLogin = () => {
    return sendPost({
        apiUrl: API_URL,
        path: 'autoLogin',
        onBefore: sentAutologinRequest,
        onSuccess: autoLoginSuccess,
        onFail: autoLoginFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {}
    });
};

export const tryLogin = (user: string, password: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'login',
        onBefore: sentLoginRequest,
        onSuccess: loginSuccess,
        onFail: loginFailed,
        responseParser: customResponseParser,
        body: {email: user, password: password}
    });
};

export const tryLogout = () => {
    return sendPost({
        apiUrl: API_URL,
        path: 'logout',
        onBefore: sentLogoutRequest,
        onSuccess: logoutSuccess,
        onFail: logoutFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {}
    });
};

export const tryDeleteAccount = () => {
    return sendPost({
        apiUrl: API_URL,
        path: 'deleteAccount',
        onBefore: sentDeleteAccountRequest,
        onSuccess: deleteAccountSuccess,
        onFail: deleteAccountFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {}
    });
};

export const tryChangeProfileImage = (file: File) => {
    return sendFilePost({
        apiUrl: API_URL,
        path: 'changeProfileImage',
        onBefore: sentChangeProfileImage,
        onSuccess: changeProfileImageSuccess,
        onFail: changeProfileImageFailed,
        responseParser: customResponseParser,
        onUploadProgress: e => {
        },
        file: file
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
