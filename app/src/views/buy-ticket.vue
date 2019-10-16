<template>
	<div class="container" v-if="order">
		<div class="section">
			<div class="movie-box">
				<div class="movie-name">{{order.movieName}}</div>
				<div class="watch-time">{{order.time}} {{order.lang}}</div>
				<div>{{order.cinemaName}}</div>
				<div>{{order.hall}}</div>
				<div class="seats-block">
					<div class="item" v-for="(seat,index) in order.seats" :key="index">{{seat.row}}排{{seat.col}}座</div>
				</div>
			</div>
			<div class="price-box">
				<div>票价</div>
				<div class="server">
					含服务费3元/张
					<span class="price-num">
						{{price}}
						<span class="yuan">元</span>
					</span>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-title">活动和优惠券</div>
			<div class="section-content">无可用</div>
		</div>
		<div class="section">
			<div class="section-title">退改签须知</div>
			<div class="section-content">
				<div>开场时间60分钟前，可免费改签、退款</div>
				<div>使用观影卡或享受票减小吃特惠时，不可改签</div>
			</div>
		</div>
		<div class="section">
			<div class="section-title">手机号</div>
			<div class="section-content">手机号仅用于生成订单，取票码不再以短信发送</div>
		</div>
		<div class="footer">
			<div class="payment">
				还需支付：
				<span class="price-num">
					<span class="yuan">{{total}}元</span>
				</span>
			</div>
			<div class="payment-btn" @click="payment">确认支付</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      order: null,
      first: true //是否是第一次支付
    };
  },
  created() {
    const params = this.$route.query;
    const paramsObj = JSON.parse(params.paramsStr);
    this.initData(paramsObj);
  },
  computed: {
    total() {
      if (this.order) {
        return Number(this.order.totalPrice) + this.order.seats.length * 3;
      }
    },
    price() {
      return Number(this.order.price) + 3;
    }
  },
  methods: {
    initData(params) {
      this.order = params;
    },
    //模拟支付
    payment() {
      //避免重复支付
      if (this.first) {
        let movieOrder = this.$storage.get("movieOrder") || [];
        movieOrder.unshift(this.order);
        this.$storage.set("movieOrder", movieOrder);
        this.$showSuccess("支付成功");
        this.first = false;
      } else {
        this.$showFail("已支付");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
  color: #666;
  .section {
    margin-bottom: 20px;
    font-size: 28px;
    padding: 30px;
    padding-right: 0;
    background: #fff;
    .section-title {
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 32px;
      line-height: 1em;
    }
    .section-content {
      color: #999;
      font-size: 28px;
      line-height: 1.8em;
      padding-top: 20px;
      padding-right: 30px;
    }
  }
}

.movie-box {
  padding-bottom: 20px;
  padding-right: 30px;
  border-bottom: 1px solid #f0f0f0;
  line-height: 1.5em;
  font-size: 30px;
}

.movie-name {
  color: #333;
  font-size: 36px;
}

.watch-time {
  color: #f03d37;
}

.price-box {
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  padding-top: 30px;
  .price-num {
    color: #f03d37;
    font-size: 30px;
    .yuan {
      font-size: 20px;
    }
  }
}

.server {
  font-size: 26px;
  color: #999;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  .price-num {
    color: #f03d37;
    font-size: 36px;
  }
  .yuan {
    font-size: 40px;
  }
  .payment {
    padding: 20px 30px;
    text-align: right;
    font-size: 32px;
  }
  .payment-btn {
    height: 2.5em;
    line-height: 2.5em;
    background: #f90;
    margin: 0 30px 20px;
    color: #fff;
    text-align: center;
    font-size: 34px;
    border-radius: 8px;
  }
}

.seats-block {
  display: flex;
  .item {
    padding-right: 10px;
    box-sizing: border-box;
  }
}
</style>
