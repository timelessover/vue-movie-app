<template>
  <div class="container">
    <div style="padding-bottom: 92px;">
      <div style="position: fixed;">
        <div class="topbar">
          <router-link class="city-entry" to="/city-select">
            <span class="city-name">{{city}}</span>
            <span class="city-entry-arrow"></span>
          </router-link>
          <router-link to="/movie/search-page?stype=2" class="search-input">
            <span class="iconfont icon-sousuo"></span>搜影院
          </router-link>
        </div>
        <filter-nav
          :city-cinema-info="cityCinemaInfo"
          @change="changeCondition"
          @toggleShow="toggleShow"
        />
      </div>
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
  name: "cinema",
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
    this.$store.commit("changeTitle", "影院");
    this.$store.commit("IsBackPage", false);
    this.initPage();
  },
  activated() {
    this.$store.commit("changeTitle", "影院");
    this.$store.commit("IsBackPage", false);
  },
  methods: {
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
  width: 100vw;
  border: none;
  background-color: #f5f5f5;
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
  z-index: 10;
  width: 100vw;
  height: 80px;
  background: #fff;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
