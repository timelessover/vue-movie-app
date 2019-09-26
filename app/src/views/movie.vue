<template>
  <div class="movie">
    <div class="topbar">
      <router-link class="city-entry" to="./city-select">
        <span class="city-name">{{city}}</span>
        <span class="city-entry-arrow"></span>
      </router-link>
      <div class="switch-hot">
        <div
          v-for="(item,index) in tabList"
          :key="index"
          :class="['hot-item',{ 'active':index == switchItem}]"
          @click="selectItem(index)"
        >{{item.title}}</div>
      </div>
      <router-link class="search-entry" to="./search-page?stype=-1">
        <span class="iconfont icon-sousuo"></span>
      </router-link>
    </div>
    <div class="switch-content">
      <!-- tab1列表 -->
      <div v-show="switchItem === 0">
        <div v-for="(item,index) in movieList0" :key="index">
          <movie-section :movie="item"></movie-section>
        </div>
        <div v-if="!loadComplete0 && movieList0.length">
          <!-- <loadingMore></loadingMore> -->
        </div>
      </div>
      <!-- tab2列表 -->
      <div v-show="switchItem===1">
        <div class="most-expected" v-if="mostExpectedList.length">
          <div class="title">近期最受期待</div>
          <scroll-div class="scroll-div_H" scroll-x @scrolltolower="lower">
            <div v-for="(movie) in mostExpectedList" :key="movie.id">
              <router-link to="movie.url" class="expected-item">
                <img :src="movie.img" class="poster">
                <div class="name line-ellipsis">{{movie.nm}}</div>
                <div class="data line-ellipsis">{{movie.wish}}人想看</div>
                <div class="data">{{movie.comingTitle}}</div>
              </router-link>
            </div>
          </scroll-div>
        </div>
        <div v-for="(movie) in movieList1" :key="movie.id">
          <movie-section :movie="movie" rt="true"></movie-section>
        </div>
        <div v-if="!loadComplete1 && movieList1.length">
          <!-- <loadingMore></loadingMore> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore, Indicator } from "mint-ui";
import { mapState, mapMutations } from "vuex";
import { handleUrl } from "@/mixin/handleUrl";
import  movieSection  from "components/movieSection";

export default {
  name: "movie",
  components: {
    Loadmore,
    movieSection
  },
  mixins: [handleUrl],
  data() {
    return {
      city_name: "北京",
      tabList: [
        {
          title: "热映"
        },
        {
          title: "待映"
        }
      ],
      switchItem: 0,
      movieList0: [],
      movieIds0: [],
      loadComplete0: false, //‘正在上映’数据是否加载到最后一条
      mostExpectedList: [],
      movieList1: [],
      movieIds1: [],
      loadComplete1: false,
      loadComplete2: false //水平滚动加载的数据是否加载完毕
    };
  },
  computed: {
    city() {
      if (!this.$store.state.selectCity) {
        return "正在定位";
      } else {
        return this.$store.state.selectCity.cityName || this.city_name;
      }
    }
  },
  created() {
    this.getFrirstList();
  },
  methods: {
    selectItem(index) {
      this.switchItem = index;
      if (index === 1 && !this.mostExpectedList.length) {
        this.getMostExpected();
        this.getComing();
      }
    },
    async getComing(index = 0) {
      const res = await this.$http.get("/movie/mostExpected");
      Indicator.close();
      let mostExpectedList = this.formatImgUrl(res.data.coming, true);
      mostExpectedList.forEach(item => {
        item.url = `movie-detail/movie-detail?movieId=${item.id}`;
      });
      this.mostExpectedList = mostExpectedList;
    },
    async getMostExpected() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      const res = await this.$http.get("/movie/comingList");
      Indicator.close();
      this.movieIds1 = res.data.movieIds;
      this.movieList1 = this.formatImgUrl(res.data.coming);
    },
    async getFrirstList(index = 0) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      const res = await this.$http.get("/movie/movieOnInfoList");
      Indicator.close();
      this.movieList0 = this.formatImgUrl(res.data.movieList);
      this.movieIds0 = res.data.movieIds;
      if (res.data.movieList.length >= res.data.movieIds.length) {
        this.loadComplete0 = true;
      }
    },
    //上拉触底刷新的加载函数
    async ReachBottom(list, ids, complete, item) {
      if (complete) {
        return;
      }
      const length = list.length;
      if (length + 10 >= ids.length) {
        this[`loadComplete${item}`] = true;
      }
      let query = ids.slice(length, length + 10).join("%2C");
      const res = await this.$http.get(
        `/movie/moreComingList?token=&movieIds=${query}`
      );
      const arr = this.formatImgUrl(res.data.coming);
      this[`movieList${item}`] = [...list, ...arr];
    },
    //滚动到最右边时的事件处理函数
    async lower() {
      const { mostExpectedList, loadComplete2 } = this;
      const length = mostExpectedList.length;
      if (loadComplete2) {
        return;
      }
      const res = await this.$http.get(
        `/movie/mostExpected?limit=10&offset=${length}&token=`
      );
      this.tmostExpectedList = mostExpectedList.concat(
        this.formatImgUrl(res.data.coming, true)
      );
      this.loadComplete2 = !res.data.paging.hasMore || !res.data.coming.length; //当返回的数组长度为0时也认为数据请求完毕
    },
    //上拉触底刷新
    onReachBottom() {
      const {
        switchItem,
        movieList0,
        movieIds0,
        loadComplete0,
        movieList1,
        movieIds1,
        loadComplete1
      } = this;
      if (this.switchItem === 0) {
        this.ReachBottom(movieList0, movieIds0, loadComplete0, 0);
      } else {
        this.ReachBottom(movieList1, movieIds1, loadComplete1, 1);
      }
    },
    // 下拉更新列表
    onPullDownRefresh() {
      const { switchItem } = this;
      if (switchItem === 0) {
        this.getFrirstList(1);
      } else {
        this.getComing(1);
      }
    }
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
  padding-bottom: 30px;
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
}

.most-expected .title {
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
</style>

