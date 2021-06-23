<template>
  <el-container>
    <Header></Header>
    <el-main class="main-body">
      <el-container>
        <Aside></Aside>
        <router-view></router-view>
      </el-container>
    </el-main>
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
  padding: 0;
  margin-top: 60px;
  height: calc(100vh - 60px);
  overflow: auto;
  background-color: #efefef;
}
.main {
  overflow: auto;
  height: calc(100vh - 100px);
  margin: 20px;
  width: 100%;
}
.elevator {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  &.radius {
    border-radius: 8px;
  }
}
.fs-18 {
  font-size: 18px;
}
</style>
