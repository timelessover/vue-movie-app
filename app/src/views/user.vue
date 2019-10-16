<template>
    <div class="container">
        <div class="header">
            <div v-if="hasToken">
                <img src="" class="avatar">
                <span class="name"></span>
            </div>
        </div>
        <div class="order">
            <div class="title-box">
                <div class="title">我的订单</div>
                <div class="title-line"></div>
            </div>
            <div class="order-list">
                <router-link class="order-item" to="/my/movie-order">
                    <img src="../assets/images/order_movie.png">
                    <div>电影</div>
                </router-link>
                <router-link class="order-item" to="/my/snack-order">
                    <img src="../assets/images/order_store.png">
                    <div>小吃</div>
                </router-link>
            </div>
        </div>
        <div class="other">
            <div class="share other-item">
                <button open-type="share" class="btn">
                    <span class="iconfont icon-fenxiang"></span>分享给朋友
                </button>
            </div>
            <div class="customer other-item">
                <button class="btn">
                    <span class="iconfont icon-lianxikefu"></span>客服反馈
                </button>
            </div>
            <div class="about other-item">
                <router-link to="/pages/about-page/about-page">
                    <span class="iconfont icon-guanyuwomen"></span>关于
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      hasToken: false
    };
  },
  created() {
    this.$store.commit('changeTitle',"我的")
    this.$store.commit('IsBackPage',false)
    if (!this.$storage.get("token")) {
      // this.$router.go(-1);
    } else {
      this.hasToken = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  background: #f3f3f3;
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("https://s0.meituan.net/bs/file/?f=my-canary:deploy/dpmmweb/client/dpmmweb/component/mycenter/img/bg.png");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 300px;
    height: 300px;
    overflow: hidden;
    text-align: center;
    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 120px;
      border: 3px solid #fff;
      overflow: hidden;
    }
    .name {
      height: 45px;
      margin-top: 14px;
      font-size: 32px;
      line-height: 45px;
      color: #fff;
    }
  }
}
.order {
  margin-top: 20px;
  background: #fff;
  padding: 26px 30px 0;
  .title-box {
    position: relative;
    width: 320px;
    height: 42px;
    margin: 0 auto;
    .title {
      position: relative;
      height: 42px;
      width: 160px;
      margin: 0 auto;
      font-size: 32px;
      line-height: 42px;
      color: #333;
      text-align: center;
      background: #fff;
      z-index: 9;
    }

    .title-line {
      position: absolute;
      width: 320px;
      height: 1px;
      left: 0;
      top: 23px;
      background: #f0f0f0;
    }
  }
}

.order-list {
  display: flex;
  height: 230px;
  align-items: center;
  background: #fff;
}

.order-item {
  width: 50%;
  text-align: center;
  img {
    width: 84px;
    height: 84px;
    margin-bottom: 6px;
  }
  div {
    color: #333;
    font-size: 28px;
  }
}

.other {
  margin-top: 20px;
  background: #fff;
  .other-item {
    position: relative;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    margin-left: 30px;
    padding-right: 30px;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    &::after {
      position: absolute;
      right: 30px;
      top: 50%;
      content: "";
      width: 16px;
      height: 16px;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      transform: translateY(-50%) rotate(135deg);
    }
  }
  .btn {
    width: 100%;
    border: none;
    border-radius: 0;
    padding: 0;
    margin: 0;
    font-size: 1em;
    position: static;
    line-height: normal;
    color: #333;
    text-align: left;
    background: #fff;
    &::after {
      content: none;
    }
  }
  .iconfont {
    display: inline-block;
    line-height: 100px;
    margin-right: 8px;
    font-size: 32px;
    color: #333;
  }
}

.customer {
  .iconfont {
    font-size: 38px;
  }
}

.about {
  .iconfont {
    opacity: 0.8;
  }
}
</style>
