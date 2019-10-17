<template>
	<div class="order-list-page">
		<div v-for="(item,index) in orderList" :key="index" class="order-item">
			<router-link class="order-title line-ellipsis" :to="navUrl(item)" hover-class="none">
				<div>{{item.cinemaName}}</div>
				<div class="triangle"></div>
			</router-link>
			<div class="order-info" @click="goTo(item)">
				<img :src="item.movieImg">
				<div class="order-desc">
					<div class="delete-box" @click.stop="deleteOrder(index)">
						<div class="iconfont icon-del delete"></div>
					</div>
					<div class="movie-name line-ellipsis">{{item.movieName}} {{item.seats.length}}张</div>
					<div class="showTime line-ellipsis">{{item.time}}</div>
					<div class="position line-ellipsis">{{item.hall}} {{item.seat}}</div>
				</div>
			</div>
			<div class="order-more">
				<div>总价：{{item.price*item.seats.length}}元</div>
				<div class="status">已完成</div>
			</div>
		</div>
		<div v-show="isEmpty">
			<empty message="暂无电影订单"></empty>
		</div>
	</div>
</template>

<script>
import empty from "@/components/empty.vue";
import { Dialog } from "vant";

export default {
  components: {
    empty,
    Dialog
  },
  data() {
    return {
      orderList: []
    };
  },
  created() {
    this.tabBarSetting("我的电影");
    this.initData();
  },
  computed: {
    isEmpty() {
      return !this.orderList.length;
    }
  },
  methods: {
    tabBarSetting(title, back) {
      this.$store.commit("changeTitle", title);
      this.$store.commit("IsBackPage", back);
    },
    navUrl(item) {
      return `../cinema-detail/cinema-detail?cinemaId=${item.cinemaId}`;
    },
    initData() {
      this.orderList = this.$storage.get("movieOrder") || [];
    },
    deleteOrder(index) {
      let orderList = this.orderList.slice();
      orderList.splice(index, 1);
      Dialog.confirm({
        title: "提示",
        message: "确认删除订单吗？",
        confirmButtonColor: "#e54847"
      })
        .then(() => {
          this.orderList = orderList;
          this.$storage.set("movieOrder", orderList);
        })
        .catch(() => {
          // on cancel
        });
    },
    //跳转到订单详情页面
    goTo(order) {
      const paramsStr = JSON.stringify(order);
      this.$router.push(`/my/movie-order-detail?paramsStr=${paramsStr}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.order-list-page {
  width: 100vw;
  min-height: calc(100vh - 120px);
  background: #f0f0f0;
  box-sizing: border-box;
  overflow: hidden;
  .order-title {
	display: flex;
	justify-content: space-between;
    align-items: center;
    padding: 20px 30px 20px 0;
    margin-left: 30px;
    color: #666;
    font-size: 28px;
    border-bottom: 1px solid #f0f0f0;
  }
  .order-item {
    background-color: #fff;
    margin-bottom: 20px;
  }
  .triangle {
    width: 16px;
    height: 16px;
    border-left: 1px solid #999;
    border-top: 1px solid #999;
    margin-left: 5px;
    transform: rotate(135deg) scale(0.8);
  }
  .order-info {
    position: relative;
    display: flex;
    padding: 20px 30px 20px 0;
    margin-left: 30px;
    border-bottom: 1px solid #f0f0f0;
    img {
      width: 114px;
      height: 160px;
    }
  }
  .order-desc {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-around;
    margin-left: 24px;
    padding: 20px 0;
    font-size: 24px;
    color: #999;
    .delete-box {
      /* 多写一个box的原因是增大点击面积 */
      position: absolute;
      padding: 30px;
      top: 0;
      right: 0;
      .delete {
        font-size: 30px;
        color: #999;
      }
    }
  }
  .showTime {
    font-size: 24px;
  }
  .movie-name {
    font-size: 30px;
    width: 80%;
    color: #333;
  }
  .order-more {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    font-size: 28px;
    color: #999;
  }
}
</style>
