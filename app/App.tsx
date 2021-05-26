import React, { Component } from 'react';
import { Provider as ReduxProvider } from "react-redux";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import 'react-native-gesture-handler';
import { store } from './data/store';
import { setupHttpConfig } from './data/utils/http';

import Navigation from "./features/Navigation";


export default class App extends Component {
  constructor(props: any) {
    super(props);
    setupHttpConfig();
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light}}>
          <Navigation/>
        </ApplicationProvider>
      </ReduxProvider>
    );
  }
}

