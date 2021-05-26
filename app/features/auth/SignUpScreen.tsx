import React, { Component } from 'react';
import { Image, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { Layout, Text, Button, Input, Tooltip, Icon } from '@ui-kitten/components';
import { styles } from './styles';
import { SignUpRequest } from '../../data/auth/types';
import * as authActions from '../../data/auth/actions';
import { connect } from 'react-redux';
import { minLength, isEmail, required, maxLength } from '../utils/form_validation';

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

class SignUpScreen extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    confirm_password: ''
  }

  componentDidMount = () => {
    let component: any = this;
    component.props.initialLoad()
  }

  handleEmailChange = (text: string) => {
    this.setState({ email: text })
  }

  handleNameChange = (text: string) => {
    this.setState({ name: text })
  }

  handlePasswordChange = (text: string) => {
    this.setState({ password: text })
  }

  handleConfirmPasswordChange = (text: string) => {
    this.setState({ confirm_password: text })
  }

  validateForm = () => {
    let {email, password, name, confirm_password} = this.state
    let errors = []
    errors.push(required(password, 'Password'))
    errors.push(required(email, 'Email'))
    errors.push(required(name, 'Name'))
    errors = errors.filter(error => error !== "")
    if (errors.length > 0) return errors.join(', ')
    
    errors.push(minLength(password, 'Password', 8))
    errors.push(isEmail(email, 'Email'))
    errors.push(minLength(name, 'Name', 2))
    errors.push(maxLength(name, 'Name', 20))
    errors.push(password !== confirm_password? "Passwords didn't match": "")
    errors = errors.filter(error => error !== "")
    return errors.join(', ')
  }

  signUp = () => {
    let error = this.validateForm()
    if(error !== "")
      this.props.signUpError(error)
    else
    this.props.signUp({ email: this.state.email, password: this.state.password, name: this.state.name });
  }

  render() {
    let component: any = this;
    const { email, password, name, confirm_password } = this.state;

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
              value={name}
              onChangeText={this.handleNameChange}
              placeholder="Full Name"
              size="large"
              style={styles.input}
            />
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

            <Input
              value={confirm_password}
              onChangeText={this.handleConfirmPasswordChange}
              placeholder="Confirm Password"
              size="large"
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <Tooltip
              anchor={() => (<Button style={styles.actionButon} onPress={this.signUp} size="large">SIGN UP</Button>)}
              visible={component.props.error != null || component.props.data != null}
              accessoryLeft={(props) => component.props.error != null? ErrorButton(props): SuccessButton(props)}
              onBackdropPress={component.props.initialLoad}>
              {component.props.error != null? component.props.error: (component.props.data != null)? "User Registred Successfully": null}
            </Tooltip>

          </Layout>
        </Layout>
        {(component.props.loading === true) ?
          <View style={styles.loading}>
            <ActivityIndicator />
          </View> : null
        }
      </SafeAreaView>)
  }
}

const mapStateToProps = (state: any) => {
  state = state.authReducer.signUpReducer
  return {
    error: state.error,
    loading: state.loading,
    data: state.data
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  signUp: (req: SignUpRequest) => {
    dispatch(authActions.signUp(req));
  },
  signUpError: (error: any) => {
    dispatch(authActions.signUpError(error));
  },
  initialLoad: () => {
    dispatch(authActions.signUpInitial());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);