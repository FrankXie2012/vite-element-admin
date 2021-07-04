<template> nihao </template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      let route = this.$route
      console.log(route, this.$store)
      console.log(this.$store.state.user)
    }
  }
</script>

<style></style>
