import React from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { Card, Avatar, Button , Icon, Divider, Tile } from 'react-native-elements';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import PTRView from 'react-native-pull-to-refresh';
import { StackNavigator } from 'react-navigation';
import { Manage } from './data/Manager';
var data = require('./data/TestData');

var user = 'test';
var manager = new Manage(data.data);
manager.updateItemsList();

export default class Page extends React.Component{
  sendReturnData(username, title, type){
    //check what type of list the book belongs in.
    //if the page is rendered for a book in the user's book list, it uses the removeItem function
    //if it is a reservation, the component's function accesses the remove reservation function
    if(type==='books'){
      manager.removeItem(username, title)
    }
    if(type==='reservations'){
      manager.removeReservation(username, title)
    }
    //creates local function connected to the manager to send the card's prop data to the Manager
    //in order to  modify the book and user's data.
  }
  //write a return JSON function

  render(){
    //import parameters that are passed into the component
    const { params } = this.props.navigation.state;
    const title = params ? params.title : null;
    const description = params ? params.description : null;
    const img = params ? params.img : null;
    const username = params ? params.username : null;
    const type = params ? params.type : null;

    return(
      <ScrollView style={styles.container}>
        <Tile
          imageSrc={{uri: (JSON.stringify(img).replace(/(^"|"$)/g, ''))}}
          featured
        />
        <Text style={styles.title}>{JSON.stringify(title).replace(/(^"|"$)/g, '')}</Text>
        <Text style={styles.days}>12 Days Left</Text>
        <Divider />
        <Text style={styles.days}>About the book:</Text>
        <Text style={styles.description}>{JSON.stringify(description)}</Text>

        <Button
          icon={
            <Icon
              name='arrow-right'
              size={15}
              color='white'

            />
          }
          title='Return this book'
          onPress={() => Alert.alert(
            'Confirm?',
            'Confirm this action.',
            [
              {text: 'Cancel', onPress: ()=>console.log('Press cancelled')},
              {text: 'Confirm', onPress: ()=>this.sendReturnData(JSON.stringify(username).replace(/(^"|"$)/g, ''), JSON.stringify(title).replace(/(^"|"$)/g, ''), JSON.stringify(type).replace(/(^"|"$)/g, ''))}
            ]
          )}
        />
        <Icon
          name='arrow-left'
          type='evilicon'
          color='grey'
          size={50}
          onPress={() => this.props.navigation.goBack()}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  title: {
    paddingTop: 20,
    fontSize: 30,
  },
  days: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 2,
    fontSize: 15,
    fontStyle: 'italic'
  },
  description: {
    paddingTop: 5,
    color: 'grey',
    fontSize: 15,
    paddingBottom: 20,
    fontStyle: 'italic'
  },
  button: {
    color: 'green'
  }

})
