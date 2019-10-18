<template>
  <div v-if="detailMovie">
    <div class="movie-header">
      <div class="movie-background" :style="detailMovieImg"></div>
      <div class="movie-mask"></div>
      <div class="movie-content">
        <div class="movie-poster" :style="detailMovieImg"></div>
        <div class="movie-info">
          <div class="movie-name line-ellipsis">{{detailMovie.nm}}</div>
          <div class="movie-ename line-ellipsis">{{detailMovie.enm}}</div>
          <div v-if="detailMovie.globalReleased">
            <div v-if="detailMovie.sc">
              <div class="movie-score line-ellipsis">
                <img
                  class="movie-star"
                  v-for="(item,index) in detailMovie.stars"
                  :key="index"
                  :src="item"
                >
                {{detailMovie.sc}}
              </div>
              <div class="score-num line-ellipsis">({{detailMovie.snum}}万人评分)</div>
            </div>
            <div class="no-score" v-else>暂无评分</div>
          </div>
          <div v-else class="movie-score">{{detailMovie.wish}}人想看</div>
          <div class="movie-category line-ellipsis">
            <div>{{detailMovie.cat}}</div>
            <div class="tag-box" v-if="detailMovie.version">
              <span class="tag-d">{{detailMovie.version[0]}}</span>
              <span v-if="detailMovie.version[1]" class="tag-imax">{{detailMovie.version[1]}}</span>
            </div>
          </div>
          <div class="movie-time line-ellipsis">{{detailMovie.src}} / {{detailMovie.dur}}分钟</div>
          <div class="movie-time line-ellipsis">{{detailMovie.pubDesc}}</div>
        </div>
      </div>
    </div>
    <div class="movie-body">
      <div class="section">
        <div class="section-title">剧情简介</div>
        <div :class="['synopsis',{'hidden':isFold}]">{{detailMovie.dra}}</div>
        <div :class="['iconfont','icon-xiala',{unfold:isFold} ]" @click="toggleFold"></div>
      </div>
      <div class="section">
        <div class="section-title">演职人员</div>
        <div class="scroll-view_H">暂无数据...</div>
      </div>
      <div class="section">
        <div class="section-title">媒体库</div>
        <div class="scroll-view_H">
          <div v-if="!detailMovie.videoImg && !detailMovie.photos.length">暂无数据...</div>
          <div class="videoImg-box" v-if="detailMovie.videoImg" @click="toVideo">
            <img :src="detailMovie.videoImg" class="videoImg">
            <div class="iconfont icon-zanting"></div>
          </div>
          <div class="photo">
            <img
              v-for="(item,index) in detailMovie.photos"
              :key="item"
              :src="item"
              @click="preViewImage(index)"
            >
          </div>
        </div>
      </div>
      <div class="section" v-if="comments.total && comments.hcmts.length">
        <div class="section-title comment">观众评论</div>
        <div v-for="(comment,index) in comments.hcmts" :key="index">
          <comment-section :comment="comment"></comment-section>
        </div>
        <router-link v-if="comments.total" class="total" :to="watchAllUrl">查看全部{{comments.total}}条短评</router-link>
      </div>
    </div>
    <router-link :to="purchaseUrl" v-if="detailMovie.onSale" class="purchase">优惠购票</router-link>
  </div>
</template>

<script>
import { handleImgandStars } from "@/mixin/handleImgandStars.js";
import commentSection from "@/components/commentSection.vue";
import { ImagePreview } from "vant";

