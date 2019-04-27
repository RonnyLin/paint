<template>
  <div class="userList">
    <div v-for="item in userList" :key="item._id">
      <user-item :user-item="item"></user-item>
    </div>
  </div>
</template>

<script>
import userItem from  './UserItem.vue'

export default {
  name: 'userList',
  props: {
    userList: Array
  },
  created(){

  },
  components:{
      'user-item':userItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
