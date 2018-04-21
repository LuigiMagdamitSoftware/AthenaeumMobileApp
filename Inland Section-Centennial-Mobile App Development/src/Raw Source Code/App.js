import React from 'react';
import { View, Text } from 'react-native';
import Tabs from './tests/Nav'
import Main from './tests/Login'
import UserProfile from './tests/User'
import Page from './tests/Page'
import Settings from './tests/Settings'

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}
