<template>
  <div class="login">
    <div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username" :state="usernameStatus"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" :state="passwordStatus"></mt-field>
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
              usernameStatus:'',
              passwordStatus:''
          }
      },
      methods:{
          login(){
              if( !this.username && !this.password){
                  this.usernameStatus = 'warning';
                  this.passwordStatus = 'warning';
                  return
              }else if(!this.username){
                  return this.usernameStatus = 'warning'
              }else if(!this.password){
                  return this.passwordStatus = 'warning'
              }
              let params = {
                  username: this.username,
                  password: this.password,
              }
              console.error(params)
              api.login(params).then((res)=>{
                  console.error(this);
                  console.error(res);
                  if(res && res.code === 1){
                      this._MessageBox(
                          {   message:res.msg || '请求失败，内部服务器错误！',
                              type: 'error',
                              duration:2000
                          })
                      return;
                  }
              })
          },
          register(){

          }
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