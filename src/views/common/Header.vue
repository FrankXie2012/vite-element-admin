<template>
  <el-header class="main-header">
    <el-menu mode="horizontal" menu-trigger="click" unique-opened class="main-header-menu">
      <el-submenu index="1">
        <template #title>语言</template>
        <el-menu-item index="1-1">中文</el-menu-item>
        <el-menu-item index="1-2">英文</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template #title>用户名</template>
        <el-menu-item index="2-1">修改密码</el-menu-item>
        <el-menu-item index="2-2">登出</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
export default {}
</script>

<style lang="less">
.main-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100vw - 240px);
  padding: 0;
}
.main-header-menu {
  float: right;
}
</style>
