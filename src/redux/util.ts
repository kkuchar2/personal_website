import {createNetworkError} from "util/api_util";

import {AppDispatch} from "appRedux/store";
import axios from "axios";
import Cookies from "universal-cookie/es6";

const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

export const BASE_URL_DEV = isProduction ? "https://api.kkucharski.com" : 'http://0.0.0.0:8001';
export const API_URL = BASE_URL_DEV + "/api";

export const buildApiUrl = (name: string) => API_URL + "/" + name;

const sendPostWithCookies = async (url: string, body = {}) => {
    console.debug(`%c[POST]: ${url}, body: ${JSON.stringify(body)}`, "color: #ccff44");

    const csrfToken = new Cookies().get('csrftoken');

    return axios.post(url, body, {
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFTOKEN': csrfToken
        }
    });
};

const sendFileWithCookies = async (url: string, file: File) => {
    console.debug(`%c[POST]: ${url}, file`, "color: #ccff44");

    let data = new FormData(); // creates a new FormData object
    data.append('title', 'ProfileImage');
    data.append('text', 'random_text');
    data.append('img', file); // add your file to form data

    const csrfToken = new Cookies().get('csrftoken');

    console.log('CSRF TOKEN:');
    console.log(csrfToken);

    return axios.post(url, data, {
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFTOKEN': csrfToken
        },
        onUploadProgress: progressEvent => console.log(`Progress uploading file: ${progressEvent.loaded}`)
    });
};

interface RequestParams {
    path: string,
    onBefore: Function,
    onSuccess: Function,
    onFail: Function,
    body: object
}

const sendPostAndParse = (requestFunc: Function, {path, onBefore, onSuccess, onFail, body = {}}: RequestParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(onBefore({errors: [], path: path, body: body}));
            //await new Promise(r => setTimeout(r, 1000));
            parseResponse(path, dispatch, await requestFunc(buildApiUrl(path), body), onSuccess, onFail);
        } catch (e: any) {
            console.log(e);

            if (e.message === 'Network Error') {
                dispatch(onFail({errors: createNetworkError(path), path: path}));
                return;
            }

            if (!e.response) {
                dispatch(onFail({errors: {"any": ["unknown_error"]}, path: path}));
                return;
            }

            if (e.response.status === 401) {
                dispatch(onFail({errors: {"any": ["unauthorized"]}, path: path}));
            }
            else {
                dispatch(onFail({ "any": ["unknown_error"] }));
            }
        }
    };
};

const parseResponse = (path: string, dispatch: AppDispatch, response: any, onSuccess: any, onFail: any) => {
    if (response === undefined) {
        dispatch(onFail("No response"));
        return;
    }

    console.log(`%c-------------- Response for: ${response.config.url} --------------------`, "color: #11ccaa");
    console.log(response); // undefined
    console.log(`%c-------------------------------------------------------------------------------------------`, "color: #11ccaa");

    const responseData = response.data;

    if (responseData === undefined) {
        dispatch(onFail({errors: {"any": ["no_response_data"]}, path: path}));
        return;
    }

    const status = responseData.status;

    if (status === undefined) {
        dispatch(onFail({errors: {"any": ["no_response_data"]}, path: path}));
        return;
    }

    const message = responseData.data;

    if (status === 'success') {
        dispatch(onSuccess({errors: [], path: path, user: message.user, data: message}));
    }
    else {
        dispatch(onFail({errors: message, path: path}));
    }
};

export const sendPost = (params: RequestParams) => sendPostAndParse(sendPostWithCookies, params);

export const sendFilePost = (params: RequestParams) => sendPostAndParse(sendFileWithCookies, params);