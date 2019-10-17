<template>
    <div class="page-header" style="margin-bottom:46px" v-cloak>
        <div v-if="$route.name !== 404 ">
                <nav-bar :title="title" :left-arrow="back" @click-left="$router.back(-1)" fixed/>
        </div>
    </div>
</template>

<script>
import { NavBar, Sticky } from "vant";
export default {
  components: {
    NavBar
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    back:{
      type: Boolean ,
      default: true
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/my-vant';
</style>