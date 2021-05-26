import { all, takeLatest, put, call } from 'redux-saga/effects';
import axios from "axios";
import * as actions from "./constants";
import * as mainActions from "../main/constants";
import { SignInRequest } from "./types";
import { request } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';


function sendSignIn(req: SignInRequest) {
    return request.post('/api/account/signin/', req);
}

function sendSignUp(email: string, password: string, name: string) {
    return request.post('/api/auth/signup/', {
        email: email,
        password: password,
        name: name,
    });
}

function saveToken(token: string) {
    return AsyncStorage.setItem("ACCESS_TOKEN", token)
}

function cleanToken() {
    return AsyncStorage.clear()
}

function* handleSignIn(action: any) {
    const { requestBody } = action;
    try {
        const { status, data } = yield call(sendSignIn, requestBody);
        yield call(saveToken, data.tokenType + data.accessToken );
        console.log(data.tokenType + data.accessToken);
        yield put({
            type: mainActions.MAIN_STORAGE_TOKEN_RESPONSE,
            accessToken: data.accessToken + data.tokenType,
        });
    } catch (error) {
        yield put({
            type: actions.AUTH_SIGNIN_ERROR,
            error: 'Invalid Credentials',
        });
    }
}

function* handleSignUp(action: any) {
    const { user: { email, password, name } } = action;
    const { status, data } = yield call(sendSignUp, email, password, name);

    // if (status === 200) {
    //     yield put({
    //         type: actions.AUTH_SIGNIN_SUCCESS,
    //         accessToken: data.token,
    //     });
    // } else {
    //     yield put({
    //         type: actions.AUTH_SIGNIN_ERROR,
    //         error: 'Invalid Credentials',
    //     });
    // }
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
}

export default all([
    takeLatest(actions.AUTH_SIGNIN_REQUEST, handleSignIn),
    takeLatest(actions.AUTH_SIGNUP_REQUEST, handleSignUp),
    takeLatest(actions.AUTH_FORGOT_PASSWORD_REQUEST, handleForgotPassword),
    takeLatest(actions.AUTH_SIGNOUT, handleSignOut),
]);

