import React, { Component } from 'react';
import { Layout, Avatar, Text, Divider, Spinner,  Button } from '@ui-kitten/components';
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as authActions from "../../data/auth/actions";
import * as homeActions from "../../data/home/actions";
import { connect } from 'react-redux';

export class HomeScreen extends Component<any> {


  onSignOut = () => {
    this.props.signOut()
  }

  componentDidMount = () => {
    let component: any = this;
    component.props.initialLoad()
  }

  render() {
    if (this.props.loading === true) {
      return (
        <Layout style={styles.loaderContainer}>
          <Spinner size='giant' />
        </Layout>
      )
    }

    if (this.props.error !== null) {
      return (
        <Layout style={styles.loaderContainer}>
          <Text style={styles.avatarTitle} category='h4'>{this.props.error}</Text>
        </Layout>
      )
    }

    return (
      <Layout style={styles.container}>
        <Layout style={styles.imageContainer}>
          <Image source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} style={styles.avatar} />
          <Text style={styles.avatarTitle} category='h4'>{this.props.data.name}</Text>
          <Text category='h6' style={styles.avatarLocation}>{this.props.data.email}</Text>
          <Text category='h6' style={styles.avatarLocation}>{this.props.data.id}</Text>
          <Button size="large" onPress={this.onSignOut}>Sign Out</Button>
        </Layout>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  container: {
    flex: 3,
    flexDirection: "column",
    padding: 10
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 40,
    marginBottom: 10
  },
  avatarTitle: {
    fontWeight: "bold"
  },
  avatarLocation: {
    marginBottom: 30
  },
  buttonText: {
    marginBottom: 15,
    paddingStart: 15,
    marginTop: 10,
    fontWeight: "bold"
  }
});

const mapStateToProps = (state: any) => {
  state = state.homeReducer.profileReducer
  return {
    error: state.error,
    loading: state.loading,
    data: state.data
  }
};


const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => {
    dispatch(authActions.signOut(null));
  },
  initialLoad: () => {
    dispatch(homeActions.loadProfileInitial());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);