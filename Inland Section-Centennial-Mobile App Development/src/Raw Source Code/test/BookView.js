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

class Tab extends React.Component{
  render(){
    return(
      <View>
        <Tile
          imageSrc={{uri: (this.props.img)}}
          title={this.props.title}
          featured
        />
      </View>
    )
  }
}
class BookView extends React.Component{
  //pass props here later
  constructor(props) {
      super(props);
      this.state = {
        books: manager.returnUserBooks('test', 'books'),
        reservations: manager.returnUserBooks('test', 'reservations')
      };
    }
  createCards(){
    return this.state.books.map((book)=>{
      return(
        <Tab img={book.img} title={book.title}/>
      )
    })
  }
  render(){
    return(
      <View>
        <Tab img = 'https://cdn.iamlivingit.com/wp-content/uploads/test/post/aesthetic-photography1502698401.jpg' title='To Kill A Mockingbird'/>
        {this.createCards()}
      </View>
    )
  }
}
export default class Scroll extends React.Component{
  render(){
    return(
      <ScrollableTabView tabBarPosition='top'>
        <BookView />
      </ScrollableTabView>
    )
  }
}
