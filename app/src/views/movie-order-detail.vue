<template>
	<div class="container" v-if="order">
		<div class="ticket-content" v-for="(item,index) in order.seats" :key="index">
			<router-link class="cinema" :to="navUrl">
				<div>{{order.cinemaName}}</div>
				<div class="triangle"></div>
			</router-link>
			<div class="movie-info">
				<div class="movie-name line-ellipsis">{{order.movieName}}</div>
				<div class="showTime line-ellipsis">{{order.time}} {{order.lang}}</div>
				<div class="position line-ellipsis">{{order.hall}} {{item.row}}排{{item.col}}座</div>
			</div>
			<div class="divider-box">
				<div class="divider"></div>
				<img class="status" src="../assets/images/status.png">
			</div>
			<div class="code-container">
				<div class="code-box">
					<div>手机号：136××××3590</div>
					<div>流水号：{{order.flowNumber}}</div>
					<div>验证码：{{order.Vcode}}</div>
				</div>
				<div class="rq">
					<img src="../assets/images/qr.png">
				</div>
			</div>
		</div>
		<div class="price-box box">
			<div>猫眼订单号：{{order.orderId}}</div>
			<div>总价：{{order.price}}元</div>
		</div>
		<div class="map-box">
			<cinemaMap :cinemaData="order.cinemaData"></cinemaMap>
		</div>
		<div class="maoyan box">
			<div>猫眼客服电话</div>
			<div class="phone-box">
				<div>工作时间： 9:00-24:00</div>
				<div class="phone">1010-5335</div>
			</div>
		</div>
	</div>
</template>

<script>
import cinemaMap from "@/components/cinemaMap.vue";
export default {
  components: {
    cinemaMap
  },
  data() {
    return {
      order: null
    };
  },
  created() {
    this.tabBarSetting("影券详情");
	const params = this.$route.query;

    const paramsObj = JSON.parse(params.paramsStr);
    this.initData(paramsObj);
  },
  computed: {
    navUrl() {
      if (this.order) {
        return `/cinema/cinema-detail?cinemaId=${this.order.cinemaId}`;
      }
    }
  },
  methods: {
    tabBarSetting(title, back) {
      this.$store.commit("changeTitle", title);
      this.$store.commit("IsBackPage", back);
    },
    initData(order) {
	  console.log(order)
      this.order = order;
    }
  }
};
</script>

<style lang="scss">
.container {
  width: 100vw;
  min-height: 100vh;
  background: #f0f0f0;
  overflow: auto;
}

.ticket-content {
  margin: 24px;
  background: #fff;
  border-radius: 8px;
  .divider-box {
    position: relative;
    border-bottom: 1px dashed #e6e6e6;
    margin: 40px 0;

    .status {
      position: absolute;
      right: 26px;
      top: -56px;
      width: 112px;
      height: 112px;
    }
    .divider {
      position: absolute;
      top: -16px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      left: 0;
      right: 0;
      font-size: 12px;

      &::before {
        position: absolute;
        top: 50%;
        left: -20px;
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        background: #f0f0f0;
        border-radius: 20px;
        margin-top: -20px;
      }
      &::after {
        position: absolute;
        top: 50%;
        right: -20px;
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        background: #f0f0f0;
        border-radius: 20px;
        margin-top: -20px;
      }
    }
  }
  .code-container {
    .code-box {
      width: 18em;
      margin: 0 auto;
      padding: 10px 20px;
      color: #b2b2b2;
      font-size: 34px;
    }
    .rq {
      opacity: 0.4;
      text-align: center;
      img {
        width: 500px;
        height: 500px;
        margin: 0 auto;
      }
    }
  }
}
.box {
  padding: 30px;
  background: #fff;
  font-size: 30px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 20px;
}
.cinema {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
  line-height: 76px;
  color: #666;
  padding: 0 30px;
  font-size: 28px;
  border-bottom: 1px solid #f0f0f0;
}

.triangle {
  width: 16px;
  height: 16px;
  border-left: 1px solid #999;
  border-top: 1px solid #999;
  margin-left: 5px;
  transform: rotate(135deg) scale(0.8);
}

.movie-info {
  padding: 0 30px;
  .movie-name {
    font-size: 36px;
    color: #333;
    margin: 20px 0;
  }
  .showTime {
    font-size: 30px;
    color: #f03d37;
  }
  .position {
    font-size: 30px;
    color: #666;
    margin: 10px 0 20px;
  }
}

.phone-box {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  color: #999;
}

.phone {
  color: #f03d37;
}

.map-box {
  margin-bottom: 20px;
}
</style>
