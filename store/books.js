import axios from 'axios'
import firebaseApp from './firebase_app'

const books = {
  state: {
    books: [
    ],
    booksRef: null
  },
  getters: {
    books: state => state.books,
    booksRef: state => state.booksRef
  },
  actions: {
    LOAD_BOOKS: ({ commit, state }) => {
      if (process.env.VUE_ENV === 'server') {
        axios.get('https://booklike-66ae2.firebaseio.com/books.json').then((response) => {
          commit('SET_BOOKS_LIST', response.data)
        }, (err) => {
          console.log(err)
        })
      } else {
        var booksRef = firebaseApp.database().ref('books')
        commit('SET_BOOKS_REF', booksRef)
        booksRef.on('value', function (snapshot) {
          commit('SET_BOOKS_LIST', snapshot.val())
          // var count = snapshot.numChildren()
          // console.log(count)
        }, function (errorObject) {
          console.log('The read failed: ' + errorObject.code)
        })
      }
    },
    SAVE_BOOK: ({ commit, state }, updates) => {
      commit('SAVE_BOOK', updates)
    }
  },
  mutations: {
    SET_BOOKS_REF: (state, booksRef) => {
      state.booksRef = booksRef
    },
    SET_BOOKS_LIST: (state, books) => {
      state.books = books
    },
    SAVE_BOOK: (state, updates) => {
      state.booksRef.update(updates)
    }
  }
}
export default books
