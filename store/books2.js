import axios from 'axios'
import firebaseApp from './firebase_app'

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
      if (process.env.VUE_ENV === 'server') {
        axios.get('https://booklike-66ae2.firebaseio.com/books.json').then((response) => {
          commit('SET_BOOKS_LIST', response.data)
        }, (err) => {
          console.log(err)
        })
      } else {
        console.log('leo')
        var booksRef = firebaseApp.database().ref('books')
        booksRef.on('value', function (snapshot) {
          commit('SET_BOOKS_LIST', snapshot.val())
          // var count = snapshot.numChildren()
          // console.log(count)
        }, function (errorObject) {
          console.log('The read failed: ' + errorObject.code)
        })
      }
    }
  },
  mutations: {
    SET_BOOKS_LIST: (state, books) => {
      state.books = books.filter(function (book) {
        return book != null
      })
    }
  }
}
export default books
