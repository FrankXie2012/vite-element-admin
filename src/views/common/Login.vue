<template>
  <div class="login">
    <div class="login-dropdown">
      <el-dropdown @command="selectLang">
        <div>
          <img :src="locale.url" class="img-flag" />
          <span class="c-white ml-10">{{ locale.title }}</span>
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
    </div>
    <div class="login-box">
      <div class="title">
        <div class="logo-img"></div>
        <div class="logo-text"></div>
        <div class="login-version">{{ $t('common.version') }}: 2.0.0</div>
      </div>
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item prop="username">
          <el-input v-model="form.username" :placeholder="$t('login.username')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
            :placeholder="$t('login.password')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="form.captcha" :placeholder="$t('login.captcha')"></el-input>
          <img :src="captcha" class="login-captcha" @click="getCaptcha" />
        </el-form-item>
        <el-form-item prop="marketId">
          <el-select v-model="form.marketId" class="full-width" :placeholder="$t('common.market')">
            <el-option
              v-for="(item, i) in marketList"
              :key="i"
              :label="item.marketName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="flex-between form-tools">
            <el-checkbox v-model="rememberMe">{{ $t('login.rememberMe') }}</el-checkbox>
            <el-button type="text">{{ $t('login.forgetPwd') }}</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button round type="primary" class="login-btn full-width" @click="onSubmit">
            {{ $t('login.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-foot">Copyright© 2015-2016 All Rights Reserved</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: {lang: 'zh_CN', title: '简体中文', url: '@/assets/zh_CN.png'},
      langList: [
        {lang: 'zh_CN', title: '简体中文', url: '@/assets/zh_CN.png'},
        {lang: 'en_US', title: 'English', url: '@/assets/en_US.png'}
      ],
      captcha: '',
      rememberMe: false,
      marketList: [],
      form: {
        username: '',
        password: '',
        uuid: '',
        captcha: '',
        marketId: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        username: [{required: true, message: this.$t('common.required'), trigger: 'change'}],
        password: [{required: true, message: this.$t('common.required'), trigger: 'change'}],
        captcha: [{required: true, message: this.$t('common.required'), trigger: 'change'}],
        marketId: [{required: true, message: this.$t('common.required'), trigger: 'change'}]
      }
    }
  },
  created() {
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')
    if (username && password) {
      this.form.username = username
      this.form.password = password
    }
    const defaultLang =
      localStorage.getItem('lang') ||
      this.$store.state.lang ||
      navigator.language ||
      navigator.userLanguage
    this.locale = this.langList.find((v) => v.lang === defaultLang)
    this.getCaptcha()
    this.getMarkets()
  },
  methods: {
    async getCaptcha() {
      const res = await this.$request({
        url: 'common/getCaptcha',
        method: 'get',
        noHint: true
      })
      this.captcha = 'data:image/jpeg;base64,' + res.data.image
      this.form.uuid = res.data.uuid
    },
    async getMarkets() {
      const res = await this.$request({
        url: 'common/getMarkets',
        method: 'get',
        noHint: true
      })
      console.log(res)
      this.marketList = res.data
    },
    selectLang(cmd) {
      this.$i18n.locale = cmd
      this.locale = this.langList.find((v) => v.lang === cmd)
      this.$store.commit('setLang', cmd)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    async onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          if (this.rememberMe) {
            localStorage.setItem('username', this.form.username)
            localStorage.setItem('password', this.form.password)
          } else {
            localStorage.setItem('username', '')
            localStorage.setItem('password', '')
          }
          const res = await this.$request({
            url: 'login',
            data: this.form
          })
          this.$router.push('dashboard')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-box >>> .el-input__inner {
  border-color: #9ba8af;
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
<style lang="less" scoped>
.login {
  width: 100%;
  height: calc(100vh);
  background: url('../../assets/login_bg.jpg') no-repeat center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-dropdown {
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
    float: right;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    .el-dropdown {
      color: #fff;
    }
  }
  .login-box {
    width: 350px;
    border-radius: 10px;
    padding: 50px;
    margin-bottom: 100px;
    background-color: #fff;
    box-shadow: 0px 0px 45px 10px rgba(44, 60, 114, 0.3);
  }
  .logo-img {
    background: url('../../assets/logo_img.png') no-repeat center;
    width: 36px;
    height: 36px;
    background-size: cover;
    vertical-align: middle;
    display: inline-block;
  }
  .logo-text {
    background: url('../../assets/logo_text.png') no-repeat center;
    width: 169px;
    height: 28px;
    background-size: cover;
    vertical-align: middle;
    display: inline-block;
    margin-left: 20px;
  }
  .login-version {
    margin-top: 20px;
    margin-bottom: 50px;
    color: #a2b3be;
    font-size: 14px;
  }
  .login-captcha {
    position: absolute;
    top: -3px;
    right: 0;
    width: 150px;
    height: 42px;
  }
  .form-tools {
    margin-top: -10px;
  }
  .login-btn {
    background-color: #0e305e;
    font-size: 18px;
    margin-top: 20px;
  }
  .login-foot {
    position: fixed;
    bottom: 20px;
    color: #999;
  }
}
.img-flag {
  width: 24px;
  height: 16px;
  vertical-align: middle;
}
</style>
