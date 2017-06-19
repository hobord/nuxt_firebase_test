import Vuex from 'vuex'
import books from './books'

const store = () => new Vuex.Store({
  modules: {
    booksStore: books
  }
})

export default store
