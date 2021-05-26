import * as actions from "./constants";
import { SignInRequest, SignUpRequest, ForgotPasswordRequest } from "./types"

export const signUp = (requestBody: SignUpRequest) => ({
    type: actions.AUTH_SIGNUP_REQUEST,
    requestBody
});

export const signIn = (requestBody: SignInRequest) => ({
    type: actions.AUTH_SIGNIN_REQUEST,
    requestBody
});

export const signOut = (_: any) => ({
    type: actions.AUTH_SIGNOUT
});

export const forgotPassword = (req: ForgotPasswordRequest) => ({
    type: actions.AUTH_FORGOT_PASSWORD_REQUEST,
    req
});