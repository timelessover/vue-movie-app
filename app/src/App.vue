<template>
  <div id="app" v-cloak>
    <Header :title="title" :back="back"></Header>
    <router-view/>
    <nav-footer v-if="$route.meta.navShow"></nav-footer>
  </div>
</template>

<script>
import navFooter from "@/components/navFooter";
import Header from "@/components/header.vue";
import { mapState, mapMutations } from "vuex";
import { Dialog } from "vant";
export default {
  components: {
    navFooter,
    Header
  },
  computed: {
    title() {
      return this.$store.state.headerTitle;
    },
    back() {
      return this.$store.state.backPage;
    }
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}

@mixin line-ellipsis() {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.scroll-view_H {
  display: flex;
  overflow-y: auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 12vw;
  border-bottom: 1px solid #e6e6e6;
  width: 100%;
  background: #fff;
  z-index: 999;
}

.city-entry {
  padding-left: 30px;
  font-size: 30px;
  color: #666;
  display: flex;
  align-items: center;
}

.city-name {
  @include line-ellipsis;
  max-width: 19.2vw;
}

.city-entry-arrow {
  width: 0;
  height: 0;
  border: 8px solid #b0b0b0;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  display: inline-block;
  margin-left: 8px;
  margin-top: 10px;
}

.phcolor {
  color: #999;
}

.buy-tickets {
  .btn {
    width: 94px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    box-sizing: border-box;
    background-color: #f03d37;
    color: #fff;
    border-radius: 8px;
    white-space: nowrap;
    font-size: 24px;
    border: none;
  }
  .btn.pre-sale {
    background-color: #3c9fe6;
  }
  .want-see {
    background-color: #faaf00;
  }
}

</style>
