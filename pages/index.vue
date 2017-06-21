<template>
  <section>
    <h1>Books</h1>
    <ul>
      <li  v-for="(book, index) in books">
        <h2>{{book.title}}</h2>
        <input v-model="book.title" 
          @blur="doneEdit(book)"
          @keyup.enter="doneEdit(book)">
        <div>
          <label>author:</label>
          <span>{{book.author}} </span>
        </div>

        <div>
          <label>keywords:</label>
          <span v-for="keyword in book.keywords">{{keyword}} </span>
        </div>
      </li>
    </ul>
    <nuxt-link to="/about">About</nuxt-link>
  </section>
</template>

<script>

export default {
  components: {},
  computed: {
    books () {
      return this.$store.state.booksStore.books
    }
  },
  created () {
    this.$store.dispatch('LOAD_BOOKS')
  },
  methods: {
    doneEdit: function (book) {
      this.$store.dispatch('UPDATE_BOOKS')
    },
    newBook: function (book) {
      this.$store.dispatch('CREATE_BOOK', book)
    }
  }
}
</script>

