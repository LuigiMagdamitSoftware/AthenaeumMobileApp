import React from 'react';
import { Text, View, ScrollView, StyleSheet, Button, Alert, RefreshControl } from 'react-native';
import { Card, Icon, Divider, Tile, Header } from 'react-native-elements';
import TopBar from './Header';
import { Manage } from './data/Manager';
var data = require('./data/TestData');

//Import all of the external files needed.

var manager = new Manage(data.data);
manager.updateItemsList();
//setup the data manager to enable data modifications

class BrowseCard extends React.Component{
  constructor(props){
    //inherit arguments that are passed into the card component
    super(props);
    this.state = {
      buttonConfirmed: false
    }
  }
  alert = (msg) => {
    console.log(msg)
  }
  sendAddData(){
    //this data sends functions to the manager from within the card itself.
    //the data that is stored in the card as props.
    manager.addItem(this.props.username, this.props.title)
  }
  sendReserveData(){
    manager.reserveItem(this.props.username, this.props.title)
  }
  render(){
    return(
      <View>
        <Card image={{uri: this.props.img}}>
          <View style={styles.border}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
            <Text style={styles.description}>{this.props.isAvailable ? 'Currently Available': 'Unavailable'}</Text>
            <Text style={styles.description}>{this.props.description}</Text>
            <View style={styles.bottomRow}>
              <View style={styles.buttonGroup}>
                <Icon
                  name={this.props.isAvailable ? 'plus': 'archive'}
                  type='evilicon'
                  color='black'
                  onPress={() => Alert.alert(
                    'Are you sure?',
                    'This book will be put in your '+ (this.props.isAvailable ? 'currently owned book list.' : 'reservations') + ' Refresh your profile to see changes.',
                    [
                      {text: 'Cancel', onPress: ()=>console.log('Press cancelled')},
                      {text: 'Confirm', onPress: ()=>(
                        this.props.isAvailable ? this.sendAddData(): this.sendReserveData(),
                        console.log('check!')
                      )}
                    ]
                    //prompt the user to confirm or cancel the add request. if it is  accepted, the book will be added
                    //to the user's books or reservations depending on whether or not the book is available
                  )}
                  size={30}
                />

              </View>
              <View style={styles.textGroup}>
                <Text style={styles.text}>{this.props.isAvailable ? 'Borrow' : 'Reserve'}</Text>
                <Text style={styles.text}>· {this.props.author}</Text>
                <Text style={styles.text}>· {this.props.days} day rental</Text>
              </View>
            </View>
        </Card>
      </View>
    )
  }
}

export default class Browse extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookList: manager.renderBooks,
      refreshing: false
    }
  }
  createCards(){
    //this renders a card for every book available in the library list data(testdata.js)
    return this.state.bookList.map((book, key)=>{
      //for every book in the library's data, it generates a visible card component display the book info
      return(
        <View>
          {/*This creates a card object and transfers the data of the book item in the data base
            into the card.*/}
          <BrowseCard username = {this.props.username} title={book.title} author = {book.author} days={book.days} isAvailable={book.isAvailable} description={book.description} img={book.img}/>
        </View>
      )
    })
  }
  fetchData(){
    this.setState({bookList: manager.renderBooks});
    //when this function is called, it updates the data if there are changes made
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData()
    this.setState({refreshing: false});
    //call the update data function when the refresh button is pressed
  }
  render(){
    //this sets up the main view that the user sees. The Top Bar is created for the view
    return(
      <View style={styles.container}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <Tile
            imageSrc={{uri: ('https://i.pinimg.com/736x/67/01/a2/6701a2dd27613398be205baba6eb823c--homework-aesthetic-aesthetic-studying.jpg')}}
            featured
            title='Centennial Library'
            caption='Powered by Athenaeum'
          />
          <Divider />
          {
            this.createCards()
            //call the create cards function to show the full collection of books
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  heading: {
    paddingTop: 15,
    fontSize: 20,
    fontStyle: 'italic',
    color: 'grey',
    alignSelf: 'flex-start',
    paddingLeft: 10
  },
  buttonText: {
    color: 'grey',
    fontSize: 12,
    fontStyle: 'italic',
    paddingTop: 6.5
  },
  textGroup: {
    alignSelf: 'flex-end',
    flexDirection: 'row'
  },
  buttonGroup: {
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  container: {
    backgroundColor: 'white'
  },
  buttons: {
    justifyContent: 'flex-end',
    flex: 10
  },
  bottomRow: {
    flexDirection: 'row'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 8
  },
  description: {
    color: 'grey',
    fontSize: 15,
    paddingBottom: 8,
    fontStyle: 'italic'
  },
  text: {
    color: 'grey',
    fontSize: 12,
    fontStyle: 'italic',
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
});
