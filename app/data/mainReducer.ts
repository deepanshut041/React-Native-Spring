import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { mainReducer } from "./main/reducers";
import * as authConstants from "./auth/constants";

const appReducer = combineReducers({
    mainReducer,
    authReducer
})

export const rootReducers = (state: any, action: any) => {
    if (action.type === authConstants.AUTH_SIGNOUT) {
        state = undefined
    }
    return appReducer(state, action);
}