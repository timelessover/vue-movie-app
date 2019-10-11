<template>
  <div class="bottom-nav-bar">
    <div class="nav">
      <!-- 父组件想在子组件上监听自己的事件,需要加上native修饰符 -->
      <router-link v-for="(item,index) in navlist" :key="index" :to="item.url" class="nav-item">
        <img :src=tabImg(item) alt="">
        <div>{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
  data() {
    return {
      navlist: [
        {
          url: "/movie",
          img: require("../assets/images/movie.png"),
          selectedImg: require("../assets/images/movieSelect.png"),
          name: "电影"
        },
        {
          url: "/cinema",
          img: require("../assets/images/cinema.png"),
          selectedImg: require("../assets/images/cinemaSelect.png"),
          name: "影院"
        },
        {
          url: "/user",
          img: require("../assets/images/user.png"),
          selectedImg: require("../assets/images/userSelect.png"),
          name: "我的"
        }
      ]
    };
  },
  methods: {
    tabImg(item) {
      if (this.$route.matched[0]) {
        return this.$route.matched[0].path === item.url || item.underUrl
          ? item.selectedImg
          : item.img;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom-nav-bar {
  .nav {
    height: 120px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    padding: 0 7vw;
    border-top: 0.5px solid #d8d8d8;
    .nav-item {
      width: 100px;
      text-align: center;
      line-height: 50px;
    }
    img {
      height: 50px;
      width: 50px;
      margin-top: 8px;
    }
  }
  .router-link-active {
    color: #e54847;
  }
}
</style>