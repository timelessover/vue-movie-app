<template>
  <div>
    <my-video :sources="video.sources" :options="video.options"></my-video>
  </div>
</template>

<script>
import myVideo from "components/my-video.vue";

export default {
  components: {
    myVideo
  },
  data() {
    return {
      video: {
        sources: [
          {
            src: "http://maoyan.meituan.net/movie/videos/888x4809946dfb95c0b439b84533b4262f9d74d.mp4",
            type: "video/mp4"
          }
        ],
        options: {
          autoplay: true
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>