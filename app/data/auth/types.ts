export interface SignInRequest {
    email: String,
    password: String
}

export interface SignUpRequest {
    name: String,
    email: String,
    password: String
}

export interface ForgotPasswordRequest {
    email: String
}

export interface ApiResposne {
    message: String
}