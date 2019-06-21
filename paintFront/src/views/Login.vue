<template>
  <div class="login">
    <div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"  ></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" ></mt-field>
    </div>
    <mt-button type="primary"  size="normal" @click="login">登录</mt-button>
    <mt-button type="default" size="normal" @click="register">免费注册</mt-button>

  </div>
</template>
<script>
  'use strict'

  import api from '@/service/index'

  export default{
      name: 'login',
      data(){
          return{
              username: '',
              password: '',
          }
      },
      methods:{
          login(){
              if( !this.username || !this.password){
                  this._MessageBox(
                      {   message:'账号密码不能为空',
                          type: 'error',
                          duration:2000
                      })
                  return
              }
              let params = {
                  username: this.username,
                  password: this.password,
              }
              api.login(params).then((res)=>{
                  if(res && res.code === 1){
                      this._MessageBox(
                          {   message:res.msg || '请求失败，内部服务器错误！',
                              type: 'error',
                              duration:2000
                          })
                      return;
                  }
                  let user = res.data
                  sessionStorage.setItem('user', JSON.stringify(user));
                  // 如果是首次登陆 先完善信息
                  if(user.loginNum === 0){
                    this.$router.push({ name: 'userInfo' })
                  }else{
                    this.$router.push({ name: 'main' })
                  }
              })
          },
          register(){
              this.$router.push({ name: 'register' })
          },

      }
  }
</script>
<style scoped>
  .login{
    width: 100%;
    height: 100%;
  }
  .mint-button{
    width: 100%;
    margin-top: 10px;
  }
</style>