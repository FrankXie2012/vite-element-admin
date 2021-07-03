<template>
  <div>{{ book.title }}</div>
</template>

<script>
  import { inject, reactive } from 'vue'
  export default {
    setup() {
      const request = inject('$request')
      let book = reactive({ title: 'no shit way' })
      // let book = $request({url: 'http://10.17.2.63:8003/cs/corp/page', data: {}})
      console.log(book.title)
      watch(
        () => book.title,
        (val) => {
          console.log(val)
        }
      )
      return { book }
    },
    mounted() {
      console.log(this.book)
      this.book.title = 'yes, I do'
    }
  }
</script>
