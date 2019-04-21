<template>
  <mt-tabbar v-model="selectedIndex" fixed="fixed">
    <mt-tab-item  v-for="(item) in items" :key="item.text" :id="item.id" v-on:click="select(item)">
        <img slot="icon" v-show = "selectedIndex === item.id" :src="item.selectedUrl" />
        <img slot="icon" v-show = "selectedIndex !== item.id" :src="item.imgUrl" />
        {{ item.text }}
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
let me;
export default {
  name: 'tabBar',
  data(){
    return {
        fixed:'fixed',
        selectedIndex:'',
    }
  },
  props: {
    items: {
        type: Array ,
    },
    selected:{
      type: String,
      default:'room'
    }
  },
  computed:{
  },
  methods:{

  },
  created(){
      me = this;
      me.selectedIndex  = me.selected;
  },
  watch:{
      selectedIndex:(newIndex, oldIndex)=>{
          me.$router.push({name:newIndex})
      }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
