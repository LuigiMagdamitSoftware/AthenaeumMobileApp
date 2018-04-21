test = require('./config');

var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
//find today's date. This is used to assign a due date and check overdues.

function retrieveDatabase(){

}
export class Manage{
  constructor(datalist){
    this.data = datalist
    //Setsup the data in an accessible database. All data modifications go here.
    this.renderBooks = []
    //Allow ease in rendering the library's books and creating a card for each in Browse.js
    this.today = day
  }
  //UPDATE FUNCTIONS====================================================
  updateItemsList(){
    //for every change that is made to the book database, the renderBooks array is updated
    for(var book in this.data.books){
      this.renderBooks.push(this.data.books[book])
    }
    //firebase.database().ref('/').set(this.data)
  }
   //LOGIN FUNCTIONS====================================================
  createUser(username, password, type){
    var entry = {
      username: username,
      type: type,
      password: password,
      books: {},
      reservations: {},
      dues: {},
      overdue: false

    }
    this.data.users[username] = entry
    console.log(this.data.users[username])
    //create an entry for the new user with  the user's key being the username
  }
  verifyUser(username, password){
    //used for login functions. verifies if a user's login attempt is valid
    let verify;
    //defined empty variable. This is later returned as a boolean to determine validity
    for(var user in this.data.users){
      console.log(user)
      if(this.data.users[user].username.toLowerCase()==username.toLowerCase() && this.data.users[user].password.toLowerCase()==password.toLowerCase()){
        //match up the user's login data with the database
        verify = true;
        return verify
        break
      }
    }
    verify=false;
    return verify
    //false if there is no match found whatsoever.
  }
   //MISC FUNCTIONS====================================================
  checkDues(){
    //looks through data object and marks users as overdue if they have books overdue
    this.updateUsersList();
    var userList = this.data.users
    for(var user in userList){
        for(var due in userList[user].dues){
          if(userList[user].dues[due]===day){
            userList[user].overdue = true
          }
        }
    }
  }
   //DATA FUNCTIONS====================================================
  addItem(username, title){
    console.log(username)
    var user_data = this.data.users[username];
    var book_data = this.data.books[title];

    user_data.books[title] = book_data;
    user_data.dues[title] = (day+book_data.days)
    book_data.isAvailable = false;
    //add the book to the user's books and add the due date with the title for the key
    //firebase.database().ref('/users'+username+'/books/'+title).set(book_data)
    //firebase.database().ref('/users'+username+'/books/'+title).set(book_data)
    this.updateItemsList()
    //update manager data
  }
  removeItem(username, title){
    var user_data = this.data.users[username];
    var book_data = this.data.books[title];

    delete user_data.books[title];
    delete user_data.dues[title];
    //access the book and the due date for the book and delete it from the user's data
    user_data.overdue=false;
    book_data.isAvailable = true;
    book_data.reservations[0] ? this.addItem(Object.keys(book_data.reservations)[0], title) : null
    //pass this book onto the first person on the reservations list
    this.updateItemsList()
  }
  reserveItem(username, title){
    var user_data = this.data.users[username];
    var book_data = this.data.books[title];

    user_data.reservations[title] = book_data;
    book_data.reservations[username] = user_data;
    //add books to reserve list, similar to addItem function
    this.updateItemsList()
  }
  removeReservation(username, title){
    var user_data = this.data.users[username];
    var book_data = this.data.books[title];

    delete user_data.reservations[title];
    delete book_data.reservations[username];
    this.updateItemsList()
  }

   //RETURN FUNCTIONS====================================================
  findUsername(username){
    for(var user in this.data.users){
      if(this.data.users[user].username===username){
        return username
        break
      }
    }
  }
  returnData(){
    console.log(this.data)
    return this.data
  }
  returnItems(){
    console.log(this.renderBooks)
    return this.renderBooks
  }
  returnUsers(){
    return this.data.users
  }
  returnUserBooks(username, type){
    //TYPE parameter is either "books" or 'reservations' and will return the appropriate object
    let readBookList = this.data.users[username][type];
    let userBooks = [];
    //get the user's books and create a return variable that is accessed by the GUI
    for(var book in readBookList){
      userBooks.push(readBookList[book])
      //put all of the user's books into the return array
    }
    return userBooks
  }
  returnBooks(){
    let readBookList = this.data.books;
    let Books = [];
    for(var book in readBookList){
      console.log(book)
      Books.push(readBookList[book])
    }
    return Books
  }
}
