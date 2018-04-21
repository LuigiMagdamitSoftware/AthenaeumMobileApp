import React from 'react';
import { View, Text, ScollView, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import { Button, Icon, Tile, Divider } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import Tabs from './Nav'

import { Manage } from './data/Manager';
var data = require('./data/TestData');

//Import all of the external files needed.
var manager = new Manage(data.data);
manager.updateItemsList();

var options = {
  auto: 'placeholders'
};

const Form = t.form.Form;

var Type = t.enums({
  Student: 'Student',
  Teacher: 'Teacher'
});

const SignInUser = t.struct({
  username: t.String,
  password: t.String,
});

const SignUpUser = t.struct({
  username: t.String,
  password: t.String,
  type: Type
});

class SignIn extends React.Component{
  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    //verify if the user is in the database and if the password matches that of the user in the databse
    let username = value.username
    username = username.replace(/\s/g, '')
    let verification = manager.verifyUser(username, value.password.replace(/\s/g, ''))
    console.log('login' + username)
    verification ? this.props.navigation.navigate('Nav', {username: manager.findUsername(username.toLowerCase())}): null
  }
  render(){
    return(
      <View style={styles.container}>
        <Tile
          imageSrc={{uri: ('https://i.imgur.com/yGrP2nX.jpg')}}
        />
        <Text style={styles.key}>For viewing purposes, the username is test, and the password is 'password'</Text>
        <Form
          ref={c => this._form = c} // assign a ref
          type={SignInUser}
          options={options}
        />
        <Button
          onPress={this.handleSubmit}//when the button is pressed, it calls the handleSubmit function
          title='Sign In'
          buttonStyle={styles.button}
        />
        <Divider />
        <Button
          onPress={()=>this.props.navigation.navigate('SignUp')}
          title='Need an account? Sign up here!'
        />
        <Divider />
      </View>
    )
  }

}
class SignUp extends React.Component{
  handleSubmit = () => {

    const value = this._form.getValue(); // use that ref to get the form value
    //verify if the user is in the database and if the password matches that of the user in the databse
    let username = value.username.toLowerCase().replace(/\s/g, '')
    let password = value.password.toLowerCase().replace(/\s/g, '')
    let type = value.type
    console.log(username)
    manager.createUser(username, password, type)
    this.props.navigation.navigate('Nav', {username: username})

  }
  render(){
    return(
      <View style={styles.container}>
        <Tile
          imageSrc={{uri: ('https://i.imgur.com/yGrP2nX.jpg')}}
        />
        <Text style={styles.key}>Welcome!</Text>
        <Form
          ref={c => this._form = c} // assign a ref
          type={SignUpUser}
          options={options}
        />
        <Button
          onPress={this.handleSubmit}//when the button is pressed, it calls the handleSubmit function
          title='Create Account!'
          buttonStyle={styles.button}
        />
        <Divider />
        <Button
          onPress={()=>this.props.navigation.navigate('SignIn')}
          title='Have an account? Sign in here!'s
        />
      </View>
    )
  }

}


const Main = StackNavigator (
  {
    SignUp: {screen: SignUp},
    SignIn: {screen: SignIn},
    Nav: {screen: Tabs}
  },
  {
    headerMode: 'none'
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  div: {
    paddingBottom: 20
  },
  key: {
    color: 'grey',
    fontStyle: 'italic',
  }
})
export default Main
