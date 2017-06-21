<template>
  <section>
    <ul>
      <li  v-for="book in books">{{book.title}}</li>
      <nuxt-link to="/about">About</nuxt-link>
    </ul>
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
  }
}
</script>

