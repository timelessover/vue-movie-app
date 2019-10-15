<template>
	<div class="select-page">
		<div class="info-block">
			<div class="movie-info">
				<div class="flex">
					<div class="title line-ellipsis">{{movie.movieName}}</div>
					<div class="info line-ellipsis">
						<span>{{show.showDate}}&nbsp;{{show.showTime}}</span>
						<span style="margin-left: 5px; ">{{show.dim}}{{show.lang}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="select-block">
			<div class="hall-name-wrapper" style="transform: translateX(80px)">
				<span class="hall-name">{{hall.hallName}}</span>
			</div>
			<div style="margin-top:30px;display: flex;">
				<div class="row-nav">
					<div v-for="(item,index) in seat" :key="index">{{item.rowId}}</div>
				</div>
				<div class="seats-block">
					<div class="m-line">
						<div class="divider"></div>
					</div>
					<div class="seats-wrap">
						<div class="wrap" v-for="(item,index) in  seat" :key="index">
							<!-- 不知道为什么直接传入seat,rowId值不对 -->
							<div
								:class="['seat',{bgImg:seat.seatStatus===1},{bgChcked:seat.seatStatus===3},{bgUnchecked:seat.seatStatus===2}]"
								v-for="(seat,index) in item.seats"
								:key="index"
								@click="chooseSeat({row:seat.rowId,col:seat.columnId})"
							></div>
						</div>
					</div>
					<div class="type-seat">
						<div v-for="(item,index) in type_seat" :key="index" class="type">
							<img :src="item.legendIcon">
							<div class="name">{{item.legendName}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="smart-choose-wrapper" v-if="!choosedSeats.length">
			<div class="title">推荐座位</div>
			<div class="recommend-seat">
				<div
					v-for="(item,index) in chooseNum"
					:key="index"
					@click="choosePersonNum(item.num)"
				>{{item.num}}人</div>
			</div>
		</div>
		<div class="price-block" v-else>
			<div class="title">已选座位</div>
			<div class="ticket-block">
				<div
					class="select-seats-item"
					v-for="(seat,index) in choosedSeats"
					:key="index"
					@click="cancelTicketSelected(seat)"
				>
					<div>{{seat.row}}排{{seat.col}}座</div>
					<div>¥{{price}}</div>
				</div>
			</div>
		</div>
		<div class="submit-block">
			<button v-if="choosedSeats.length" class="submit" @click="goBuyTicket">¥{{totalPrice}} 确认选座</button>
			<button class="submit disabled" style="color:#fff" disabled="true" v-else>请选择座位</button>
		</div>
	</div>
</template>

<script>
import { seat } from "utils/seat.js";
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      seqNo: "",
      cinema: "",
      hall: "",
      movie: "",
      price: [],
      seat: [],
      type_seat: [],
      show: "",
      chooseNum: [
        {
          num: 1
        },
        {
          num: 2
        },
        {
          num: 3
        },
        {
          num: 4
        },
        {
          num: 5
        }
      ],
      choosedSeats: [],
      price: "",
      totalPrice: "",
      info: ""
    };
  },
  created() {
    const params = this.$route.query;
    const info = JSON.parse(params.info);
    this.seqNo = info.seqNo;
    this.info = info;
    this.type_seat = seat.image.seatLegends;
    this.seat = JSON.parse(JSON.stringify(seat.regions[0].rows));
    this.recommendation = seat.recommendation.bestRecommendation;
    this.price = info.price;
  },
  mounted() {
    this.getSeatDetail();
  },
  methods: {
    tabBarSetting(title, back) {
      this.$store.commit("changeTitle", title);
      this.$store.commit("IsBackPage", back);
    },
    chooseSeat(item) {
      let row = Number(item.row) - 1;
      let col = Number(item.col) - 1;
      let seatValue = this.seat[row].seats[col];
      let newArray = this.seat;
      let status = seatValue.seatStatus;
      // 价格座位逻辑
      let seatsArr = this.choosedSeats;
      let temp = {};
      temp.row = row + 1;
      temp.col = col + 1;
      let num;
      // 如果是已购座位，直接返回
      if (status === 3) return;
      // 如果是已选座位点击后变未选
      if (status === 2) {
        this.cancelTicketSelected(temp);
      } else if (status === 1) {
        if (seatsArr.length >= 6) {
          this.showToast("不能购买大于6张票", "none");
          return;
        } else {
          newArray[row].seats[col].seatStatus = 2;
          seatsArr.push(temp);
        }
      }
      // 必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
      this.seat = newArray.slice();
      num = seatsArr.length;
      this.totalPrice = this.price * num;
    },
    // 取消选座
    cancelTicketSelected(seat) {
      let seatsArr = this.choosedSeats;
      let newArray = this.seat;
      newArray[seat.row - 1].seats[seat.col - 1].seatStatus = 1;
      seatsArr.forEach((item, index) => {
        if (item.col == seat.col && item.row == seat.row) {
          seatsArr.splice(index, 1);
        }
      });
      this.choosedSeats = seatsArr.slice();
      this.seat = newArray.slice();
      let num = seatsArr.length;
      this.totalPrice = this.price * num;
    },
    // 跳转到支付页面
    goBuyTicket() {
      this.info.totalPrice = this.totalPrice;
      this.info.seats = this.choosedSeats;
      const info = JSON.stringify(this.info);
      //   uni.navigateTo({
      //     url: `/pages/buy-ticket/buy-ticket?paramsStr=${info}`
      //   });
    },
    getSeatDetail() {
      const params = {
        timestamp: new Date().getTime(),
        cityId: 1,
        ci: 1,
        optimus_uuid:
          "95E1DDC0EE5111E9986DCD432C4307CF7EA16008ECCB4128B7EB143E77D1CDB9	",
        optimus_platform: 3,
        optimus_risk_level: 71,
        optimus_code: 10,
        seqNo: this.seqNo
      };
      //   axios({
      // 	  headers:{'User-Agent':'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Mobile Safari/537.36'}
      //   })
      //   axios.get('http://m.maoyan.com/ajax/seatingPlan', params).then(res=>{
      // 	  console.log(res)
      //   })
      this.$http.post("/cinemas/seatingPlan", params).then(res => {
        const data = res.data.seatData;
        this.tabBarSetting(data.cinema.cinemaName, true);
        this.movie = data.movie;
        this.show = data.show;
        this.hall = data.hall;
        data.seat.image.seatLegends.forEach(item => {
          item.legendIcon = "https" + item.legendIcon.split("http")[1];
        });
      });
    },
    showToast(title, img) {
      Toast({
        message: title,
        duration: 1000,
        icon: img
      });
    },
    choosePersonNum(num) {
      const recommend = this.recommendation;
      let temp = {};
      let col;
      let row;
      let seats;
      switch (num) {
        case 1:
          seats = recommend.bestOne.seats;
          break;
        case 2:
          seats = recommend.bestTwo.seats;
          break;
        case 3:
          seats = recommend.bestThree.seats;
          break;
        case 4:
          seats = recommend.bestFour.seats;
          break;
        case 5:
          seats = recommend.bestFive.seats;
      }
      this.showToast("选座成功");
      for (let i = 0; i < seats.length; i++) {
        temp.row = seats[i].rowId;
        temp.col = seats[i].columnId;
        this.chooseSeat(temp);
      }
    }
  }
};
</script>

