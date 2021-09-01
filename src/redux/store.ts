import {configureStore} from '@reduxjs/toolkit';
import {dialogReducer, modelViewReducer} from "appRedux/reducers/application";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {
    authReducer,
    confirmReducer,
    forgotPasswordReducer,
    registrationReducer,
    resetPasswordReducer
} from "./reducers/api/account";
import {
    addItemToTableReducer,
    getModelDataReducer,
    listModelsReducer,
    updateModelDataReducer
} from "./reducers/api/crud";

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
        confirm: confirmReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;