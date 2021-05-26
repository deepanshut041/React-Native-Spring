import React, { Component } from 'react';
import { Image, View, SafeAreaView } from 'react-native';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import { styles } from './styles';

export default class SignUpScreen extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    confirm_password: ''
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

  signUp = () => {
    alert('email: ' + this.state.email + ' password: ' + this.state.password)
  }

  render() {
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

            <Button style={styles.actionButon} onPress={this.signUp} size="large">SIGN UP</Button>
          </Layout>
        </Layout>
      </SafeAreaView>)
  }
}