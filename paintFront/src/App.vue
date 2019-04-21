<template>
  <div id="app">
    <router-view/>
    <tabBar :items="items" :selected="selected"></tabBar>
  </div>
</template>

<script>
import tabBar from './components/tabBar.vue'
import boss from '@/assets/tabBar/boss.png'
import msg from '@/assets/tabBar/msg.png'
import user from '@/assets/tabBar/user.png'
import bossSelected from '@/assets/tabBar/boss-active.png'
import msgSelected from '@/assets/tabBar/msg-active.png'
import userSelected from '@/assets/tabBar/user-active.png'

let items = [
     {  text:'房间列表', id:'room', imgUrl:boss, selectedUrl:bossSelected }
    ,{  text:'消息列表', id:'message',imgUrl:msg, selectedUrl:msgSelected }
    ,{  text:'个人中心', id:'personal', imgUrl:user, selectedUrl:userSelected }
]
export default {
    data(){
        return{
            items:items,
            selected:items[0].id
        }
    },
    components:{
        tabBar
    }
}

</script>
<style lang="scss" scoped>

</style>
