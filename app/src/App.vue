<template>
  <div id="app">
    <mt-header v-show="$route.name !== 404" :title="$route.name">
      <router-link v-show="!$route.meta.navShow" to="" slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
      </router-link>
    </mt-header>
    <router-view/>
    <nav-footer v-show="$route.meta.navShow"></nav-footer>
  </div>
</template>

<script>
import navFooter from "@/components/navFooter";
export default {
  components: {
    navFooter
  },
  created () {
    console.log(this.$router);
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
  white-space: nowrap;
  width: 100%;
}

/* topbar */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  border-bottom: 1px solid #e6e6e6;
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
