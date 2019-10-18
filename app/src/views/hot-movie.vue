<template>
  <div>
    <List
      :immediate-check="check"
      v-model="loading"
      :offset="offset"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div>
        <div v-for="(item,index) in movieList" :key="index">
          <movie-section :movie="item"></movie-section>
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
  name: "hot-movie",
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
      mostExpectedList: [],
      loadComplete: false
    };
  },
  created() {
    this.$store.commit("changeTitle", "热映");
    this.getFrirstList();
  },
  watch: {
    movieIds: "onLoad"
  },
  activated() {
    this.$store.commit("changeTitle", "热映");
    this.$store.commit('IsBackPage',false)
  },
  methods: {
    async getFrirstList() {
      const res = await this.$http.get("/movie/movieOnInfoList");
      this.movieList = this.formatImgUrl(res.data.movieList);
      this.movieIds = res.data.movieIds;
      if (res.data.movieList.length >= res.data.movieIds.length) {
        this.loadComplete = true;
      }
    },
    // //上拉触底刷新的加载函数
    async ReachBottom(list, ids, complete) {
      if (complete) {
        return;
      }
      const length = list.length;
      if (length + 10 >= ids.length) {
        this.loadComplete = true;
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
      if (this.movieIds.length) {
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
      }
    },
    //上拉触底刷新
    loadBottom() {
      const { movieList, movieIds, loadComplete } = this;
      this.ReachBottom(movieList, movieIds, loadComplete);
    }
  }
};
</script>