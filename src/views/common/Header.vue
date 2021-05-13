<template>
  <el-header class="main-header">
    <el-dropdown class="main-header-dropdown">
      <div>{{ username }} <i class="el-icon-arrow-down el-icon--right"></i></div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ $t('common.modifyPwd') }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('common.logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown class="main-header-dropdown" @command="selectLang">
      <div>{{ lang }} <i class="el-icon-arrow-down el-icon--right"></i></div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in langList" :key="item.lang" :command="item.lang">
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
      lang: '简体中文',
      langList: [
        {lang: 'zh_CN', title: '简体中文'},
        {lang: 'en_US', title: 'English'}
      ]
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    }
  },
  created() {
    const lang = this.langList.find((v) => v.lang === localStorage.getItem('lang'))
    this.lang = lang.title
  },
  methods: {
    selectLang(cmd) {
      this.$i18n.locale = cmd
      const lang = this.langList.find((v) => v.lang === cmd)
      this.lang = lang.title
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
  width: calc(100vw - 240px);
  padding: 0;
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
</style>
