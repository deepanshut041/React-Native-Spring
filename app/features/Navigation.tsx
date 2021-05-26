import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as mainActions from '../data/main/actions';
import AuthStack from './auth/AuthStack';

import { createStackNavigator, } from '@react-navigation/stack';

import HomeStack from "./home/HomeStack";
import AboutScreen from "./extras/AboutScreen";

const Stack = createStackNavigator();

class Navigation extends Component<any> {

    state = {
        authToken: null,
        isLoading: true
    }

    componentDidMount() {
        this.props.fetchToken();
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.isLoading !== this.props.isLoading || prevProps.accessToken !== this.props.accessToken) {
            this.setState({
                authToken: this.props.accessToken,
                isLoading: this.props.isLoading
            });
        }
    }

    render() {
        return (
            (this.state.isLoading) ? (
                null
            ) : (
                    <NavigationContainer>
                        {!this.state.authToken ? (
                            AuthStack()
                        ) : (
                            HomeStack()
                            )
                        }
                    </NavigationContainer>
                )
        )
    }
}

const mapStateToProps = (state: any) => {
    state = state.mainReducer
    return {
        accessToken: state.accessToken,
        isLoading: state.isLoading
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchToken: () => {
        dispatch(mainActions.fetchToken(null));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);