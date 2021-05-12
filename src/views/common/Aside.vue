<template>
  <el-aside width="240px" class="aside">
    <div class="aside-logo">
      <el-avatar fit="fill" src="@/assets/logo.png"></el-avatar>
      <span class="logo-title">Demo system</span>
    </div>
    <el-menu
      class="aside-menu"
      router
      default-active="/home"
      background-color="#0000"
      text-color="#fff"
      active-text-color="#2d8cf0"
    >
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
            <i :class="item.icon"></i>
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
  top: 0;
  overflow: auto;
  background-image: url('../../assets/sider.jpg');
  background-size: cover;
  padding: 0 10px;
}
.aside-logo {
  padding: 20px 0;
  font-size: 20px;
  color: #fff;
  .el-avatar {
    vertical-align: middle;
  }
  .logo-title {
    vertical-align: middle;
    margin-left: 10px;
  }
}
.aside-menu {
  border-right: none;
  text-align: left;
  .el-menu-item,
  .el-submenu__title {
    border-radius: 5px;
    &:hover {
      i {
        color: #fff;
      }
      color: #fff;
      background-color: #2d8cf0 !important;
    }
  }
  .el-menu-item.is-active:hover {
    color: #fff !important;
  }
}
</style>
