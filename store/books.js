import axios from 'axios'
import firebase from 'firebase'

const books = {
  state: {
    books: [
    ],
    onServer:true
  },
  actions: {
    LOAD_BOOKS: ({ commit, state }) => {
      axios.get('https://booklike-66ae2.firebaseio.com/books.json?orderBy="title"&startAt=3').then((response) => {
        commit('SET_BOOKS_LIST', { books: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    nuxtServerInit ({ commit }, { req }) {
      if (req) {
        console.log(req)
      }
    }
  },
  mutations: {
    SET_BOOKS_LIST: (state, { books }) => {
      state.books = books
    }
  }
//   getters: {
//    }
}
export default books
