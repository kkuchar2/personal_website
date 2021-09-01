import {createBaseRequestSlice, sendPostRequest} from "appRedux/reducers/generic_reducer";
import {RootState} from "appRedux/store";

export const addItemToTableSlice = createBaseRequestSlice({name: 'addItemToTable'});

interface AddItemToTableArgs {
    modelPackage: string,
    model: string,
    itemData: any
}

export const tryAddItemToTable = (args: AddItemToTableArgs) => {
    const {modelPackage, model, itemData} = args;

    return sendPostRequest('addItem',
        {
            'package': modelPackage,
            'model': model,
            'data': itemData
        },
        addItemToTableSlice);
};

export const selectorAddItemToTable = (state: RootState) => state.addItemToTable;

export default addItemToTableSlice.reducer;