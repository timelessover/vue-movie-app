<template>
    <div class="page-header">
        <div v-if="$route.name !== 404">
            <Sticky>
                <nav-bar :title="title" :left-arrow="!$route.meta.navShow" @click-left="$router.back(-1)"/>
            </Sticky>
        </div>
    </div>
</template>

<script>
import { NavBar, Sticky } from "vant";
export default {
  components: {
    NavBar,
    Sticky
  },
  props: {
    title: {
      type: String,
      default: ""
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/my-vant';
</style>