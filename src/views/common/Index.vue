<template>
  <el-container>
    <Aside></Aside>
    <el-container>
      <Header></Header>
      <el-main class="main-body">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './Header.vue'
import Aside from './Aside.vue'
export default {
  components: {
    Header,
    Aside
  },
  methods: {
    handleButtonEvent() {
      this.$message.success(this.$store.state.username)
    }
  }
}
</script>
<style lang="less">
.main-body {
  margin-left: 240px;
  margin-top: 60px;
  height: calc(100vh - 60px);
  overflow: auto;
  background-color: #efefef;
}
</style>
