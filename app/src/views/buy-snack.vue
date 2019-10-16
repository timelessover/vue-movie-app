<template>
  <div class="container" v-if="order">
    <div class="section">
      <div class="snack-box box">
        <div class="snack line-ellipsis">{{order.title}}</div>
        <div>{{order.price}}元</div>
      </div>
      <div class="amount-box box">
        <div>数量：</div>
        <div class="stepper">
          <div :class="{'red':order.amount>1}" @click="minus">-</div>
          <div class="num">{{order.amount}}</div>
          <div class="red" @click="plus">+</div>
        </div>
      </div>
      <div class="total box">
        <div>总价：</div>
        <div class="red">{{order.total}}元</div>
      </div>
    </div>
    <div class="phone section">手机号 136××××3590</div>
    <div class="payment-btn" @click="payment">提交订单</div>
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
    this.tabBarSetting("支付");
    const params = this.$route.query;
    const paramsObj = JSON.parse(params.paramsStr);
    this.initData(paramsObj);
  },
  methods: {
    tabBarSetting(title, back) {
      this.$store.commit("changeTitle", title);
      this.$store.commit("IsBackPage", back);
    },
    initData(order) {
      this.order = order;
    },
    //减少数量
    minus() {
      if (this.order.amount === 1) {
        return;
      } else {
        this.chanegAmount();
      }
    },
    //增加数量
    plus() {
      this.chanegAmount(1);
    },
    chanegAmount(flag) {
      let order = {
        ...this.order
      };
      let amount = order.amount;
      if (flag) {
        amount++;
      } else {
        amount--;
      }
      let total = (amount * order.price).toFixed(1);
      this.order = {
        ...order,
        amount,
        total
      };
    },
    //模拟支付
    payment() {
      //避免重复支付
      if (this.first) {
        let snackOrder = this.$storage.get("snackOrder") || [];
        snackOrder.unshift(this.order);
        this.$storage.set("snackOrder", snackOrder);
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
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
  color: #666;
  overflow: auto;
  .section {
    margin: 20px 0;
    background: #fff;
    border: 1px solid #eee;
    .amount-box {
      height: 102px;
      line-height: 102px;
      padding: 0 30px 0 0;
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 30px 30px 0;
      margin-left: 30px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 30px;
    }
  }
}

.snack-box {
  .snack {
    width: 70%;
  }
}

.stepper {
  display: flex;
  border: 1px solid #ddd8ce;
  height: 60px;
  .num {
    border-right: 1px solid #ddd8ce;
    border-left: 1px solid #ddd8ce;
    font-size: 30px;
    padding: 0 10px;
  }
  div {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 50px;
  }
}

.phone {
  padding: 30px;
  font-size: 30px;
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

.red {
  color: #f03d37;
}
</style>
