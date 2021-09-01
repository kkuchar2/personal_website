import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "appRedux/store";
import {sendPost} from "appRedux/util";

const initialState = {
    path: null,
    requestSent: false,
    responseReceived: false,
    responseData: null,
    pendingRow: null,
    errors: []
};

const setState = (state: any, action: PayloadAction<any>, requestSent: boolean, responseReceived: boolean, pendingRow = null) => {
    const {errors = [], path = 'default'} = action.payload ? action.payload : {};

    state.errors = errors;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;
    state.responseData = action.payload.data;
    state.pendingRow = pendingRow ? pendingRow : null;
};

export const updateModelDataSlice = createSlice({
    name: 'updateModelData',
    initialState: initialState,
    reducers: {
        sentUpdateModelDataRequest: (state, action) => setState(state, action, true, false, action.payload.body.data.id),
        updateModelDataSuccess: (state, action) => setState(state, action, false, true),
        updateModelDataFailed: (state, action) => setState(state, action, false, true),
    }
});

export const tryUpdateModelData = (modelPackage: string, model: string, data: object) => {
    return sendPost({
        path: 'updateModel',
        onBefore: sentUpdateModelDataRequest,
        onSuccess: updateModelDataSuccess,
        onFail: updateModelDataFailed,
        body: {
            'package': modelPackage,
            'model': model,
            'data': data
        }
    });
};

export const selectorUpdateModelData = (state: RootState) => state.updateModelData;

export const {
    sentUpdateModelDataRequest,
    updateModelDataSuccess,
    updateModelDataFailed,
} = updateModelDataSlice.actions;

export default updateModelDataSlice.reducer;