import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class AboutScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>About Screen</Text>
      </View>
    )
  }
}