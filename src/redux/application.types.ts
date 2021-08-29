export interface RequestSliceState {
    path: string,
    requestSent: boolean,
    responseReceived: boolean,
    responseData: object,
    errors: Array<any>
}