import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as actions from "./constants";
import AsyncStorage from '@react-native-async-storage/async-storage';


function fetchToken() {
    return AsyncStorage.getItem("ACCESS_TOKEN").then((token) => ({token})).catch((error) => ({error}))
}

function* handleFetchToken(action: any) {
    const {token, error} = yield call(fetchToken);
    yield put({
        type: actions.MAIN_STORAGE_TOKEN_RESPONSE,
        accessToken: token,
    });
}

export default all([
    takeLatest(actions.MAIN_STORAGE_TOKEN_REQUEST, handleFetchToken)
]);
