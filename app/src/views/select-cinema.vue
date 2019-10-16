<template>
  <div class="container">
    <div class="top">
      <selectTime
        :days="days"
        :start-time="showTime"
        @selectDayEvent="changeTime"
        @changeDays="changedays"
      ></selectTime>
      <div>
        <Sticky :offset-top="90">
          <filter-nav
          :city-cinema-info="cityCinemaInfo"
          @change="changeCondition"
        ></filter-nav>
        </Sticky>
      </div>
    </div>
    <div class="main-content">
      <List
        :immediate-check="check"
        :offset="offset"
        v-model="loading"
        :finished="loadComplete"
        @load="onReachBottom"
      >
        <div class="cinema-list">
          <cinemaSection
            v-for="(cinema,index) in cinemas"
            :key="index"
            :cinema="cinema"
            :movieId="params.movieId"
            :days="params.day"
          ></cinemaSection>
        </div>
      </List>
      <div v-show="nothing">
        <empty message="暂无符合条件的影院"></empty>
      </div>
      <div v-show="noSchedule">
        <empty message="当天暂无场次"></empty>
      </div>
    </div>
  </div>
</template>

<script>
import empty from "@/components/empty.vue";
import cinemaSection from "@/components/cinemaSection.vue";
import selectTime from "@/components/select-time.vue";
import filterNav from "@/components/filter-nav.vue";
import { mapState, mapMutations } from "vuex";
import { List,Sticky  } from "vant";

export default {
  components: {
    selectTime,
    filterNav,
    cinemaSection,
    empty,
    List,
    Sticky
  },
  data() {
    return {
      showTime: "", //影片上映日期
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
      params: {
        //影院搜索条件
        movieId: 0,
        day: "",
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
      days: null,
      cinemas: [], // 影院列表
      loadComplete: false, // 数据是否加载完
      nothing: false, // 是否有符合过滤的影院
      noSchedule: false, // 当天是否有场次，原本时间是由后台返回的，但是缺少城市ID就没有返回，导致当天可能没有播放场次
      offset: 200,
      check: false,
      loading: false
    };
  },
  created() {
    this.tabBarSetting("选择影院",true)
    const options = this.$route.query;
    this.initPage(options);
  },
  methods: {
    tabBarSetting(title,back){
       this.$store.commit("changeTitle", title);
       this.$store.commit("IsBackPage", back);
    },
    initPage(options) {
      const movieId = options.movieId;
      const movieName = options.movieName;
      const showTime = options.showTime; //影片上映日期
      this.showTime = showTime;
      this.params = {
        ...this.params,
        movieId
      };
    },
    //获取影院列表
    getCinemas(params) {
      return new Promise((resolve, reject) => {
        this.$http.post("/cinemas/forceUpdate", params).then(res => {
          // 缺少了城市ID所以返回值缺少showDays，只能自己模拟时间
          resolve(res);
        });
      });
    },
    //获取过滤菜单数据
    async getFilter() {
      const { params } = this;
      const res = await this.$http.get(
        `/cinemas/filterCinemas?movieId=${params.movieId}&day=${params.day}`
      );
      this.cityCinemaInfo = res.data;
    },
    //当选择的时间变化时触发
    async changeTime(day) {
      this.params = {
        ...this.params,
        ...day
      };
      this.showCinemas()
      this.getFilter();
    },
    // 获取最近七天影院信息
    changedays(days) {
      this.days = days;
    },
    // 影院信息显示状态
    async showCinemas(){
      this.cinemas = [];
      this.nothing = false;
      this.noSchedule = false;
      const list = await this.getCinemas(this.params);
      this.cinemas  = list.data.cinemas
      if (!this.cinemas.length) {
        this.noSchedule = true;
        this.nothing = false;
      }
    },
    //当过滤条件变化时调用的函数
    changeCondition(obj) {
      this.params = {
        ...this.params,
        ...obj
      };
      this.showCinemas()
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
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  color: #555;
  font-size: 28px;
  background: #fff;
  z-index: 10;
}
.main-content {
  padding-bottom: 30px;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
