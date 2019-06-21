<template>
  <div class="login">
      <mt-header title="注册用户">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username" ></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"  ></mt-field>
        <mt-field label="重复密码" placeholder="请重复密码" type="password" v-model="repassword" ></mt-field>
      </div>
      <mt-button style="margin-top: 10px;width: 100%" type="default" size="normal" @click="register">注册</mt-button>
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
              repassword:'',
          }
      },
      methods:{
          register(){
              let me = this;
              if( !this.username || !this.password || !this.repassword){
                  this._MessageBox(
                      {   message: '账号密码不能为空',
                          type: 'error',
                          duration:2000
                      })
                  return
              }

              if(this.password !== this.repassword){
                  this.password = ''
                  this.repassword =''
                  this._MessageBox(
                      {   message: '两次输入的密码要一致',
                          type: 'error',
                          duration:2000
                      })
                  return;
              }

              let params = {
                  username: this.username,
                  password: this.password,
              }

              api.register(params).then((res)=>{
                  if(res && res.code === 1){
                      this._MessageBox(
                          {   message:res.msg || '请求失败，内部服务器错误！',
                              type: 'error',
                              duration:2000
                          })
                      return;
                  }
                  this._MessageBox(
                      {   message: '注册成功，正在跳转',
                          type: 'success',
                          duration:5000
                      })
                  me.$router.go(-1);
              })
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
    /*width: 100%;*/
    /*margin-top: 10px;*/
  }
</style>