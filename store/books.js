import axios from 'axios'
import firebase from 'firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

if (process.env.VUE_ENV !== 'server') {
  const config = {
    apiKey: 'AIzaSyBkUKWyZzzH07OVd5vBwebAwo5mPL6rfnM',
    authDomain: 'booklike-66ae2.firebaseapp.com',
    databaseURL: 'https://booklike-66ae2.firebaseio.com',
    projectId: 'booklike-66ae2',
    storageBucket: 'booklike-66ae2.appspot.com',
    messagingSenderId: '29467971508'
  }
  var firebaseApp = firebase.initializeApp(config)
  var db = firebaseApp.database()
  var mutations = {
    SET_BOOKS_LIST: (state, { books }) => {
      state.books = books
    },
    ...firebaseMutations
  }
} else {
  mutations = {
    SET_BOOKS_LIST: (state, { books }) => {
      state.books = books
    }
  }
}
const books = {
  state: {
    books: [
    ]
  },
  getters: {
    books: state => state.books
  },
  actions: {
    LOAD_BOOKS: ({ commit, state }) => {
      console.log(process.env.VUE_ENV)
      if (process.env.VUE_ENV === 'server') {
        console.log('hello')
        axios.get('https://booklike-66ae2.firebaseio.com/books.json?orderBy="title"&startAt=3').then((response) => {
          commit('SET_BOOKS_LIST', { books: response.data })
        }, (err) => {
          console.log(err)
        })
      } else {
        console.log('leo')
        var ref = db.ref('books')
        firebaseAction(({ bindFirebaseRef }) => {
          bindFirebaseRef('books', ref)
        })
      }
    }
  },
  mutations
//   getters: {
//    }
}
export default books
