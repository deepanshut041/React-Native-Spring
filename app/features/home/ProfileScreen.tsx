import React, { Component } from 'react';
import { Layout, Avatar, Text, Divider } from '@ui-kitten/components';
import { Image, StyleSheet, View, Button } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as authActions from "../../data/auth/actions";
import { connect } from 'react-redux';

export default class ProfileScreen extends Component<any> {

  
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
        </View>
    )
}

}