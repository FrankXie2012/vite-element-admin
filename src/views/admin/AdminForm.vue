<template>
  <el-card class="common-card">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item :label="$t('user.firstName')">
        <el-input v-model="formData.firstName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ $t('common.ok') }}</el-button>
        <el-button>{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          cellPhone: '',
          telePhone: ''
        }
      }
    },
    mounted() {
      let route = this.$route
      console.log(route, this.$store)
      console.log(this.$store.state.user)
    },
    methods: {
      onSubmit() {
        console.log(this.formData)
      }
    }
  }
</script>

<style></style>
