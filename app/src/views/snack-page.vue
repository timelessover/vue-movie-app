<template>
	<div class="container">
		<!-- 头部 -->
		<div class="image-box">
			<img :src="info.dealBrief.imageUrl">
			<div class="info-box">
				<div class="cinema-name line-ellipsis">{{cinemaName}}</div>
				<div class="snack-title line-ellipsis">{{info.dealBrief.title}}</div>
			</div>
			<div class="mask"></div>
		</div>
		<!-- 价格 -->
		<div class="section">
			<div class="price-box">
				<div>
					<span class="price-num" v-if="info.dealBrief.originPrice">
						{{info.dealBrief.originPrice}}
						<span class="yuan">元</span>
					</span>
					<span class="cinema-price" v-if="info.dealBrief.value">影院价:{{info.dealBrief.value}}元</span>
				</div>
				<div class="buy-btn" @click="buySnack">立即抢购</div>
			</div>
			<div class="price-box">
				<div class="deal-tags-list">
					<span class="item" v-if="info.dealBrief.refundTag.supportTimeRefund">
						<span class="span-icon"></span>随时退
					</span>
					<span class="item" v-if="info.dealBrief.refundTag.supportExpireRefund">
						<span class="span-icon"></span>过期退
					</span>
				</div>
				<div class="sold">
					<span class="iconfont icon-04"></span>
					<span>{{info.dealBrief.curNumberDesc}}</span>
				</div>
			</div>
		</div>
		<!-- 套餐详情 -->
		<div class="section">
			<div class="section-title">套餐详情</div>
			<div class="dealsets-details" v-for="(item,index) in info.dealBrief.menus" :key="index">
				<div class="set-title" v-if="item.title">{{item.title}}</div>
				<div class="detail-group" v-for="(item,index) in item.items" :key="index">
					<span class="right line-ellipsis">{{item.name}}</span>
					<span class="center line-ellipsis">{{item.amount}}</span>
					<span class="left">¥{{item.subtotal}}</span>
				</div>
			</div>
		</div>
		<!-- 购买须知 -->
		<div class="purchase-notice section">
			<div class="section-title">购买须知</div>
			<div class="terms">
				<div class="terms-item" v-for="(item,index) in info.dealBrief.terms" :key="index">
					<div class="tip-title" v-if="item.title">{{item.title}}:</div>
					<div class="tip-des">{{item.content}}</div>
				</div>
			</div>
		</div>
		<!-- 影院信息 -->
		<div class="section">
			<div class="section-title">影院信息</div>
			<cinemaMap :cinemaData="cinemaData"></cinemaMap>
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
      info: null, //小吃详情
      cinemaName: "",
      cinemaData: null //影院地图详情
    };
  },
  created() {
	this.tabBarSetting('零食')
    const params = this.$route.query;
    const paramsObj = JSON.parse(params.paramsStr);
    this.initPage(paramsObj);
  },
  methods: {
    tabBarSetting(title, back) {
      this.$store.commit("changeTitle", title);
      this.$store.commit("IsBackPage", back);
    },
    initPage(obj) {
      const data = {
        dealId: obj.dealId,
        quantity: 1,
        cinemaId: obj.cinemaId
      };
      this.$http.post("/cinemas/deal/goods/price", data).then(res => {
        this.cinemaId = obj.cinemaId;
        this.cinemaName = obj.cinemaName;
        this.cinemaData = obj.cinemaData;
        this.info = res.data.data;
      });
    },
    //跳转到“提交订单”页面
    buySnack() {
      const { info, cinemaName, cinemaId } = this;
      //添加订单信息
      const paramsStr = JSON.stringify({
        cinemaName,
        cinemaId,
        title: info.dealBrief.title, //套餐名
        img: info.dealBrief.imageUrl, //图片
        amount: 1, //数量
        price: info.dealBrief.originPrice, //单价
        total: info.dealBrief.originPrice * 1 //合计
      });
      this.$router.push(`/cinema/buy-snack?paramsStr=${paramsStr}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
}
.image-box {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  .mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
    background-color: #222;
    opacity: 0.55;
    filter: blur(60px);
  }
  .info-box {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 30px;
    color: #fff;
    z-index: 8;
    .cinema-name {
      font-size: 36px;
      line-height: 1em;
      margin-bottom: 10px;
    }
    .snack-title {
      line-height: 1em;
      font-size: 30px;
    }
  }
}
.price-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  padding-left: 0;
  margin-left: 30px;
  border-bottom: 1px solid #f0f0f0;
  .price-num {
    color: #f03d37;
    font-size: 50px;
    .yuan {
      font-size: 24px;
    }
  }
  .buy-btn {
    padding: 20px 30px;
    color: #fff;
    font-size: 36px;
    background-color: #f90;
    border-radius: 8px;
  }
  .cinema-price {
    margin-left: 15px;
    font-size: 28px;
    color: #999;
  }
  &:last-child {
    border: none;
  }
}

.deal-tags-list {
  font-size: 28px;
  color: #6bbd00;
  .item {
    display: inline-block;
    margin-right: 30px;
  }
}

.span-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-size: 100% 100%;
  margin-right: 15px;
  vertical-align: middle;
  background-image: url(data:image/png;base64,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);
}

.sold {
  color: #666;
}

.icon-04 {
  color: #666;
  margin-right: 15px;
}

.section {
  border-bottom: 20px solid #f5f5f5;
  font-size: 28px;
}

.section-title {
  padding: 30px 30px 30px 0;
  margin-left: 30px;
  color: #999;
  font-size: 34px;
  border-bottom: 1px solid #f0f0f0;
}

.set-title {
  position: relative;
  top: -1px;
  background: #f9f9f9;
  text-align: center;
  padding: 20px 0;
  color: #999;
  line-height: 1em;
  font-size: 26px;
}

.detail-group {
  display: flex;
  margin-left: 30px;
  color: #666;
  font-size: 28px;
  border-bottom: 1px dashed #ddd8ce;
  &:last-child {
    border: none;
  }
  .center {
    width: 15%;
    padding: 30px 0;
    border-right: 1px dashed #ddd8ce;
    border-left: 1px dashed #ddd8ce;
    text-align: center;
  }

  .right {
    width: 70%;
    padding: 30px 0;
    padding-left: 0;
  }
  .left {
    width: 15%;
    padding: 30px 0;
    text-align: center;
  }
}

.terms-item {
  margin: 30px;
}

.tip-title {
  color: #666;
  margin-bottom: 10px;
  font-size: 30px;
}

.tip-des {
  color: #999;
  font-size: 28px;
}
</style>
