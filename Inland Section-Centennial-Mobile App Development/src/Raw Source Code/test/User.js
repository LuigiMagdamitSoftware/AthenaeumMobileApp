import React from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { Card, Avatar, Button , Icon, Divider, Tile, Overlay, Header } from 'react-native-elements';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Page from './Page'
import TopBar from './Header'
import Settings from './Settings'
import PTRView from 'react-native-pull-to-refresh';
import { StackNavigator } from 'react-navigation';
import { Manage } from './data/Manager';
var data = require('./data/TestData');
//import required packages
var user = 'test';
var manager = new Manage(data.data);
manager.updateItemsList();
//setup the data managers

class Tab extends React.Component{
  render(){
    return(
      <View>
        <Tile
          imageSrc={{uri: (this.props.img)}}
          title={this.props.title}
          featured
          onPress={() => this.props.navigation.navigate('Page', {
            title: this.props.title,
            img: this.props.img,
            description: this.props.description,
            type: this.props.type,
            username: this.props.username
            //pass all of the book's data and the active user's name into rendering info page
          })}
        />

      </View>
    )
  }
}
class BookView extends React.Component{
  //pass props
  constructor(props) {
      super(props);
      //state is used to manage changing data. the state of this Component
      //is used to access the books and reservations of the user
      this.state = {
        books: manager.returnUserBooks(this.props.username, 'books'),
        reservations: manager.returnUserBooks(this.props.username, 'reservations'),
        resfreshing: false
        //place the book data into the constructor. the state argument
        // of the component allows the data to be updated and changed
      };
    }
  createCards(type){
    return this.state[type].map((book)=>{
      //render a component for each book
      return(
        <Tab type={type==='books'?'books':'reservations'} navigation={this.props.navigation} img={book.img} title={book.title} description={book.description} username={this.props.username}/>
      )
      //pass the arguments into the tab, such as the book's image link, the book's title, etc
    })
  }
  fetchData(){
    this.setState({books: manager.returnUserBooks(this.props.username, 'books')});
    this.setState({reservations: manager.returnUserBooks(this.props.username, 'reservations')});
    //when this function is called, it updates the data if there are changes made
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData()
    this.setState({refreshing: false});
    //call the update data function when the refresh button is pressed
  }
  render(){
    return(
      <View style={styles.bookView}>
        <Button
          title='REFRESH'
          onPress={this._onRefresh.bind(this)}
          buttonStyle={styles.button}
        />
        <Divider />
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Your Books', style: { color: 'black', fontSize: 20} }}
          backgroundColor = 'white'
        />
        <Divider />
        {this.createCards('books')}
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Your Reservations', style: { color: 'black', fontSize: 20} }}
          backgroundColor = 'white'
        />
        {this.createCards('reservations')}
      </View>
    )
  }
}
class SettingsButton extends React.Component{
  render(){
    return(
      <Icon
        name='navicon'
        type='evilicon'
        color='#517fa4'
        onPress={() => this.props.navigation.navigate('Settings', {
          navigation: this.props.navigation
        })}
        size={30}
      />
    )
  }
}
class Profile extends React.Component{
  render(){
    const { navigation, screenProps } = this.props
    let username = this.props.screenProps.user.username
    console.log('username'+username)
    return(
      <ScrollView style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          rightComponent={<SettingsButton navigation={this.props.navigation}/>}
          centerComponent={{ text: 'Profile', style: { color: 'black', fontSize: 20} }}
          backgroundColor = 'white'
        />
        <View style={styles.profileBar}>
          <Avatar
            xlarge
            rounded
            title="?"
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <Text style={styles.profileUsername}>{username.charAt(0).toUpperCase() + username.slice(1)}</Text>
          <Text style={styles.profileSubtitle}>{manager.data.users[username].type}</Text>
          {
            //the overdue warning checks the user's object in the database
            //and checks to see overdue is set to false
          }
          <Text style={styles.overdueWarning}>{manager.data.users[username].overdue ? 'You have books overdue.' : 'You do not have overdue books'}</Text>
        </View>
        <Divider />
        <BookView navigation={this.props.navigation} username={username}/>

      </ScrollView>
    )
  }
}

const Stack = StackNavigator (
  {
    Profile: {
      screen: Profile
    },
    Page: {screen: Page},
    Settings: {screen: Settings}
  },
  {
    headerMode: 'none',
  }
);
export default class UserProfile extends React.Component{
  render(){
    const screenProps = {
      user: {
        username: this.props.username,
      },
    }
    return(
      <Stack screenProps={screenProps}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  wrapper: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1b0042'
  },
  bottomText: {
    flexDirection: 'row',
    paddingTop: 20
  },
  bookView: {
    paddingTop: 10
  },
  profileBar: {
    paddingTop: 50,
    alignItems: 'center',
    paddingBottom: 20
  },
  profileUsername: {
    paddingTop: 20,
    fontSize: 25
  },
  profileSubtitle: {
    paddingTop: 10,
    fontSize: 20,
    fontStyle: 'italic'
  },
  overdueWarning: {
    paddingTop: 10,
    fontSize: 15,
    fontStyle: 'italic',
    color: 'grey'
  }

})
