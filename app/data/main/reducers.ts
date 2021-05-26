import * as actions from "./constants";

const initialState = {
    isLoading: null,
    accessToken: null
}

export const mainReducer = (state = initialState, action: any) => {
    if (action.type == actions.MAIN_STORAGE_TOKEN_RESPONSE)
        return { ...state, isLoading: false, accessToken: action.accessToken }
    else
        return state
}