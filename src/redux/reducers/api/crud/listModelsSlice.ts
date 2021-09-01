import {addItemToTableSlice} from "appRedux/reducers/api/crud/addItemToTableSlice";
import {createBaseRequestSlice, sendPostRequest} from "appRedux/reducers/generic_reducer";
import {AppDispatch, RootState} from "appRedux/store";

export interface IFieldInfo {
    name: string,
    type: string
}

export const listModelsSlice = createBaseRequestSlice({name: 'listModels'});

export const tryGetListOfModels = () => sendPostRequest('listModels', {}, addItemToTableSlice);

export const tryResetModelListState = () => async (dispatch: AppDispatch) => dispatch(onReset());

export const selectorModelList = (state: RootState) => state.listModels;

export const {onReset} = listModelsSlice.actions;

export default listModelsSlice.reducer;