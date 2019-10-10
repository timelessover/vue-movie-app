<template>
    <div>
        <div class="most-expected" v-if="mostExpectedList.length">
            <div class="title">近期最受期待</div>
            <div class="scroll-view_H">
                <List
                    :immediate-check="check"
                    v-model="loading1"
                    :offset="offset1"
                    :finished="finished1"
                    finished-text="没有更多了"
                    @load="onLoad1"
                >
                    <div v-for="(movie) in mostExpectedList" :key="movie.id">
                        <router-link to="movie.url" class="expected-item">
                            <img :src="movie.img" class="poster">
                            <div class="name line-ellipsis">{{movie.nm}}</div>
                            <div class="data line-ellipsis">{{movie.wish}}人想看</div>
                            <div class="data">{{movie.comingTitle}}</div>
                        </router-link>
                    </div>
                </List>
            </div>
        </div>
        <List
            :immediate-check="check"
            v-model="loading"
            :offset="offset"
            :finished="finished"
            @load="lower"
        >
            <div>
                <div v-for="(movie) in movieList" :key="movie.id">
                    <movie-section :movie="movie" rt="true"></movie-section>
                </div>
            </div>
        </List>
    </div>
</template>

<script>
import { List, Sticky } from "vant";
import { handleUrl } from "@/mixin/handleUrl";
import movieSection from "components/movieSection";

export default {
  name: "expected-movie",
  components: {
    movieSection,
    List
  },
  mixins: [handleUrl],
  data() {
    return {
      offset: 200,
      loading: false,
      loading1: false,
      finished: false,
      finished1: false,
      check: false,
      movieList: [],
      movieIds: [],
      loadComplete: false, //‘正在上映’数据是否加载到最后一条
      mostExpectedList: []
    };
  },
  created() {
    this.getMostExpected();
    this.getComing();
  },
  methods: {
    selectItem(index) {
      if (index === 0) {
        router.push("/movie/hot");
      } else {
        router.push("/movie/expected");
      }
    },
    async getComing(index = 0) {
      const res = await this.$http.get("/movie/mostExpected");
      let mostExpectedList = this.formatImgUrl(res.data.coming, true);
      mostExpectedList.forEach(item => {
        item.url = `movie-detail/movie-detail?movieId=${item.id}`;
      });
      this.mostExpectedList = mostExpectedList;
    },
    async getMostExpected() {
      const res = await this.$http.get("/movie/comingList");
      this.movieIds1 = res.data.movieIds;
      this.movieList1 = this.formatImgUrl(res.data.coming);
    },
    //上拉触底刷新的加载函数
    async ReachBottom(list, ids, complete) {
      if (complete) {
        return;
      }
      const length = list.length;
      if (length + 10 >= ids.length) {
        this.loadCompleteitem = true;
      }
      let query = ids.slice(length, length + 10).join("%2C");
      const res = await this.$http.get(
        `/movie/moreComingList?token=&movieIds=${query}`
      );
      const arr = this.formatImgUrl(res.data.coming);
      this.movieList = [...list, ...arr];
    },
    // 滚动到最右边时的事件处理函数
    async lower() {
      const { mostExpectedList, loadComplete } = this;
      const length = mostExpectedList.length;
      if (loadComplete) {
        return;
      }
      const res = await this.$http.get(
        `/movie/mostExpected?limit=10&offset=${length}&token=`
      );
      this.tmostExpectedList = mostExpectedList.concat(
        this.formatImgUrl(res.data.coming, true)
      );
      this.loadComplete = !res.data.paging.hasMore || !res.data.coming.length; //当返回的数组长度为0时也认为数据请求完毕
    },
    infiniteScrollLoad(item) {
      if (this[`loadComplete${item}`]) {
        this[`finished${item}`] = true;
        this[`loading${item}`] = false;
      } else {
        this[`loading${item}`] = true;
        this.loadBottom();
        // 要确定数据加载完毕在check长度，否则会多次触发
        setTimeout(() => {
          this[`loading${item}`] = false;
        }, 500);
      }
    },
    // 无限滚动
    onLoad() {
      if (this.loadComplete) {
        this.finished = true;
        this.loading = false;
      } else {
        this.loading = true;
        this.loadBottom();
        // 要确定数据加载完毕在check长度，否则会多次触发
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },
    //上拉触底刷新
    loadBottom() {
      const { movieList, movieIds, loadComplete } = this;
      this.ReachBottom(movieList, movieIds, loadComplete, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>