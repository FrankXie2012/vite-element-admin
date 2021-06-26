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
      <el-menu-item v-if="!sub.items && $authCheck(sub.auth)" :index="sub.auth">
        <i :class="sub.icon"></i>
        <template #title>{{ sub.name }}</template>
      </el-menu-item>
      <el-submenu v-else-if="$authCheck(sub.auth)" :index="sub.auth">
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
          name: this.$t('menu.overview'),
          icon: 'el-icon-menu',
          auth: 'overview',
          items: [
            {
              name: this.$t('menu.dashboard'),
              auth: 'dashboard',
              icon: 'el-icon-house',
              path: '/dashboard'
            },
            {
              name: this.$t('menu.geo'),
              auth: 'geo',
              icon: 'el-icon-location-outline',
              path: '/geo'
            }
          ]
        },
        {
          name: this.$t('menu.app'),
          auth: 'app',
          icon: 'el-icon-mobile-phone',
          path: '/app'
        },
        {
          name: this.$t('menu.push'),
          auth: 'push',
          icon: 'el-icon-s-promotion',
          path: '/push'
        },
        {
          name: this.$t('menu.merchant'),
          auth: 'merchant',
          icon: 'el-icon-s-shop',
          path: '/merchant'
        },
        {
          name: this.$t('menu.terminal'),
          auth: 'terminal',
          icon: 'el-icon-monitor',
          path: '/terminal'
        },
        {
          name: this.$t('menu.report'),
          auth: 'report',
          icon: 'el-icon-files',
          path: '/report'
        },
        {
          name: this.$t('menu.admin'),
          auth: 'admin',
          icon: 'el-icon-user',
          path: '/admin'
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
