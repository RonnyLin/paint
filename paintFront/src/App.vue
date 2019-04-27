<template>
  <div id="app">
    <transition name="fade"  mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
    data(){
        return{
        }
    },
    components:{
    }
}

</script>

<style lang="scss" scoped>

</style>
