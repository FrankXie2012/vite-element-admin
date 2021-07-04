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
      <el-menu-item
        v-if="!sub.items && $authCheck(sub.auth)"
        :index="sub.path"
        :class="checkActive(sub)"
      >
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
      {{ isCollapse ? '&nbsp;' : $t('common.collapse') }}
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
            name: this.$t('common.overview'),
            icon: 'el-icon-menu',
            auth: 'overview',
            items: [
              {
                name: this.$t('common.dashboard'),
                auth: 'dashboard',
                path: '/dashboard'
              },
              {
                name: this.$t('common.geo'),
                auth: 'geo',
                path: '/geo'
              }
            ]
          },
          {
            name: this.$t('common.app'),
            auth: 'app',
            icon: 'el-icon-mobile-phone',
            path: '/app'
          },
          {
            name: this.$t('common.push'),
            auth: 'push',
            icon: 'el-icon-s-promotion',
            path: '/push'
          },
          {
            name: this.$t('common.merchant'),
            auth: 'merchant',
            icon: 'el-icon-s-shop',
            path: '/merchant'
          },
          {
            name: this.$t('common.terminal'),
            auth: 'terminal',
            icon: 'el-icon-monitor',
            path: '/terminal'
          },
          {
            name: this.$t('common.report'),
            auth: 'report',
            icon: 'el-icon-files',
            path: '/report'
          },
          {
            name: this.$t('common.admin'),
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
      },
      checkActive(item) {
        if (this.$route.name === item.name) {
          return 'is-active'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu--collapse {
    .collapse-btn {
      width: 60px;
    }
  }
  .collapse-btn {
    position: fixed;
    width: 200px;
    height: 40px;
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
    overflow-y: auto;
    text-align: left;
    .el-submenu .el-menu-item {
      padding-left: 50px !important;
    }
    .el-submenu.is-active {
      border-left: 3px solid #0d305f;
      background-color: #f7f8fb;
      .el-submenu__title span {
        font-weight: bold;
        color: #023d8b;
      }
      .el-menu-item {
        background-color: #f7f8fb;
        &.is-active {
          border-left: none;
        }
      }
    }
    .el-menu-item.is-active {
      color: #023d8b;
      font-weight: bold;
      background-color: #f7f8fb;
      border-left: 3px solid #0d305f;
    }
  }
  .aside-menu:not(.el-menu--collapse) {
    width: 238px;
    min-height: 400px;
  }
</style>
