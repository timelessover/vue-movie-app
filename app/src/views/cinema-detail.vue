<template>
	<div v-if="cinemaDetail">
		<!-- <cinemaMap :cinemaData='cinemaDetail.cinemaData'/> -->
		<select-movie :movies="movies" @selectMovie="selectMovie" :defaultSelectID="movieId"/>
		<div class="movie-info" v-if="movie">
			<div class="movie-title line-ellipsis">
				<span class="title">{{movie.nm}}</span>
				<span class="grade">
					<span v-if="!movie.globalReleased">
						{{movie.wish}}
						<span class="small">人想看</span>
					</span>
					<span v-else-if="movie.sc!=='0.0'">
						{{movie.sc}}
						<span class="small">分</span>
					</span>
					<span v-else>
						<span class="small">暂无评分</span>
					</span>
				</span>
			</div>
			<div class="movie-desc line-ellipsis">{{movie.desc}}</div>
		</div>
		<div>
			<selectTime :days="days" @selectDayEvent="selectDay" :day="day"/>
		</div>
		<div>
			<div v-if="timeList.length">
				<div class="item" v-for="(item,index) in timeList" :key="index" @click="seatChoose(item)">
					<div class="time-block box">
						<div class="begin">{{item.tm}}</div>
						<div class="end">{{item.endTime}} 散场</div>
					</div>
					<div class="info-block box">
						<div class="lan line-ellipsis">{{item.lang}} {{item.tp}}</div>
						<div class="hall line-ellipsis">{{item.th}}</div>
					</div>
					<div class="price box">
						<div class="price-box line-ellipsis">
							<div class="sellPr">
								<span class="stonefont">{{(item.vipPrice && item.vipPrice*1+10) || 37 }}</span>
								<span class="d">元</span>
							</div>
							<div class="vipPrice" v-if="item.vipPriceName || item.vipPriceNameNew">
								<span class="icon">{{item.vipPriceName || item.vipPriceNameNew}}</span>
								<span class="num">{{item.vipPrice}}</span>
							</div>
						</div>
						<div class="discount line-ellipsis" v-if="item.extraDesc">{{item.extraDesc}}</div>
					</div>
					<div class="button-block">
						<div class="button">购票</div>
					</div>
				</div>
			</div>
			<div v-else class="no-seat">
				<img src="../assets/images/cinema2.png">
				<span>{{movie.globalReleased ?'今日场次已映完':'影片未上映'}}</span>
			</div>
		</div>
		<div class="tuan-list" v-if="divideDealList.length">
			<div class="title">影院超值套餐</div>
			<div class="tuan-item" v-for="(item,index) in divideDealList" :key="index">
				<div v-for="(i,index) in item.dealList" :key="index" class="snack-item" @click="goSnackPage(i)">
					<div>
						<img :src="i.imageUrl">
					</div>
					<div class="snack-info">
						<div class="first-title">{{i.firstTitle}}</div>
						<div class="second-title line-ellipsis">{{i.secondTitle}}</div>
						<div class="snack-price">
							<div>
								<span class="num">{{i.price}}</span>
								<span class="rmb">元</span>
								<span class="font">影院价:{{i.value}}元</span>
							</div>
							<div class="font">{{i.curNumberDesc}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import cinemaMap from '@/components/cinemaMap.vue'
import selectMovie from "@/components/select-movie.vue";
import selectTime from "@/components/select-time.vue";
import { getRandom, formatNumber } from "utils/util";
export default {
  components: {
    // cinemaMap,
    selectMovie,
    selectTime
  },
  data() {
    return {
      cinemaId: "",
      movieId: 0,
      cinemaDetail: null, //影院详情
      movie: {
        globalReleased: "",
        id: 0
      }, //选中的电影
      movies: null, //电影列表
      day: "",
      timeList: [], //当天播放电影的时间段
      divideDealList: [], //影院分类零食列表
      first: true, //只在第一次提示
      days: []
    };
  },
  created() {
	this.tabBarSetting('影院详情',true)
    const options = this.$route.query;
    this.initPage(options);
  },
  methods: {
    tabBarSetting(title, back) {
      this.$store.commit("changeTitle", title);
      this.$store.commit("IsBackPage", back);
    },
    async initPage(options) {
      const { cinemaId = "", movieId = "", day = "" } = options;
      this.cinemaId = cinemaId;
      this.movieId = movieId;
      const res = await this.$http.get(
        `/cinemas/cinemaDetail?cinemaId=${cinemaId}&movieId=${movieId}`
      );
      this.cinemaDetail = res.data;
      this.movies = this.formatMovie(res.data.showData.movies);
      this.divideDealList = this.formatUrl(res.data.dealList.divideDealList);
    },
    //选择电影
    selectMovie(movie) {
      let days = [];
      movie.shows.forEach(item => {
        days.push({
          title: item.dateShow,
          day: item.showDate
        });
      });
      this.movie = movie;
      this.days = days;
      this.timeList = this.createEndTime(movie.shows[0].plist, movie.dur);
    },
    // 选择时间
    selectDay(obj) {
      let day = obj.day;
      const movie = this.movie;
      const index = movie.shows.findIndex(item => item.showDate === day);
      this.timeList = this.createEndTime(movie.shows[index].plist, movie.dur);
    },

    //跳转到“套餐详情”页面
    goSnackPage(info) {
      //将参数转化为JSON通过页面跳转时传递
      const paramsStr = JSON.stringify({
        cinemaName: this.cinemaDetail.cinemaData.nm,
        cinemaId: this.cinemaId,
        dealId: info.dealId,
        cinemaData: this.cinemaDetail.cinemaData //影院信息
      });
      this.$router.push(`/cinema/snack-page?paramsStr=${paramsStr}`);
    },
    seatChoose(info) {
      const { movie, cinemaId, cinemaDetail, first } = this;
      //添加订单信息
      const paramsStr = JSON.stringify({
        cinemaName: cinemaDetail.cinemaData.nm, //电影院名
        cinemaId: cinemaId, //电影院ID
        hall: info.th, //大厅
        movieName: movie.nm, //电影名
        movieImg: movie.img, //海报
        lang: info.lang + info.tp, //语言
        time: `${info.dt} ${info.tm}`, //时间
        price: (info.vipPrice && info.vipPrice * 1 + 10) || 37, //票价
        Vcode: getRandom(100000, 999999), //模拟6位数的验证码
        flowNumber: getRandom(100000000, 999999999), //模拟9位数的流水号,
        orderId: getRandom(1000000000, 9999999999), //模拟10位数的订单号,
        cinemaData: cinemaDetail.cinemaData, //影院信息
        seqNo: info.seqNo
      });
      this.$router.push(`/cinema/select-seat?info=${paramsStr}`);
    },
    //处理散场时间
    createEndTime(arr, dur) {
      let timeList = [];
      if (Array.isArray(arr)) {
        timeList = arr.map(item => {
          let temp = {
            ...item
          };
          let time = new Date(`${item.dt} ${item.tm}`);
          time = time.setMinutes(time.getMinutes() + dur);
          const endTime = new Date(time);
          temp.endTime = `${formatNumber(endTime.getHours())}:${formatNumber(
            endTime.getMinutes()
          )}`;
          return temp;
        });
      }
      return timeList;
    },
    //处理电影图片的url
    formatMovie(arr) {
      let list = [];
      if (Array.isArray(arr)) {
        arr.forEach((item, index) => {
          list.push({
            ...item,
            img: item.img.replace("w.h", "148.208"),
            ids: "item" + index
          });
        });
      }
      return list;
    },
    //处理零食图片的url
    formatUrl(arr) {
      let divideDealList = [];
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          let temp = {
            ...item
          };
          temp.dealList = temp.dealList.map(i => ({
            ...i,
            imageUrl: i.imageUrl.replace("w.h", "440.0")
          }));
          divideDealList.push(temp);
        });
      }
      return divideDealList;
    }
  }
};
</script>

