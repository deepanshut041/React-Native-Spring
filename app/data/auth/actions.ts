import * as actions from "./constants";
import { SignInRequest, SignUpRequest, ForgotPasswordRequest } from "./types"

export const signUp = (requestBody: SignUpRequest) => ({
    type: actions.AUTH_SIGNUP_REQUEST,
    requestBody
});

export const signUpError = (error: any) => ({
    type: actions.AUTH_SIGNUP_ERROR,
    error
});

export const signUpInitial = () => ({
    type: actions.AUTH_SIGNUP_INITIAL
});

export const signInInitial = () => ({
    type: actions.AUTH_SIGNIN_INITIAL
});

export const signIn = (requestBody: SignInRequest) => ({
    type: actions.AUTH_SIGNIN_REQUEST,
    requestBody
});

export const signInError = (error: any) => ({
    type: actions.AUTH_SIGNIN_ERROR,
    error
});

export const signOut = (_: any) => ({
    type: actions.AUTH_SIGNOUT
});

export const forgotPassword = (req: ForgotPasswordRequest) => ({
    type: actions.AUTH_FORGOT_PASSWORD_REQUEST,
    req
});