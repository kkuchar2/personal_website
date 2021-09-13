import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "appRedux/store";
import {BaseDialogProps} from "components/Dialogs/types";

export interface DialogSliceState {
    opened: boolean,
    component: (props: any) => JSX.Element | null,
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
            state.component = () => null;
        },
    },
});

export interface ShowDialogArgs<T extends BaseDialogProps> {
    // What dialog component should be displayed
    component: (props: T) => JSX.Element,

    // What props are passed to this dialog component
    props: T
}

export const showDialog = <T extends BaseDialogProps>(args : ShowDialogArgs<T>) => {
    return async (dispatch: AppDispatch) => dispatch(show_dialog(args));
};

export const hideDialog = () => async (dispatch: AppDispatch) => {
    return dispatch(hide_dialog());
};

export const selectorDialogs = (state: RootState) => state.dialog;
export const {show_dialog, hide_dialog} = dialogSlice.actions;
export default dialogSlice.reducer;