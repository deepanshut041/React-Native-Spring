import React, { Component } from 'react';
import { Image, View, SafeAreaView } from 'react-native';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import { styles } from './styles';

export default class ResetPasswordScreen extends Component {
  state = {
    code: '',
    password: '',
    confirm_password: ''
  }

  handleCodeChange = (text: string) => {
    this.setState({ code: text })
  }

  handlePasswordChange = (text: string) => {
    this.setState({ password: text })
  }

  handleConfirmPasswordChange = (text: string) => {
    this.setState({ confirm_password: text })
  }

  resetPassword = () => {
    alert('code: ' + this.state.code + ' password: ' + this.state.password)
  }

  render() {
    const { code, password, confirm_password } = this.state;

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
              value={code}
              onChangeText={this.handleCodeChange}
              placeholder="Verification Code"
              size="large"
              style={styles.input}
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

            <Button style={styles.actionButon} onPress={this.resetPassword} size="large">RESET PASSWORD</Button>
          </Layout>
        </Layout>
      </SafeAreaView>)
  }
}