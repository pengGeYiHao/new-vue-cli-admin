<template>
  <div class="login">
    <el-card class="box-card">
      <div class="title">xxx 管理后台</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submitForm('ruleForm')" :loading="loading">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      const checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户不能为空'));
        }else {
          callback()
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loading:false,
        ruleForm: {
          pass: '',
          username: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    created(){},
    methods: {
      submitForm(formName) {
        this.loading = true
        this.clearUserInfo()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 这里存储用户信息 存储token
            this.$store.dispatch('addUserInfo',{username:'aaa'})
            this.setCookie('hooli_token','faljfadfjalfjadsf',2)
            // console.log(this.getCookie('hooli_token'))
          } else {
            return false;
          }
          this.loading = false
        });
      },
      clearUserInfo(){
        if(this.getCookie('hooli_token')){
          this.delCookie('hooli_token')
        }
        if(!!this.$store.state.userInfo.username){
          this.$store.dispatch('delUserInfo')
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .login {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .box-card {
    width: 500px;
  }
  .title {
    margin: 20px;
    text-align: center;
  }
</style>

