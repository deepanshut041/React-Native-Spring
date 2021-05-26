import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

import ResetPasswordScreen from './ResetPasswordScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'SIGN IN' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'SIGN UP' }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'RESET PASSWORD' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'FORGOT PASSWORD' }} />
        </Stack.Navigator>
    );
}