import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {sendPost} from "appRedux/util";
import {AppDispatch, RootState} from "appRedux/store";
import {RequestSliceState} from "appRedux/application.types";

const setState = (state, action, requestSent, responseReceived) => {
    const {errors = [], path = 'default'} = action.payload ? action.payload : {};

    state.errors = errors;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;
    state.responseData = action.payload.data;
};

export const addItemToTableSlice = createSlice({
    name: 'addItemToTable',
    initialState: {
        path: null,
        requestSent: false,
        responseReceived: false,
        responseData: null,
        errors: []
    },
    reducers: {
        sentAddItemToTableRequest: (state: RequestSliceState, action: PayloadAction<any>) => {
            setState(state, action, true, false);
        },
        addItemToTableSuccess: (state: RequestSliceState, action: PayloadAction<any>) => {
            setState(state, action, false, true);
        },
        addItemToTableFailed: (state: RequestSliceState, action: PayloadAction<any>) => {
            setState(state, action, false, true);
        },
        addItemToTableResetState: (state: RequestSliceState, action: PayloadAction) => {
            setState(state, action, false, false);
        }
    }
});

export const tryAddItemToTable = (modelPackage, model, itemData) => {
    return sendPost({
        endpointName: 'addItem',
        onBefore: sentAddItemToTableRequest,
        onSuccess: addItemToTableSuccess,
        onFail: addItemToTableFailed,
        body: {
            'package': modelPackage,
            'model': model,
            'data': itemData
        }
    });
};

export const tryResetAddItemToTableState = () => (dispatch: AppDispatch) => dispatch(addItemToTableResetState());

export const selectorAddItemToTable = (state: RootState) => state.addItemToTable;

export const {
    sentAddItemToTableRequest,
    addItemToTableSuccess,
    addItemToTableFailed,
    addItemToTableResetState
} = addItemToTableSlice.actions;

export default addItemToTableSlice.reducer;