<template>
  <section>
    <ul>
      <li  v-for="book in books">{{book.title}}</li>
    </ul>
  </section>
</template>

<script>

export default {
  components: {},
  // data: () => {
  //   return {
  //     books: [
  //       { title: 'Foo' },
  //       { title: 'Bar' }
  //     ]
  //   }
  // },
  computed: {
    books () {
      return this.$store.state.booksStore.books
    }
  },
  created () {
    this.$store.dispatch('LOAD_BOOKS')
  }
}
</script>

