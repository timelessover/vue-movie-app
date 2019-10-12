<template>
  <div v-if="info && current !==-1">
    <div class="video-box">
      <div class="iconfont icon-zanting" v-show="play"></div>
      <video
        width="100%"
        autoplay
        preload="preload"
        playsinline="true"
        webkit-playsinline="true"
        ref="videoPlayer"
        @click="initVideo"
        @ended="endHandle"
        @error="errorHandle"
        :src="currentVideo"
      >
        <!-- <source :src="currentVideo" type="video/mp4"> -->
      </video>
    </div>
    <div class="my-scroll">
      <div class="movie-intro-desc">
        <div class="name-box">
          <div class="name">{{info.movieName}}</div>
          <div class="tag-box" v-if="info.version">
            <text class="tag-d">{{info.version[0]}}</text>
            <text v-if="info.version[1]" class="tag-imax">{{info.version[1]}}</text>
          </div>
        </div>
        <div class="sc-box">
          <div v-if="info.globalReleased">
            <div v-if="info.sc">猫眼评分
              <text class="yellow">{{info.sc}}</text>
            </div>
            <div v-else>暂无评分</div>
          </div>
          <div v-else>
            <text class="yellow">{{info.wish}}</text>人想看
          </div>
        </div>
        <div class="release">{{info.release}}</div>
        <div class="buy-tickets" @click="goTo">
          <div v-if="info.showst===3" class="btn">购票</div>
          <div v-else-if="info.showst===1" class="btn want-see">想看</div>
          <div v-else-if="info.showst===4" class="btn pre-sale">预售</div>
        </div>
      </div>
      <div class="list-box" v-if="videoList.length">
        <div class="play-title">播放列表 （{{videoList.length}}）</div>
        <div
          v-for="(item,index) in videoList"
          :key="index"
          class="video-item"
          @click="selectItem(index)"
        >
          <div class="img-box">
            <img :src="item.videoImg">
            <div class="txt" v-if="current===index">播放中</div>
          </div>
          <div :class="['video-name', {'red':current === index}]">{{item.videoName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandom } from "utils/util.js";
import {Toast} from 'vant';
export default {
  data() {
    return {
      info: null,
      videoList: [], //播放列表
      current: 0, //当前播放视频索引
      play: false
    };
  },
  created() {
    const opt = this.$route.query;
    const paramsObj = JSON.parse(opt.paramsStr);
    this.initData(paramsObj);
  },
  watch:{
    current:function(){
      this.play = false
    }
  },
  computed: {
    currentVideo: function() {
      return this.videoList[this.current].videourl;
    }
  },
  methods: {
    initVideo() {
      if (this.play) {
        this.play = false;
        this.$refs.videoPlayer.play();
      } else {
        this.play = true;
        this.$refs.videoPlayer.pause();
      }
    },
    initData(obj) {
      //没有获取video列表的API，所以只能自己模拟一个播放列表
      const random = getRandom(1, 4);
      const videoList = [
        {
          ...obj.video
        },
        {
          videoImg:
            "https://p0.meituan.net/movie/bf98c928c915aafe9b44a55c1d6b6d1025670.jpg",
          videoName: "今日爆燃上映 十月最爽解压大片没有之一",
          videourl:
            "https://maoyan.meituan.net/movie/videos/854x4806c4105439189467588ce837ee08bc123.mp4"
        },
        {
          videoImg:
            "https://p0.meituan.net/movie/f87a64c44eaa0216d541fb6f013eba4123888.jpg",
          videoName: "小美好”版终极预告片 今年最减龄减压的青春片！",
          videourl:
            "https://maoyan.meituan.net/movie/videos/854x48041256160be8947b182921987f3e9da4c.mp4"
        },
        {
          videoImg:
            "https://p1.meituan.net/movie/2e0b6243ca72bc212f5288be3d36f41225058.jpg",
          videoName: "悲伤逆流成河 终极预告片",
          videourl:
            "https://maoyan.meituan.net/movie/videos/854x480ba7b338968d44f90a099254eea294ef0.mp4"
        }
      ];
      this.videoList = videoList;
      this.info = obj;
      this.setCurrent(this.current);
    },
    //设置当前播放视频
    setCurrent(current) {
      const { info, videoList } = this;
      this.$store.commit(
        "changeTitle",
        `${info.movieName} ${videoList[current].videoName}`
      );
      this.$store.commit("IsBackPage", true);
      this.current = current;
    },
    //播放列表的点击事件
    selectItem(index) {
      if (index !== this.current) {
        console.log(index);
        this.setCurrent(index);
      }
    },
    //视频播放结束
    endHandle() {
      const { current, videoList } = this;
      let index = current + 1;
      if (index === videoList.length) {
        index = 0;
      }
      this.setCurrent(index);
    },
    errorHandle() {
      Toast.fail('播放地址失效');
      this.endHandle()
    },
    //购票
    goTo() {
      const info = this.info;
      const VideoContext = uni.createVideoContext("my-video", this);
      VideoContext.pause();
      uni.navigateTo({
        url: `../select-cinema/select-cinema?movieId=${info.id}&movieName=${
          info.movieName
        }&showTime=${info.rt}`
      });
    }
  }
};
</script>

<style lang="scss">
.video-box {
  width: 100%;
  height: 420px;
  position: relative;
  .icon-zanting {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #f5f5f5;
    font-size: 100px;
  }
}

#my-video {
  width: 100%;
  height: 420px;
}

.my-scroll {
  height: calc(100vh - 420px);
  width: 100%;
}

.movie-intro-desc {
  position: relative;
  padding: 30px;
  border-bottom: 20px solid #f5f5f5;
  color: #666;
  font-size: 26px;
}

.name-box {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 38px;
}

.tag-box {
  border: 0.02rem solid #b3b5b9;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 20px;
  margin-left: 4px;
}

.tag-d {
  color: #fff;
  padding: 0 4px;
  background-color: #b3b5b9;
}

.tag-imax {
  color: #b3b5b9;
  padding: 0 4px;
}

.yellow {
  color: #ffc600;
  font-size: 32px;
}

.sc-box {
  margin: 10px 0;
}

.buy-tickets {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
}

.play-title {
  padding: 30px;
  border: 1px solid #f5f5f5;
  font-size: 30px;
  color: #333;
}

.video-item {
  display: flex;
  padding: 30px;
  padding-left: 0;
  margin-left: 30px;
  border-bottom: 1px solid #f5f5f5;
}

.img-box {
  position: relative;
  width: 220px;
  height: 124px;
}

.img-box img {
  width: 220px;
  height: 124px;
}

.txt {
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: #fff;
  font-size: 24px;
}

.video-name {
  /* 多行文字溢出打省略号 */
  flex: 1;
  margin-left: 30px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 30px;
  color: #666;
}

.red {
  color: #f03d37;
}
</style>
