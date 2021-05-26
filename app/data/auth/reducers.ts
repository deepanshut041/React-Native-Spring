import * as actions from "./constants";
import { combineReducers } from "redux";

const initialState = {
    error: null,
    loading: false
}

const signInReducer = (state = initialState, action: any) => {
    if (action.type == actions.AUTH_SIGNIN_ERROR)
        return { ...state, error: action.error, loading: false }
    else if (action.type == actions.AUTH_SIGNIN_REQUEST)
        return { ...state, error: null, loading: true }
    else
        return state
}

export const authReducer = combineReducers({
    signInReducer
})