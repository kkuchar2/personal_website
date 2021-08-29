import {configureStore} from '@reduxjs/toolkit';

import {
    authReducer,
    confirmReducer,
    forgotPasswordReducer,
    registrationReducer,
    resetPasswordReducer
} from "appRedux/reducers/api/account";

import {
    addItemToTableReducer,
    getModelDataReducer,
    listModelsReducer,
    updateModelDataReducer
} from "appRedux/reducers/api/crud";

import {
    dialogReducer,
    modelViewReducer,
    mouseReducer,
    navbarReducer,
    themeReducer
} from "appRedux/reducers/application";

import thunkMiddleware from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        registration: registrationReducer,
        auth: authReducer,
        listModels: listModelsReducer,
        getModelData: getModelDataReducer,
        updateModelData: updateModelDataReducer,
        addItemToTable: addItemToTableReducer,
        modelView: modelViewReducer,
        dialog: dialogReducer,
        mouse: mouseReducer,
        confirm: confirmReducer,
        navbar: navbarReducer,
        theme: themeReducer,
    },
    middleware: [thunkMiddleware]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;