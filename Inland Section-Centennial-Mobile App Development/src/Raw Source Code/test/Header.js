import React from 'react';
import { View, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';

class SettingsButton extends React.Component{
  render(){
    return(
      <Icon
        name='sc-telegram'
        type='evilicon'
        color='#517fa4'
      />
    )
  }
}
export default class TopBar extends React.Component {
  render() {
    return (
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          rightComponent={<SettingsButton navigation={this.props.navigations}/>}
          centerComponent={{ text: 'Profile', style: { color: 'black', fontSize: 20} }}
          backgroundColor = 'white'
        />
      </View>
    );
  }
}
