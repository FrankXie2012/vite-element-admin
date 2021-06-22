<template>
  <el-header class="main-header">
    <div class="main-header-left">
      <img src="../../assets/logo.png" />
      <el-breadcrumb separator-class="el-icon-arrow-right" class="main-header-breadcrumb">
        <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
        <el-breadcrumb-item>Test</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown class="main-header-dropdown">
      <div>
        <i class="el-icon-user fs-18"></i> {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ $t('common.modifyPwd') }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('common.logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown class="main-header-dropdown" @command="selectLang">
      <div>
        <img :src="locale.url" class="img-flag" /> {{ locale.title }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in langList" :key="item.lang" :command="item.lang">
            <img :src="item.url" class="img-flag" />
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      locale: {lang: 'zh_CN', title: '简体中文', url: '@/assets/zh_CN.png'},
      langList: [
        {lang: 'zh_CN', title: '简体中文', url: '@/assets/zh_CN.png'},
        {lang: 'en_US', title: 'English', url: '@/assets/en_US.png'}
      ]
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    }
  },
  created() {
    const defaultLang =
      localStorage.getItem('lang') ||
      this.$store.state.lang ||
      navigator.language ||
      navigator.userLanguage
    this.locale = this.langList.find((v) => v.lang === defaultLang)
  },
  methods: {
    selectLang(cmd) {
      this.$i18n.locale = cmd
      this.locale = this.langList.find((v) => v.lang === cmd)
      this.$store.commit('setLang', cmd)
    }
  }
}
</script>

<style lang="less">
.main-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100vw);
  padding: 0;
  background-color: #0d305f;
  color: #fff;
  .el-dropdown {
    color: #fff;
  }
}
.main-header-left {
  float: left;
  padding: 15px;
  img {
    margin-left: 10px;
    width: 170px;
    height: 30px;
    vertical-align: middle;
  }
}
.main-header-menu {
  float: right;
}
.main-header-dropdown {
  float: right;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
}
.img-flag {
  width: 24px;
  height: 16px;
  vertical-align: middle;
}
.main-header-breadcrumb {
  margin-left: 20px;
  display: inline-block;
  vertical-align: middle;
  .el-breadcrumb__inner {
    color: #fff !important;
  }
}
</style>
