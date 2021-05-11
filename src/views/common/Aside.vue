<template>
  <el-aside width="240px" class="aside">
    <div class="aside-logo">
      <el-avatar fit="fill" src="@/assets/logo.png"></el-avatar>
      <span class="logo-title">Demo system</span>
    </div>
    <el-menu
      class="aside-menu"
      uniqueOpened
      background-color="#0000"
      text-color="#fff"
      active-text-color="#2d8cf0"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
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
}
</style>
