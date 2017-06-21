import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBkUKWyZzzH07OVd5vBwebAwo5mPL6rfnM',
  authDomain: 'booklike-66ae2.firebaseapp.com',
  databaseURL: 'https://booklike-66ae2.firebaseio.com',
  projectId: 'booklike-66ae2',
  storageBucket: 'booklike-66ae2.appspot.com',
  messagingSenderId: '29467971508'
}
if (process.env.VUE_ENV !== 'server') {
  var firebaseApp = firebase.initializeApp(config)
}

export default firebaseApp
