import React, { Component } from 'react';
import { Image, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { Layout, Text, Button, Input, Icon, Tooltip } from '@ui-kitten/components';
import { styles } from './styles';
import { connect } from 'react-redux';
import * as authActions from '../../data/auth/actions';
import { SignInRequest } from '../../data/auth/types';
import { minLength, isEmail, required } from '../utils/form_validation';

const FacebookIcon = (props: any) => (
  <Icon {...props} name='facebook' />
);

const GoogleIcon = (props: any) => (
  <Icon {...props} name='google' />
);

const ErrorIcon = (props: any) => (
  <Icon style={[props.style, styles.errorIcon]} name='close-circle' />
);

const ErrorButton = (props:any) => (
  <Button style={[props.style, styles.errorButton]} appearance='ghost' status='danger' size='tiny' accessoryLeft={ErrorIcon} ></Button>
)

const SuccessIcon = (props: any) => (
  <Icon style={[props.style, styles.errorIcon]} name='checkmark-circle-2' />
);

const SuccessButton = (props:any) => (
  <Button style={[props.style, styles.errorButton]} appearance='ghost' status='success' size='tiny' accessoryLeft={SuccessIcon} ></Button>
)

class SignInScreen extends Component<any> {

  state = {
    email: '',
    password: '',
    errors: []
  }

  componentDidMount = () => {
    let component: any = this;
    component.props.initialLoad()
  }

  handleEmailChange = (text: string) => {
    this.setState({ email: text })
  }

  handlePasswordChange = (text: string) => {
    this.setState({ password: text })
  }

  submitSignIn = () => {
    let error = this.validateForm()
    if(error !== "")
      this.props.signInError(error)
    else
      this.props.signIn({ email: this.state.email, password: this.state.password });
  }

  validateForm = () => {
    let errors = []
    errors.push(required(this.state.password, 'Password'))
    errors.push(required(this.state.email, 'Email'))
    errors = errors.filter(error => error !== "")

    if (errors.length > 0) return errors.join(', ')
    
    errors.push(minLength(this.state.password, 'Password', 8))
    errors.push(isEmail(this.state.email, 'Email'))
    
    errors = errors.filter(error => error !== "")
    return errors.join(', ')
  }

  goToForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword')
  }

  goToSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    let component: any = this;
    const { email, password } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1, flexDirection: "column" }}>
          <Layout style={styles.screen}>
            <Layout style={styles.imageRow}>
              <Layout style={styles.imageBox}>
                <Image style={styles.image} source={require('../../assets/icon.jpeg')} />
              </Layout>
            </Layout>
            <Input
              value={email}
              onChangeText={this.handleEmailChange}
              placeholder="Email"
              size="large"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              value={password}
              onChangeText={this.handlePasswordChange}
              placeholder="Password"
              size="large"
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
            />

            <Text
              style={[styles.textRight, styles.boldText]}
              onPress={this.goToForgotPassword} status="info">
              Forgot password?
            </Text>

            <Tooltip
              anchor={() => (<Button style={styles.actionButon} onPress={this.submitSignIn} size="large">Login</Button>)}
              visible={component.props.error != null || component.props.data != null}
              accessoryLeft={(props) => component.props.error != null? ErrorButton(props): SuccessButton(props)}
              onBackdropPress={component.props.initialLoad}>
              {component.props.error != null? component.props.error: (component.props.data != null)? "Login Success": null}
            </Tooltip>

            <View style={styles.buttons}>
              <Button style={styles.button} onPress={() => { alert('OAuth Not Implemented Yet') }} appearance='outline' accessoryLeft={FacebookIcon}></Button>
              <Button style={styles.button}  onPress={() => { alert('OAuth Not Implemented Yet') }} appearance='outline' accessoryLeft={GoogleIcon}></Button>
            </View>

            <Text style={styles.textCenter}>
              Don't have an account?
            <Text style={[styles.textCenter, styles.boldText]} status="info" onPress={this.goToSignUp}>SignUp</Text>
            </Text>

            <Text style={styles.textCenter}>

            </Text>
          </Layout>
        </Layout>
        {(this.props.loading) ?
          <View style={styles.loading}>
            <ActivityIndicator />
          </View> : null
        }
      </SafeAreaView>)
  }
}

const mapStateToProps = (state: any) => {
  state = state.authReducer.signInReducer
  return {
    error: state.error,
    loading: state.loading,
    data: state.data
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (req: SignInRequest) => {
    dispatch(authActions.signIn(req));
  },
  signInError: (error: any) => {
    dispatch(authActions.signInError(error));
  },
  initialLoad: () => {
    dispatch(authActions.signInInitial());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);