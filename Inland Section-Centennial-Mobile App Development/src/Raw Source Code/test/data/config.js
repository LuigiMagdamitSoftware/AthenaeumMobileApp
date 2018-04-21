firebase = require('firebase');
firebase.initializeApp({
 'appName': 'EasyManage',
'serviceAccount': './easymanage-755db-firebase-adminsdk-sncfd-9e4678dc0a.json',
 'authDomain': 'easymanage-755db.firebaseapp.com',
'databaseURL': 'https://easymanage-755db.firebaseio.com//',
    'storageBucket': 'gs://easymanage-755db.appspot.com'
});
module.exports.ref = firebase.app().database().ref();
