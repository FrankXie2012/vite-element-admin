<template>
  <el-aside width="240px" class="aside">
    <el-menu
      class="aside-menu"
      router
      default-active="/home"
      text-color="#2e323e"
      active-text-color="#0d305f"
    >
      <!-- background-color="#0d305f" -->
      <div v-for="sub in menu" :key="sub.path">
        <el-menu-item v-if="!sub.items && $authCheck(sub.auth)" :index="sub.path">
          <i :class="sub.icon"></i>
          <template #title>{{ sub.name }}</template>
        </el-menu-item>
        <el-submenu v-else-if="$authCheck(sub.auth)" :index="sub.path">
          <template #title>
            <i :class="sub.icon"></i>
            <span>{{ sub.name }}</span>
          </template>
          <el-menu-item v-for="item in sub.items" :key="item.path" :index="item.path">
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
import json from '/@/assets/menu.js'
export default {
  data() {
    return {
      menu: json
    }
  }
}
</script>

<style lang="less">
.aside {
  position: fixed;
  height: 100vh;
  left: 0;
  top: 60px;
  overflow: auto;
}
.aside-menu {
  text-align: left;
  .el-submenu .el-menu-item {
    padding-left: 50px !important;
  }
}
</style>
