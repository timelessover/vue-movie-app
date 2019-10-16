<template>
	<div class="comment-detail">
		<div>
			<div class="hot" v-if="hcmts.length">
				<div class="comment-title">热门评论</div>
				<div v-for="(comment,index) in hcmts" :key="index">
					<commentSection :comment="comment"></commentSection>
				</div>
			</div>
		</div>
		<div class="hot" v-if="cmts.length">
			<div class="comment-title">最新评论</div>
			<List
				:immediate-check="check"
				v-model="loading"
				:offset="offset"
				:finished="finished"
				finished-text="没有更多了"
				@load="onReachBottom"
			>
				<div v-for="(comment,index) in cmts" :key="index">
					<commentSection :comment="comment"></commentSection>
				</div>
			</List>
		</div>
	</div>
</template>

<script>
import commentSection from "@/components/commentSection.vue";
import { List } from "vant";
import { handleImgandStars } from "@/mixin/handleImgandStars.js";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    commentSection,
    List
  },
  mixins: [handleImgandStars],
  data() {
    return {
      movieId: "",
      cmts: [], //最新评论
      hcmts: [], //热门评论
      loadComplete: false, //是否加载完
      finished: false,
      offset: 200,
      loading: false,
      check: false
    };
  },
  created() {

    const options = this.$route.query
    this.initPage(options);
  },

  methods: {
    //初始化页面
    initPage(options) {
      const movieId = options.movieId;
      const movieName = options.movieName;
      this.$store.commit('changeTitle',`观众评论-${movieName}`)
      this.$store.commit('IsBackPage',true)
      this.movieId = movieId;
      this.getComment(movieId);
    },
    //获取观众评论
    async getComment(movieId) {
      if (this.loadComplete) {
        return;
      }
      const cmts = this.cmts;
      const res = await this.$http.get(`/movie/comments?movieId=${movieId}`);
      let comments = res.data;
      const newCmts = [...cmts, ...this.formatData(comments.cmts)];
      this.hcmts = this.formatData(comments.hcmts);
      this.cmts = newCmts;
      this.loadComplete = newCmts.length >= comments.total;
    },
    onReachBottom() {
        if (this.loadComplete) {
          this.finished = true;
          this.loading = false;
        } else {
          this.loading = true;

          this.getComment(this.movieId);
          // 要确定数据加载完毕在check长度，否则会多次触发
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-title {
  height: 60px;
  font-size: 28px;
  background: #f5f5f5;
  color: #666;
  line-height: 60px;
  padding-left: 30px;
}
</style>
