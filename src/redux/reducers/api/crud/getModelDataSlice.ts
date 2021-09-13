import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BaseRequestSliceState, IResponsePayload, RequestState} from "appRedux/reducers/generic_reducer";
import {API_URL, AppDispatch, RootState} from "appRedux/store";
import {sendPost} from "axios-client-wrapper";
import {customResponseParser} from "axios-client-wrapper";

export interface IHeader {

}

export interface IRow {

}

export interface IModelData {
    headers: Array<IHeader>,
    rows: Array<IRow>
}

export interface IAllModelsData {
    [modelIdentifier: string]: IModelData
}

export interface IGetModelsDataSliceState extends BaseRequestSliceState {
    modelsData: IAllModelsData
}

const setState = (state: any, action: PayloadAction<IResponsePayload | any>, requestSent: boolean, responseReceived: boolean) => {
    const {errors = [], path = 'default', data = {}} = action.payload ? action.payload : {};

    state.errors = errors;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;

    if (Object.keys(data).length === 0) {
        return;
    }

    const key = data.package + '.' + data.model;
    const currentModelData = state.modelsData[key];
    const newRows = currentModelData ? currentModelData.rows : {};

    for (let i = 0; i < data['rows'].length; i++) {
        const row = data['rows'][i];
        const pk = row['id'];
        newRows[pk] = row;
    }

    state.modelsData[data.package + '.' + data.model] = {
        headers: data['headers'],
        rows: newRows
    };

    // new rows might contain duplicates if we are sending updated row
    // remove all rows but one if row.id is the same

    // TODO: Instead of storing rows as array - store it as
    // TODO: dict - it will be easier to update row!!!
    // TODO: also send update with only 'dirty' fields, not all of them!
};

export const getModelDataSlice = createSlice({
    name: 'getModelData',
    initialState: {
        path: '',
        requestState: RequestState.Idle,
        responseData: {},
        errors: [],
        modelsData: {},
    } as IGetModelsDataSliceState,
    reducers: {
        sentGetModelDataRequest: (state, action) => setState(state, action, true, false),
        getModelDataSuccess: (state, action) => setState(state, action, false, true),
        getModelDataFailed: (state, action) => setState(state, action, false, true),
        getModelDataResetState: (state, action: PayloadAction) => setState(state, action, false, false)
    }
});

export const getRangeModelData = (modelPackage: string, model: string, startIdx: number, endIdx: number) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {package: modelPackage, model: model, startIdx: startIdx, endIdx: endIdx}
    });
};

export const getSingleRowModelData = (modelPackage: string, model: string, idx: number) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {package: modelPackage, model: model, idx: idx}
    });
};

export const getAllModelData = (modelPackage: string, model: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {package: modelPackage, model: model}
    });
};

export const tryResetModelDataState = () => (dispatch: AppDispatch) => dispatch(getModelDataResetState());

export const selectorModelData = (state: RootState) => state.getModelData;

export const {
    sentGetModelDataRequest,
    getModelDataSuccess,
    getModelDataFailed,
    getModelDataResetState
} = getModelDataSlice.actions;
export default getModelDataSlice.reducer;