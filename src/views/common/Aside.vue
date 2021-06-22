<template>
  <el-menu
    class="aside-menu elevator"
    router
    default-active="/home"
    text-color="#2e323e"
    active-text-color="#0d305f"
    :collapse="isCollapse"
  >
    <template v-for="sub in menu" :key="sub.path">
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
    </template>
    <el-button type="text" class="collapse-btn" @click="collapse">
      <i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
      {{ isCollapse ? '' : $t('common.collapse') }}
    </el-button>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    menu() {
      return [
        {
          name: this.$t('menu.home'),
          auth: 'home',
          icon: 'el-icon-house',
          path: '/home'
        },
        {
          name: '设备管理',
          auth: 'device',
          icon: 'el-icon-monitor',
          path: '/device'
        },
        {
          name: '用户管理',
          auth: 'user',
          icon: 'el-icon-user',
          path: '/user'
        },
        {
          name: '统计分析',
          icon: 'el-icon-pie-chart',
          path: '1',
          auth: 'stats',
          items: [
            {
              name: '设备数据',
              auth: 'deviceData',
              icon: 'el-icon-data-line',
              path: '/deviceData'
            }
          ]
        },
        {
          name: '系统设置',
          icon: 'el-icon-setting',
          path: '2',
          auth: 'system',
          items: [
            {
              name: '型号管理',
              auth: 'model',
              icon: 'el-icon-cpu',
              path: '/model'
            },
            {
              name: '操作员管理',
              auth: 'sysUser',
              icon: 'el-icon-set-up',
              path: '/sysUser'
            }
          ]
        }
      ]
    }
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less">
.collapse-btn {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  color: #7c7c85;
  span {
    display: inline-block;
    height: 16px;
  }
  i {
    position: absolute;
    left: 20px;
  }
}
.aside-menu {
  height: calc(100vh - 60px);
  text-align: left;
  .el-submenu .el-menu-item {
    padding-left: 50px !important;
  }
}
.aside-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
