import { all, takeLatest, put, call, delay } from 'redux-saga/effects';
import axios from "axios";
import * as actions from "./constants";
import * as mainActions from "../main/constants";
import { request } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';


function fetchProfile() {
    return request.get('/api/users/me/')
        .then(response => ({ response }))
        .catch(error => ({ error: error.response.data }));
}


function* handleFetchProfile(action: any) {
    const { response, error } = yield call(fetchProfile);

    if (response) {
        console.log(response.data);
        
        yield put({ type: actions.HOME_PROFILE_SUCCESS, data: response.data });
    } else {
        console.log(error);
        yield put({ type: actions.HOME_PROFILE_ERROR, error: error.error });
    }
}


export default all([
    takeLatest(actions.HOME_PROFILE_REQUEST, handleFetchProfile)
]);

