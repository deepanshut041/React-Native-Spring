import React, { Component } from 'react';
import { Layout, Avatar, Text, Divider } from '@ui-kitten/components';
import { Image, StyleSheet, View, Button } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as authActions from "../../data/auth/actions";
import { connect } from 'react-redux';

class ProfileScreen extends Component<any> {

  listTypeButton = (title: string, fun: any) => {
    return (
      <TouchableOpacity style={styles.button} onPress={fun}>
        <Text style={styles.buttonText} category='h6'>{title}</Text>
      </TouchableOpacity>)
  }

  onSignOut = () => {
    this.props.signOut()
  }

  render() {
    return (
      <Layout style={styles.container}>
        <Layout style={styles.imageContainer}>
          <Image source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} style={styles.avatar} />
          <Text style={styles.avatarTitle} category='h4'>Deepanshu Tyagi</Text>
          <Text category='h6' style={styles.avatarLocation}>Monteral</Text>
        </Layout>
        {this.listTypeButton("Sign Out", this.onSignOut)}
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
    padding: 10
  },
  imageContainer: {
    flexDirection: "column",
    alignItems:"center"
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 10
  },
  avatarTitle: {
    fontWeight:"bold"
  },
  avatarLocation:{
    marginBottom: 30
  },
  button: {
    borderBottomWidth: 1
  },
  buttonText: {
    marginBottom: 15,
    paddingStart: 15,
    marginTop: 10,
    fontWeight:"bold"
  }
});

const mapStateToProps = (state: any) => ({
  
});

const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => {
    dispatch(authActions.signOut(null));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);