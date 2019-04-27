<template>
  <div class="home">
    <user-list :user-list="userList"></user-list>
  </div>
</template>

<script>
import api from '@/service/index'
import UserList from '@/components/Message/UserList.vue'

export default {
  name: 'message',
  data(){
      return{
        userList:[]
      }
  },
  beforeCreate:function () {
      let me = this;
      api.user_list().then( res =>{
          if(res.code === 0){
              console.error(res.data)
              me.userList = res.data
          }
      })
  },
  created:function () {
      console.error(this)

  },

  mounted:function () {
      console.error(this)

  },
  components: {
    'user-list':UserList
  }
}
</script>
