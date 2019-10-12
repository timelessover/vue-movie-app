<template>
  <div>
    <div class="most-expected" v-if="mostExpectedList.length">
      <div class="title">近期最受期待</div>
        <div class="scroll-view_H">
          <div v-for="(movie) in mostExpectedList" :key="movie.id">
            <router-link to="movie.url" class="expected-item">
              <img :src="movie.img" class="poster">
              <div class="name line-ellipsis">{{movie.nm}}</div>
              <div class="data line-ellipsis">{{movie.wish}}人想看</div>
              <div class="data">{{movie.comingTitle}}</div>
            </router-link>
          </div>
        </div>
    </div>
    <List
      :immediate-check="check"
      v-model="loading"
      :offset="offset"
      :finished="finished"
      @load="onLoad"
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
import { List } from "vant";
import { handleUrl } from "@/mixin/handleUrl";
import movieSection from "components/movieSection";
import { mapState, mapMutations } from "vuex";
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
      finished: false,
      check: false,
      movieList: [],
      movieIds: [],
      loadComplete: false, //‘正在上映’数据是否加载到最后一条
      mostExpectedList: []
    };
  },
  created() {
    this.$store.commit('changeTitle',"待映")
    this.getMostExpected();
    this.getComing();
  },
  methods: {
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
      this.movieIds = res.data.movieIds;
      this.movieList = this.formatImgUrl(res.data.coming);
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