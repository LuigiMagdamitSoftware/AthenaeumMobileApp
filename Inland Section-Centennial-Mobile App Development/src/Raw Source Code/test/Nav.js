import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import TopBar from './Header';
import Browse from './Browse';
import UserProfile from './User';

//manages navigation between the profile and browse pages
export default class Tabs extends React.Component{
  render() {
    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;
    //inherit the username string from the main component. this is passed down
    //to each page and component during navigation to allow data modifications
    return (
        <ScrollableTabView tabBarPosition='bottom' tabBarBackgroundColor='white'>
          <Browse tabLabel="Browse" username={username} /*pass the username into each of the pages*//>
          <UserProfile tabLabel="Profile" username={username}/>
        </ScrollableTabView>
    );
  }
}
