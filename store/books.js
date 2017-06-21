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
    CREATE_BOOK: ({ commit, state }, book) => {
      commit('CREATE_BOOK', book)
    },
    UPDATE_BOOKS: ({ commit, state }) => {
      state.booksRef.update(state.books)
    }
  },
  mutations: {
    SET_BOOKS_REF: (state, booksRef) => {
      state.booksRef = booksRef
    },
    CREATE_BOOK: (state, book) => {
      var newBookRef = state.booksRef.push()
      newBookRef.set(book)
    },
    SET_BOOKS_LIST: (state, books) => {
      state.books = books
    }
  }
}
export default books
