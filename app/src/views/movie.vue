<template>
  <div class="movie">
    <Header :title="title"></Header>
    <Sticky :offset-top="46">
      <div class="topbar">
        <router-link class="city-entry" to="/city-select">
          <span class="city-name">{{city}}</span>
          <span class="city-entry-arrow"></span>
        </router-link>
        <div class="switch-hot">
          <div
            v-for="(item,index) in tabList"
            :key="index"
            :class="['hot-item',{ 'active':item.title == $route.name}]"
            @click="selectItem(item)"
          >{{item.title}}</div>
        </div>
        <router-link class="search-entry" to="./search-page?stype=-1">
          <span class="iconfont icon-sousuo"></span>
        </router-link>
      </div>
    </Sticky>
    <div class="switch-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Sticky } from "vant";
import { mapState, mapMutations } from "vuex";
import Header from '@/components/header';
export default {
  name: "movie",
  components: {
    Sticky,
    Header
  },
  data() {
    return {
      tabList: [
        {
          title: "热映",
          url: '/movie/hot'
        },
        {
          title: "待映",
          url: '/movie/expected'
        }
      ],
      title:'热映'
    };
  },
  computed: {
    city() {
      if (!this.$store.state.selectCity) {
        return "正在定位";
      } else {
        return this.$store.state.selectCity || this.city_name;
      }
    }
  },
  methods: {
    selectItem(item) {
      if(this.$route.path === item.url) return
      this.title = item.title
      this.$router.push(item.url)
    },
  }
};
</script>
<style lang="scss" scoped>
.switch-hot {
  display: flex;
  height: 88px;
  line-height: 88px;
  position: relative;
}

.hot-item {
  font-size: 30px;
  color: #666;
  width: 15vw;
  text-align: center;
  margin: 0 24px;
  font-weight: 700;
}

.hot-item.active {
  color: #ef4238;
  border-bottom: 2px solid #ef4238;
}

.search-entry {
  color: #ef4238;
  font-weight: 700;
  height: 100%;
  line-height: 90px;
  padding: 0 30px;
}

.search-entry .iconfont {
  font-size: 36px;
}

.switch-content {
  padding-top: 16;
  padding-bottom: 100px;
}

.title {
  padding: 0 30px;
  padding-top: 20px;
  font-size: 28px;
  color: #333;
}

.most-expected {
  position: relative;
  padding: 0 30px;
  padding-bottom: 20px;
  border-bottom: 20px solid #f5f5f5;
  .title {
    padding-left: 0;
    margin-bottom: 20px;
  }
  .expected-item {
    display: inline-block;
    width: 170px;
    overflow: hidden;
    margin-right: 20px;
  }
  .poster {
    position: relative;
    width: 170px;
    height: 230px;
    margin-bottom: 12px;
  }

  .name {
    margin-bottom: 3px;
    font-size: 24px;
    color: #333;
  }

  .data {
    font-size: 24px;
    color: #999;
  }
}
</style>

