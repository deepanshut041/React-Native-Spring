import { all, takeEvery, take } from "redux-saga/effects";
import AuthSaga from "./auth/saga";
import MainSaga from "./main/saga"
import HomeSaga from "./home/saga"

export function* mainSaga() {
    yield all([
        MainSaga,
        AuthSaga,
        HomeSaga
    ]);
}