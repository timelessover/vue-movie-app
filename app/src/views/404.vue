<template>
    <div>
        <mt-loadmore
            :bottom-method="loadBottom"
            ref="loadmore"
            :bottomAllLoaded ='load'
            :autoFill="false"
        >
            <div>
                <div v-for="item in list">{{ item }}</div>
            </div>
            <!-- <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div> -->
        </mt-loadmore>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 5, 3, 23, 4, 5, 6],
      allLoaded: false,
      load:false
    };
  },
  methods: {
    loadBottom() {
      console.log('2')
      setTimeout(() => {
         this.$refs.loadmore.onBottomLoaded();
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>