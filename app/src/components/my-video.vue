<style lang='scss' scoped >
.__cov-video-container {
  position: relative;
  width: 100%;
  background-color: #000;
  .icon-zanting {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    color: #f5f5f5;
    font-size: 100px;
  }
}

.__cov-video {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
}

.__cov-contrl-content {
  position: absolute;
  display: flex;
  left: 0;
  bottom: 0;
  background-color: rgba(34, 34, 34, 0.9);
  height: 40px;
  width: 100%;
  z-index: 2147483647;
}
.__cov-contrl-play-btn {
  position: relative;
  background: none;
  border: none;
  height: 40px;
  width: 80px;
  outline: none;
  vertical-align: top;
}
.__cov-contrl-play-btn-icon {
  position: absolute;
  height: 20px;
  width: 20px;
  top: 50%;
  left: 50%;
  margin-left: -11px;
  margin-top: -11px;
}
.__cov-contrl-vol-btn-icon {
  position: absolute;
  height: 22px;
  width: 22px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.__cov-contrl-video-slider {
  position: relative;
  display: inline-block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: all 0.2s ease-in;
  padding: 10px;
}
.__cov-contrl-video-rail {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  margin-top: -2px;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  z-index: 1;
}
.__cov-contrl-video-rail-inner {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: #dd403b;
  transition: width 0.1s;
  width: 0;
  z-index: 3;
}
.__cov-contrl-video-rail-inner-v {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: rgba(255, 255, 255, 1);
  transition: width 0.4s;
  z-index: 2;
}
.__cov-contrl-video-inner {
  position: absolute;
  display: inline-block;
  left: 0;
  top: 50%;
  background: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
  background-clip: padding-box;
  border: solid 5px rgba(255, 255, 255, 0.6) !important;
  border-radius: 50%;
  margin-top: -12px;
  z-index: 5;
  transition: all 16ms;
}
.__cov-contrl-video-time {
  padding: 0 10px;
}
.__cov-contrl-video-time-text {
  color: #fff;
  line-height: 40px;
  font-size: 14px;
}
.__cov-contrl-video-time-total {
  line-height: 40px;
  font-size: 14px;
  color: #999;
}
::-webkit-media-controls {
  display: none !important;
}
video::-webkit-media-controls {
  display: none !important;
}
video::-webkit-media-controls-enclosure {
  display: none !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <div id="app">
    <div class="container">
      <div class="__cov-video-container" @click="toggleContrlShow">
        <div class="iconfont icon-zanting" v-show="!state.playing"></div>
        <video
          :class="{ 'hide-cursor': !state.contrlShow }"
          class="__cov-video"
          @timeupdate="getTime"
          @error="errorHandler"
          :poster="options.poster"
          :autoplay="options.autoplay"
          :preload="options.preload"
          playsinline="true"
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          v-for="(source,index) in sources"
          :src="source.src"
          :key="index"
          :type="source.type"
        ></video>
        <transition name="fade">
          <div class="__cov-contrl-content" v-show="state.contrlShow" @click.stop>
            <button class="__cov-contrl-play-btn" @click="play">
              <svg
                class="__cov-contrl-play-btn-icon"
                v-show="!state.playing"
                viewBox="0 0 47 57"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Triangle 1</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon
                    id="Triangle-1"
                    stroke="#FFFFFF"
                    fill="#FFFFFF"
                    points="1 56 1 1 47 28.5"
                  ></polygon>
                </g>
              </svg>
              <svg
                class="__cov-contrl-play-btn-icon"
                v-show="state.playing"
                viewBox="0 0 15 22"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Combined Shape</title>
                <desc>Created with Sketch.</desc>
                <defs>
                  <path
                    d="M0,0.979149244 L5,0.979149244 L5,22 L0,22 L0,0.979149244 Z M10,0.979149244 L15,0.979149244 L15,22 L10,22 L10,0.979149244 Z"
                    id="path-1"
                  ></path>
                  <mask
                    id="mask-2"
                    maskContentUnits="userSpaceOnUse"
                    maskUnits="objectBoundingBox"
                    x="0"
                    y="0"
                    width="15"
                    height="21.0208508"
                    fill="white"
                  >
                    <use xlink:href="#path-1"></use>
                  </mask>
                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <use
                    id="Combined-Shape"
                    stroke="#FFFFFF"
                    mask="url(#mask-2)"
                    stroke-width="2"
                    fill="#FFFFFF"
                    xlink:href="#path-1"
                  ></use>
                </g>
              </svg>
            </button>
            <!-- 进度条 -->
            <div class="__cov-contrl-video-slider" @click="slideClick" @touchstart="videoMove">
              <div
                class="__cov-contrl-video-inner"
                :style="{ 'transform': `translate3d(${video.pos.current}px, 0, 0)`}"
              ></div>
              <!-- 已经播放进度 -->
              <div class="__cov-contrl-video-rail">
                <div
                  class="__cov-contrl-video-rail-inner"
                  :style="{ width:`${video.pos.current}px`}"
                ></div>
                <div class="__cov-contrl-video-rail-inner-v" :style="{ width:`${video.loaded}%`}"></div>
              </div>
            </div>
            <div class="__cov-contrl-video-time">
              <span class="__cov-contrl-video-time-text">{{video.displayTime}}</span>
              <span class="__cov-contrl-video-time-total">/{{video.totalTime}}</span>
            </div>
            <button class="__cov-contrl-play-btn" @click="fullScreen">
              <svg
                class="__cov-contrl-vol-btn-icon"
                viewBox="0 0 33 33"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <path
                    d="M31.1682064,22 L31.1682064,31.0073537 L22,31.0073537 M22,1 L31.0073537,1 L31.0073537,10.1682064 M1,10.0073537 L1,1 L10.1682064,1 M10.0073537,31.1682064 L1,31.1682064 L1,22"
                    id="Combined-Shape"
                    stroke="#FFFFFF"
                    stroke-width="2"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
const getHandPosition = function(e, type = "x") {
  let distance
  if (type === "x") {
    distance = e.touches ? e.touches[0].pageX : e.pageX;
  }else{
    distance = e.touches ? e.touches[0].pageY : e.pageY;
  }
  
  return distance
};
const pad = val => {
  val = Math.floor(val);
  if (val < 10) {
    return "0" + val;
  }
  return val + "";
};
const timeParse = sec => {
  let min = 0;
  min = Math.floor(sec / 60);
  sec = sec - min * 60;
  return pad(min) + ":" + pad(sec);
};
export default {
  props: {
    sources: Array,
    options: {
      type: Object,
      default() {
        return {
          autoplay: false,
          poster: ""
        };
      }
    }
  },
  data() {
    return {
      $video: null,
      video: {
        $videoSlider: null,
        len: 0, // 进度条长度
        current: 0, // 当前播放长度
        loaded: 0, // 预加载长度
        moving: false, // 拖动状态
        displayTime: "00:00", // 正再播放时长
        totalTime: "00:00", // 总时长
        pos: {
          start: 0, // 手势位置
          width: 0, // 进度条已经进行的宽度
          innerWidth: 0, // 点的内部宽度
          current: 0 //点当前位置
        }
      },
      player: {
        $player: null, //播放器
        pos: null // 播放器位置
      },
      tmp: {
        contrlHideTimer: null // 显示定时器
      },
      state: {
        contrlShow: true, // 是否显示 controll 状态
        currentTime: 0, // 当前时间
        fullScreen: false, // 是否全屏
        playing: false // 是否为播放状态
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },

  beforeDestroy() {
    document.body.removeEventListener("touchstart", this.handMoveAction);
    document.body.removeEventListener("touchend", this.handUpAction);
  },
  methods: {
    init() {

      this.$video = this.$el.getElementsByTagName("video")[0];
      if (this.options.autoplay) {
        this.play();
      }
      this.initCore();
      document.body.addEventListener("touchmove", this.handMoveAction, false);
      document.body.addEventListener("touchend", this.handUpAction, false);
    },
    initCore() {
      this.initVideo();
      this.initPlayer();
    },
    initPlayer() {
      const $player = this.$el.getElementsByClassName(
        "__cov-video-container"
      )[0];
      this.player.pos = $player.getBoundingClientRect();
      this.player.$player = $player;
    },
    initVideo() {
      const $videoSlider = this.$el.getElementsByClassName(
        "__cov-contrl-video-slider"
      )[0];
      const $videoInner = $videoSlider.getElementsByClassName(
        "__cov-contrl-video-inner"
      )[0];
      this.$videoSlider = $videoSlider;
      this.video.pos.start =
        $videoSlider.getBoundingClientRect().left +
        this.video.pos.innerWidth / 2;
      this.video.pos.innerWidth = $videoInner.getBoundingClientRect().width;
      this.video.pos.width =
        $videoSlider.getBoundingClientRect().width - this.video.pos.innerWidth;
      this.getTime();
    },
    /**
     *  自动关闭 control
     */
    handLeaveVideo(e) {
      if (this.tmp.contrlHideTimer) {
        clearTimeout(this.tmp.contrlHideTimer);
      }
      this.tmp.contrlHideTimer = setTimeout(() => {
        this.state.contrlShow = false;
        this.tmp.contrlHideTimer = null;
      }, 2000);
    },
    toggleContrlShow() {
      this.state.contrlShow = !this.state.contrlShow;
      this.handLeaveVideo();
    },
    /**
     *  预加载进度条
     */
    getTime() {
      this.video.loaded =
        (this.$video.buffered.length &&
          this.$video.buffered.end(0) / this.$video.duration) * 100;
      this.video.len = this.$video.duration;
    },
    /**
     *  获取当前的时间
     */
    setVideoByTime(percent) {
      this.$video.currentTime = Math.floor(percent * this.video.len);
    },
    /**
     *  开始播放
     */
    play() {
      this.state.playing = !this.state.playing;
      if (this.$video) {
        if (this.state.playing) {
          this.$video.play();
          this.handLeaveVideo();
          this.$video.addEventListener("timeupdate", this.timeline);
          this.$video.addEventListener("ended", e => {
            this.state.playing = false;
            this.video.pos.current = 0;
            this.$video.currentTime = 0;
          });
        } else {
          this.$video.pause();
        }
      }
    },
    /**
     *  事件轴计算
     */
    timeline() {
      const percent = this.$video.currentTime / this.$video.duration;
      this.video.pos.current = (this.video.pos.width * percent).toFixed(3);
      this.video.displayTime = timeParse(this.$video.currentTime);
      this.video.totalTime = timeParse(this.$video.duration);
    },
    /**
     *  触发 touchstart 事件
     */
    videoMove(e) {
      this.initVideo();
      this.video.moving = true;
    },
    fullScreen() {
      if (!this.state.fullScreen) {
        this.state.fullScreen = true;
        this.$video.webkitRequestFullScreen();
      } else {
        this.state.fullScreen = false;
        document.webkitCancelFullScreen();
      }
      setTimeout(this.initVideo, 200);
    },
    // 点击进度条
    slideClick(e) {
      this.videoSlideMove(e);
    },
    handMoveAction(e) {
      if (this.video.moving) {
        this.videoSlideMove(e);
      }
      this.contrlHider(e);
    },
    /**
     *  隐藏 control 控制条
     */
    contrlHider(e) {
      const x = getHandPosition(e, "x");
      const y = getHandPosition(e, "y");
      if (!this.player.pos) return;
      return this.handLeaveVideo();
    },
    /**
     *  进度条 touchmove 滑动
     */
    videoSlideMove(e) {
      const x = getHandPosition(e) - this.video.pos.start;
      if (x > 0 && x < this.video.pos.width) {
        this.video.pos.current = x;
        this.setVideoByTime(x / this.video.pos.width);
      }
    },
    /**
     *  touchend 拖动结束
     */
    handUpAction(e) {
      this.video.moving = false;
    },
    errorHandler() {
      this.$emit("errorHandler");
    }
  }
};
</script>