export default {
  components: {
    commentSection,
    ImagePreview
  },
  mixins: [handleImgandStars],
  data() {
    return {
      detailMovie: null, //电影详情
      isFold: true,
      comments: {}, //观众评论
      viewImg: null
    };
  },
  created() {
    this.$store.commit("changeTitle", "电影详情");
    this.$store.commit("IsBackPage", true);
    const movieId = this.$route.query.movieId;
    this.initPage(movieId);
  },
  computed: {
    detailMovieImg() {
      if (this.detailMovie) {
        return `background-image: url(${this.detailMovie.img})`;
      }
    },
    watchAllUrl() {
      if (this.detailMovie) {
        return `/movie/movie-detail/comment-detail?movieId=${
          this.detailMovie.id
        }&movieName=${this.detailMovie.nm}`;
      }
    },
    purchaseUrl() {
      if (this.detailMovie) {
        return `/movie/movie-detail/select-cinema?movieId=${
          this.detailMovie.id
        }&movieName=${this.detailMovie.nm}&showTime=${this.detailMovie.rt}`;
      }
    }
  },
  // 这个要后退时候卸载组件，要不会出现bug
  beforeRouteLeave(to, from, next) {
    this.viewImg && this.viewImg.close();
    next()
  },
  methods: {
    //初始页面
    async initPage(movieId) {
      this.getComment(movieId);
      const res = await this.$http.get(`/movie/detailmovie?movieId=${movieId}`);
      this.detailMovie = this.handleData(res.data.detailMovie);
    },
    //获取观众评论
    async getComment(movieId) {
      const res = await this.$http.get(`/movie/comments?movieId=${movieId}`);
      let comments = { ...res.data };
      if (comments.total) {
        const arr = comments.hcmts.length ? comments.hcmts : comments.cmts;
        comments.hcmts = this.formatData(arr.slice(0, 3));
      }
      this.comments = comments;
    },
    //预览图片
    preViewImage(currentIndex) {
      const urls = this.detailMovie.photos.map(item =>
        item.replace("420w_279h", "375w_250h")
      );
      this.viewImg = ImagePreview({
        images: urls,
        startPosition: currentIndex
      });
    },

    //处理数据
    handleData(data) {
      let obj = data;
      obj.img = obj.img.replace("w.h", "177.249");
      //将类似“v3d imax”转化为['3D','IMAX']
      obj.version =
        obj.version &&
        obj.version.split(" ").map(item => {
          return item.toUpperCase().replace("V", "");
        });
      //将评分人数单位由个转化为万
      obj.snum = obj.snum / 10000;
      obj.snum = obj.snum.toFixed(1);

      //评分星星,满分10分，一颗满星代表2分
      obj.stars = this.formatStar(obj.sc / 2);
      //处理媒体库的图片
      obj.photos = obj.photos.map(
        item => item.replace("w.h/", "").split("@")[0] + "@420w_279h_1e_1c"
      );
      return obj;
    },
    //折叠与展开剧情简介
    toggleFold() {
      this.isFold = !this.isFold;
    },
    //跳转到video页面
    toVideo() {
      const detailMovie = this.detailMovie;
      const paramsStr = JSON.stringify({
        video: {
          videourl: detailMovie.videourl,
          videoImg: detailMovie.videoImg,
          videoName: detailMovie.videoName
        },
        movieName: detailMovie.nm, //电影名称
        id: detailMovie.id, //电影ID
        version: detailMovie.version, //电影类型（3d、IMAX）
        release: detailMovie.pubDesc, //上映时间
        rt: detailMovie.rt, //电影上映时间
        wish: detailMovie.wish, //想看的人数
        globalReleased: detailMovie.globalReleased, //是否上映
        sc: detailMovie.sc, //评分
        showst: detailMovie.showst //判读“想看”、“预售”
      });
      this.$router.push(
        `/movie/movie-detail/video-page?paramsStr=${paramsStr}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.movie-header {
  position: relative;
  height: 366px;
  box-sizing: border-box;
  padding: 30px;
  filter: blur(0);
  overflow: hidden;
}

.movie-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(30px);
  z-index: -1;
}

.movie-mask {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #40454e;
  opacity: 0.55;
}

.movie-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
}

.movie-poster {
  width: 214px;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  border: solid 1px #f0f2f3;
}

.movie-info {
  height: 300px;
  width: 60%;
  margin-left: 30px;
  padding-top: 10px;
  font-size: 22px;
  color: #e5e5e5;
}

.movie-name {
  font-size: 36px;
  font-weight: 600;
  color: #fff;
}

.movie-ename {
  color: #fff;
  margin-bottom: 12px;
}

.movie-score {
  color: #ffc600;
  font-size: 36px;
}

.movie-star {
  width: 36px;
  height: 36px;
  margin-right: 6px;
}

.score-num {
  font-size: 20px;
}

.no-score {
  font-size: 32px;
}

.movie-category {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.tag-box {
  color: #fff;
  border: 0.02rem solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 20px;
  margin-left: 4px;
}

.tag-d {
  padding: 0 4px;
  background-color: rgba(255, 255, 255, 0.4);
}

.tag-imax {
  padding: 0 4px;
}

.movie-body {
  margin-bottom: 110px;
}

.section {
  padding-bottom: 20px;
  border-bottom: 20px solid #f5f5f5;
  color: #555;
}

.section-title {
  padding: 20px 30px 10px;
  font-size: 32px;
  color: #444;
}

.synopsis {
  padding: 0 30px;
  line-height: 1.42;
  font-size: 30px;
}
.hidden {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.icon-jiantouarrow483 {
  height: 44px;
  width: 50px;
  background: red;
  text-align: center;
  font-size: 32px;
  line-height: 44px;
}

.unfold {
  transform: rotate(180deg);
}
.icon-xiala {
  text-align: center;
  font-size: 36px;
}

.scroll-view_H {
  padding: 0 30px;
  font-size: 30px;
  box-sizing: border-box;
}

.videoImg-box {
  position: relative;
  display: inline-block;
}

.icon-zanting {
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 40px;
  opacity: 0.7;
  color: #fff;
}

.videoImg {
  width: 330px;
  height: 180px;
  margin-right: 10px;
}

.photo {
  display: flex;
  img {
    height: 180px;
    width: 250px;
    margin-left: 10px;
    &:last-child {
      padding-right: 10px;
    }
  }
}

.purchase {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #e54847;
  color: #fff;
  font-size: 40px;
  line-height: 100px;
  text-align: center;
}

.comment {
  padding: 20px 30px;
  border-bottom: 1px solid #e6e6e6;
}

.total {
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  color: #f63;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  display: block;
}
</style>
