import {createBaseRequestSlice, sendPostRequest} from "appRedux/reducers/generic_reducer";
import {AppDispatch, RootState} from "appRedux/store";

export const forgotPasswordSlice = createBaseRequestSlice({name: 'forgotPassword'});

interface ForgotPasswordArgs {
    email: string,
}

export const trySendForgotPassword = (args: ForgotPasswordArgs) => {
    const {email} = args;
    return sendPostRequest('forgotPassword', {'email': email}, forgotPasswordSlice);
};

export const tryResetState = () => (dispatch: AppDispatch) => dispatch(onReset());

export const selectorForgotPassword = (state: RootState) => state.forgotPassword;

export * from 'appRedux/reducers/application/modelViewSlice';

export const {
    onReset
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;