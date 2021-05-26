import * as actions from "./constants";
import { combineReducers } from "redux";

const initialState = {
    error: null,
    loading: false,
    data: null
}

const signInReducer = (state = initialState, action: any) => {
    if (action.type == actions.AUTH_SIGNIN_INITIAL)
        return { ...initialState }
    else if (action.type == actions.AUTH_SIGNIN_SUCCESS)
        return { ...state, error: null, loading: false, data: action.data }
    else if (action.type == actions.AUTH_SIGNIN_ERROR)
        return { ...state, error: action.error, loading: false, data: null }
    else if (action.type == actions.AUTH_SIGNIN_REQUEST)
        return { ...state, error: null, loading: true, data: null}
    else
        return state
}

const signUpReducer = (state = initialState, action: any) => {
    if (action.type == actions.AUTH_SIGNUP_INITIAL)
        return { ...initialState }
    else if (action.type == actions.AUTH_SIGNUP_SUCCESS)
        return { ...state, error: null, loading: false, data: action.data }
    else if (action.type == actions.AUTH_SIGNUP_ERROR)
        return { ...state, error: action.error, loading: false, data: null }
    else if (action.type == actions.AUTH_SIGNUP_REQUEST)
        return { ...state, error: null, loading: true, data: null}
    else
        return state
}

export const authReducer = combineReducers({
    signInReducer, signUpReducer
})