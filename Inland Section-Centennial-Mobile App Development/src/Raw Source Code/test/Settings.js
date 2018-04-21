import React from 'react';
import { View, Text, Share, StyleSheet, ScrollView } from 'react-native';
import { Header, Tile, Divider, SocialIcon, Button, Icon } from 'react-native-elements'
var t = require('tcomb-form-native');

var Form = t.form.Form;

var Report = t.struct({
  Bug: t.String,              // a required string        // a boolean
});

var options = {
  auto: 'none'
};

class BackButton extends React.Component{
  render(){
    return(
      <Icon
        name='close'
        type='evilicon'
        color='black'
        onPress={() => this.props.navigation.goBack()}
        size={30}
      />
    )
  }
}

export default class Settings extends React.Component{

  onClick() {
    Share.share({
      message: 'Sent from the Athenaeum App by Centennial FBLA. See you at SLC!',
      url: 'http://www.cafbla.org/pages/CAFBLA',
      title: 'Wow, did you see that?'
    }, {
    // Android only:
      dialogTitle: 'with love, from Centennial High School, Corona',
    // iOS only:

    })
  }
  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log(value)
  }
  render(){
    return(
      <ScrollView style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={<BackButton navigation = {this.props.navigation}/>}
          centerComponent={{ text: 'Settings', style: { color: 'black', fontSize: 20} }}
          backgroundColor = 'white'
        />
        <Tile
          imageSrc={{uri: ('http://elmhurstpubliclibrary.org/lib/wp-content/uploads/First-Floor-Map.jpg')}}
          featured
        />
        <Divider />
        <Text style={styles.subtitle}>Share-Compatible with Twitter and Snapchat!</Text>
        <SocialIcon
          title='Share your Athenaeum experience!'
          button
          type='twitter'
          onPress={this.onClick.bind(this)}
        />
        <Divider />
        <Text style={styles.subtitle}>Report a bug:</Text>
        <Form
          options={options}
          ref={c => this._form = c}
          type={Report}
        />
        <Button title='Send Bug Report' onPress={this.handleSubmit}/>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  subtitle: {
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'grey'

  }
})
