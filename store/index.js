import Vuex from 'vuex'
import books from './books'
import { firebaseMutations } from 'vuexfire'

const store = () => new Vuex.Store({
  modules: {
    booksStore: books
  },
  mutations: {
    ...firebaseMutations
  }
})

export default store