<style lang="scss">
.select-page {
  font-size: 14px;
  color: #777;
}

.info-block {
  position: relative;

  .movie-info {
    padding: 40px;
    display: flex;

    .flex {
      flex: 1;

      .title {
        width: 80vw;
        height: 70px;
        line-height: 60px;
        font-size: 40px;
        font-weight: 700;
        color: #333;
      }

      .info {
        font-size: 24px;
        padding-top: 5px;
        line-height: 1;
      }
    }
  }
}

.select-block {
  background-color: #f2f1f6;
  margin-top: 20px;
  height: 50vh;
  position: relative;
  overflow: hidden;
  .hall-name {
    display: inline-block;
    width: 400px;
    height: 40px;
    background: #e3e3e3;
    border-radius: 0 0 30px 30px;
    z-index: 99;
    text-align: center;
  }

  .row-nav {
    z-index: 2;
    width: 50px;
    font-size: 14px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.05);
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
      height: 40px;
      line-height: 40px;
      padding-top: 5px;
    }
  }

  .seats-block {
    margin-left: 60px;

    .seats-wrap {
      width: 380px;

      .wrap {
        display: -webkit-box;

        .seat {
          padding: 0 15px;
          height: 40px;
          width: 40px;
          box-sizing: border-box;
          margin-left: 10px;
          margin-top: 10px;
        }

        .bgImg {
          background-image: url("https://p1.meituan.net/movie/9dfff6fd525a7119d44e5734ab0e9fb41244.png");
          background-size: 100% 100%;
        }

        .bgChcked {
          background-image: url("https://p1.meituan.net/movie/bdb0531259ae1188b9398520f9692cbd1249.png");
          background-size: 100% 100%;
        }

        .bgUnchecked {
          background-image: url("https://p0.meituan.net/movie/585588bd86828ed54eed828dcb89bfdd1401.png");
          background-size: 100% 100%;
        }
      }
    }

    .type-seat {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 30px;
      width: 500px;
      .type {
        display: flex;
        margin-left: 15px;
        img {
          height: 40px;
          width: 40px;
        }
        .name {
          line-height: 50px;
          padding-left: 10px;
        }
      }
    }
  }
}

.smart-choose-wrapper {
  display: flex;
  padding: 30px;

  .title {
    line-height: 65px;
  }

  .recommend-seat {
    display: flex;

    div {
      line-height: 65px;
      border: 1px solid #d7d7d7;
      border-radius: 4px;
      font-size: 22px;
      margin-left: 14px;
      text-align: center;
      box-sizing: border-box;
      width: 100px;
      height: 60px;
    }
  }
}

.price-block {
  padding: 30px;
  align-items: center;

  .ticket-block {
    display: flex;
    flex-wrap: wrap;

    .select-seats-item {
      text-align: center;
      margin-right: 12px;
      margin-top: 10px;
      font-size: 18px;
      padding: 4px 20px;
      border: 1px solid #ef4238;
      width: 150px;
      box-sizing: border-box;
    }
  }
}

.submit-block {
  padding: 20px;

  .submit {
    line-height: 80px;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    border-radius: 10px;
    background-color: #f90 !important;
    width: 90vw;
  }

  .disabled {
    background-color: #ffddb2 !important;
  }
}
</style>
