import * as actions from "./constants";
import { combineReducers } from "redux";

const initialState = {
    error: null,
    loading: true,
    data: null
}

const profileReducer = (state = initialState, action: any) => {
    if (action.type == actions.HOME_PROFILE_REQUEST)
        return { ...state, error: null, loading: true, data: null }
    else if (action.type == actions.HOME_PROFILE_SUCCESS)
        return { ...state, error: null, loading: false, data: action.data }
    else if (action.type == actions.HOME_PROFILE_ERROR)
        return { ...state, error: action.error, loading: false, data: null }
    else
        return state
}


export const homeReducer = combineReducers({
    profileReducer
})