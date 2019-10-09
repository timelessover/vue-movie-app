<template>
  <div class="container" :style="{position: isShow ? 'fixed' : ''}">
    <div class="topbar">
      <router-link class="city-entry" to="/city-select">
        <span class="city-name">{{city}}</span>
        <span class="city-entry-arrow"></span>
      </router-link>
      <router-link to="/search-page" class="search-input">
        <span class="iconfont icon-sousuo"></span>搜影院
      </router-link>
    </div>
    <div class="nav-wrapper">
      <filter-nav
        :city-cinema-info="cityCinemaInfo"
        @change="changeCondition"
        @toggleShow="toggleShow"
      />
    </div>
    <List
      :immediate-check="check"
      :offset="offset"
      v-model="loading"
      :finished="loadComplete"
      @load="onReachBottom"
    >
      <div class="cinema-list">
        <cinemaSection v-for="(cinema,index) in cinemas" :key="index" :cinema="cinema"></cinemaSection>
      </div>
    </List>
    <div v-show="nothing">
      <empty message="暂无符合条件的影院"></empty>
    </div>
  </div>
</template>

<script>
import cinemaSection from "@/components/cinemaSection.vue";
import empty from "@/components/empty.vue";
import filterNav from "@/components/filter-nav.vue";
import { getToday } from "@/utils/util.js";
import { Toast, List } from "vant";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    cinemaSection,
    empty,
    filterNav,
    List
  },
  data() {
    return {
      params: {
        day: getToday(),
        offset: 0,
        limit: 20,
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId: -1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,
        item: "",
        updateShowDay: false
      },
      nothing: false, //结果是否为空
      cinemas: [], //影院列表
      cityCinemaInfo: {
        brand: {
          subItems: ""
        },
        service: {
          subItems: ""
        },
        hallType: {
          subItems: ""
        }
      }, //nav列表
      loadComplete: false, //数据是否加载完
      isShow: false, //导航下拉框是否展开
      // list设置
      offset: 200,
      check: false,
      loading: false
    };
  },
  computed: {
    city() {
      if (!this.$store.state.selectCity) {
        return "正在定位";
      } else {
        return this.$store.state.selectCity;
      }
    }
  },
  created() {
    // 避免无限滚动缓存页面高度，返回调用接口返回空白
    document.documentElement.scrollTop = 0;
    this.initPage();
  },
  methods: {
    //初始化页面
    async initPage() {
      const filter = await this.getFliterCinemas();
      this.cityCinemaInfo = filter.data;
      const cinemasList = await this.getCinemas(this.params);
      this.cinemas = [...this.cinemas, ...cinemasList.data.cinemas];
      this.loadComplete = !cinemasList.data.paging.hasMore;
    },
    //获取影院列表
    getCinemas(params) {
      return this.$http.get("/cinemas/cinemaList", params);
    },
    getFliterCinemas() {
      return this.$http.get("/cinemas/filterCinemas");
    },
    //上拉触底加载更多
    onReachBottom() {
      const params = {
        ...this.params,
        offset: this.cinemas.length
      };
      if (this.loadComplete) {
        this.loading = false;
      } else {
        this.loading = true;
        this.getCinemas(params).then(res => {
          this.cinemas = [...this.cinemas, ...res.data.cinemas];
          this.loadComplete = !res.data.paging.hasMore;
          // 要确定数据加载完毕在check长度，否则会多次触发
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
      }
    },
    // 当过滤条件变化时调用的函数
    changeCondition(obj) {
      this.params = {
        ...this.params,
        ...obj
      };
      this.cinemas = [];
      this.nothing = false;
      this.getCinemas(this.params).then(list => {
        if (!list.data.cinemas.length) {
          this.nothing = true;
        }
        this.cinemas = [...this.cinemas, ...list.data.cinemas];
        this.loadComplete = !list.data.paging.hasMore;
      });
    },
    //导航下拉框状态变化时的处理
    toggleShow(e) {
      const item = e.detail.item;
      this.isShow = item !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.topbar {
  position: fixed;
  width: 100vw;
  height: 90px;
  border: none;
  background-color: #f5f5f5;
  top: 11vw;
}

.search-input {
  flex-grow: 1;
  height: 56px;
  font-size: 26px;
  color: #999;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  margin: 0 30px;
  background: #fff;
  line-height: 56px;
  text-align: center;
}

.icon-sousuo {
  display: inline-block;
  margin-right: 10px;
  font-size: 24px;
  color: #999;
}

.nav-wrapper {
  position: fixed;
  z-index: 10;
  top: 170px;
  left: 0;
  width: 100vw;
  height: 80px;
  background: #fff;
}

.cinema-list {
  // padding-bottom: 16vw;
  margin-top: 270px;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
