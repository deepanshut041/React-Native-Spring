import { all, takeLatest, put, call, delay } from 'redux-saga/effects';
import axios from "axios";
import * as actions from "./constants";
import * as mainActions from "../main/constants";
import { SignInRequest } from "./types";
import { request, setupHttpConfig } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';


function sendSignIn(req: SignInRequest) {
    return request.post('/api/account/signin/', req)
        .then(response => ({ response }))
        .catch(error => ({ error: error.response !== undefined? error.response.data: {error: "Network Error"} }))
}

function sendSignUp(req: SignInRequest) {
    return request.post('/api/account/signup/', req)
        .then(response => ({ response }))
        .catch(error => ({ error: error.response !== undefined? error.response.data: {error: "Network Error"} }))
}

function saveToken(token: string) {
    return AsyncStorage.setItem("ACCESS_TOKEN", token)
}

function cleanToken() {
    return AsyncStorage.clear()
}

function* handleSignIn(action: any) {
    const { requestBody } = action;
    const { response, error } = yield call(sendSignIn, requestBody);

    if (response) {
        yield put({ type: actions.AUTH_SIGNIN_SUCCESS, data: response });
        yield call(saveToken, response.data.tokenType + response.data.accessToken);
        yield delay(500)
        setupHttpConfig()
        yield put({ type: mainActions.MAIN_STORAGE_TOKEN_RESPONSE, accessToken: response.data.tokenType + response.data.accessToken });
    } else {
        yield put({ type: actions.AUTH_SIGNIN_ERROR, error: error.error });
    }
}

function* handleSignUp(action: any) {
    const { requestBody } = action;
    const { response, error } = yield call(sendSignUp, requestBody);

    if (response) {
        yield put({
            type: actions.AUTH_SIGNUP_SUCCESS,
            data: response,
        });
    } else {
        yield put({ type: actions.AUTH_SIGNUP_ERROR, error: error.error });
    }
}

function* handleForgotPassword(action: any) {
    const { email } = action;
    const { status, data } = yield call(email);

    if (status === 200) {
        yield put({
            type: actions.AUTH_FORGOT_PASSWORD_SUCCESS,
            accessToken: data.token,
        });
    } else {
        yield put({
            type: actions.AUTH_FORGOT_PASSWORD_ERROR,
            error: 'Invalid Credentials',
        });
    }
}

function* handleSignOut(action: any) {
    yield call(cleanToken)
    setupHttpConfig()
}

export default all([
    takeLatest(actions.AUTH_SIGNIN_REQUEST, handleSignIn),
    takeLatest(actions.AUTH_SIGNUP_REQUEST, handleSignUp),
    takeLatest(actions.AUTH_FORGOT_PASSWORD_REQUEST, handleForgotPassword),
    takeLatest(actions.AUTH_SIGNOUT, handleSignOut),
]);