<style lang="scss" scoped>
.movie-info {
  padding: 22px 30px;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
}

.grade {
  color: #ffb400;
  font-size: 32px;
}

.small {
  font-size: 20px;
}

.movie-desc {
  height: 37px;
  margin-top: 2px;
  line-height: 37px;
  font-size: 26px;
  color: #999;
}

.no-seat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 460px;
}

.no-seat img {
  width: 155px;
  height: 143px;
}

.no-seat span {
  margin-top: 24px;
  line-height: 1;
  font-size: 32px;
  color: #acacac;
}

.item {
  display: flex;
  height: 84px;
  padding: 30px 30px 30px 0;
  margin: 0 0 0 30px;
  border-bottom: 1px solid #e6e6e6;
  color: #333;
}

.item:last-child {
  border: none;
}

.box {
  display: flex;
  height: 84px;
  flex-direction: column;
  justify-content: space-between;
}

.begin {
  line-height: 1;
  font-size: 40px;
  color: #333;
  white-space: nowrap;
}

.end {
  margin-left: 1px;
  color: #999;
  font-size: 22px;
  white-space: nowrap;
}

.info-block {
  margin-left: 34px;
  width: 180px;
  overflow-x: hidden;
}

.lan {
  margin-top: 1px;
  font-size: 26px;
  color: #333;
}

.hall {
  font-size: 22px;
  color: #999;
}

.price {
  width: 260px;
  margin-left: 20px;
}

.price-box {
  display: flex;
  height: 40px;
  align-items: flex-end;
}

.sellPr {
  line-height: 1;
  color: #f03d37;
  margin-top: 1px;
  font-size: 38px;
  margin-right: 10px;
}

.d {
  font-size: 22px;
}

.vipPrice {
  height: 25px;
  line-height: 25px;
  margin-top: 1px;
  border: 1px solid #ff9000;
  border-radius: 2px;
  font-size: 22px;
}

.vipPrice .icon {
  display: inline-block;
  font-size: 22px;
  padding: 0 2px;
  color: #fff;
  background-color: #f90;
}

.vipPrice .num {
  display: inline-block;
  font-size: 22px;
  padding: 0 2px;
  color: #f90;
  background-color: #fff;
}

.discount {
  color: #999;
  font-size: 22px;
}

.button-block {
  display: flex;
  align-items: center;
  margin-left: 34px;
}

.button {
  width: 90px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  box-sizing: border-box;
  background-color: #f03d37;
  color: #fff;
  border-radius: 8px;
  white-space: nowrap;
  font-size: 24px;
  border: none;
}

.tuan-list {
  padding-left: 30px;
  border-top: 20px solid #f5f5f5;
}

.tuan-list .title {
  height: 90px;
  line-height: 90px;
  font-size: 30px;
  color: #999;
}

.snack-item {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #e6e6e6;
  padding: 26px 30px 26px 0;
}

.snack-item img {
  width: 160px;
  height: 160px;
  margin-right: 20px;
}

.snack-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  overflow: hidden;
}

.first-title {
  font-size: 30px;
  color: #666;
}

.second-title {
  width: 90%;
  font-size: 24px;
  color: #999;
}

.snack-price {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #999;
}

.num {
  font-size: 30px;
  color: #f03d37;
}

.rmb {
  color: #f03d37;
}

.font {
  font-size: 24px;
}
</style>
