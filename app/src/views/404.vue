<template>
    <div>
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            ref="loadmore"
            :bottomAllLoaded ='load'
            :autoFill="false"
            @bottom-status-change="handleTopChange"
        >
            <ul>
                <li v-for="item in list">{{ item }}</li>
            </ul>
            <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 5, 3, 23, 4, 5, 6],
      allLoaded: false,
      topStatus: "",
      load:false
    };
  },
  methods: {
    loadTop() {
        this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadBottom() {
    //   this.allLoaded = true; // 若数据已全部获取完毕
    //   this.$refs.loadmore.onBottomLoaded();
    //   setTimeout(() => {
    //      this.$refs.loadmore.onBottomLoaded();
    //   }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>