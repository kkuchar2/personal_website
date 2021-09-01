import {ElementType} from "react";

import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "appRedux/store";

export interface DialogSliceState {
    opened: boolean,
    component: ElementType | null,
    componentProps: any
}

const dialogSlice = createSlice({
    name: "dialogs",
    initialState: {
        opened: false
    } as DialogSliceState,
    reducers: {
        show_dialog: (state, action) => {
            state.opened = true;
            state.component = action.payload.component;
            state.componentProps = action.payload.props;
        },
        hide_dialog: (state) => {
            state.opened = false;
            state.component = null;
        },
    },
});

export const showDialog = (component: any) => async (dispatch: AppDispatch) => dispatch(show_dialog(component));
export const hideDialog = () => async (dispatch: AppDispatch) => dispatch(hide_dialog());

export const selectorDialogs = (state: RootState) => state.dialog;
export const {show_dialog, hide_dialog} = dialogSlice.actions;
export default dialogSlice.reducer;