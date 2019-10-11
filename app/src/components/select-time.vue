<template>
	<div>
		<div class="timeline scroll-view_H">
			<div
				v-for="(item,index) in days"
				:class="['day', {'active':item.day==selectedDay}]"
				:key="index"
				@click="selectDay(item.day)"
			>{{item.title}}</div>
		</div>
	</div>
</template>

<script>
import { getToday, formatTime } from "../utils/util.js";
export default {
  props: {
    /**
     * 模拟日期列表时开头的时间
     */
    startTime: {
      type: String,
      default: getToday()
    },
    days: {
      type: Array,
      default: null
    },
    day: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectedDay: ""
    };
  },
  mounted() {
    if (!this.days.length) {
      this.getWeek(this.startTime);
    }
  },
  // 父组件时间更新后才进行事件更新，第一次不用调用
  watch: {
    days: "selectDay"
  },
  methods: {
    // 模拟7天时间列表
    getWeek(startTime) {
      const todayTomorrow = ["今天", "明天", "后天"];
      const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let days = [];
      //当开始时间大于今天时，日期从大的时间开始算（主要是为了“预售”时间）
      let start = getToday();
      if (startTime > start) {
        start = startTime;
      }
      for (let i = 0; i < 7; i++) {
        let day = new Date(start);
        day.setDate(day.getDate() + i); //往后推几天
        const num = (day - new Date(getToday())) / (1000 * 60 * 60 * 24); //计算相隔几天，减少必须是“今天”0时0分
        days.push({
          title: `${todayTomorrow[num] || week[day.getDay()]}${day.getMonth() +
            1}月${day.getDate()}日`, //获取类似 “后天9月1日” 的字符串
          day: formatTime(day).split(" ")[0]
        });
      }
      this.$emit("changeDays", days);
    },
    selectDay(itemDay) {
      // 第一种情况是默认第一个日期
      // 第二种是切换过程中没有该日期，默认为第一个开始日期
      const day = itemDay || this.findDefaultDay() || this.days[0].day;
      if (day === this.selectedDay) {
        return;
      }
      this.selectedDay = day;
      this.$emit("selectDayEvent", {
        day
      });
    },
    // 第一次进入页面显示默认日期
    findDefaultDay() {
      if (this.days) {
        const day = this.days.find(item => item.day == this.day);
        return day && day.day;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.timeline {
  height: 90px;
  border-bottom: 1px solid #e6e6e6;
}

.day {
  display: inline-block;
  height: 90px;
  width: 30%;
  line-height: 90px;
  text-align: center;
  box-sizing: border-box;
  margin: 0 10px;
  font-size: 28px;
  color: #333;
  >.active {
    color: #ef4238;
    border-bottom: 2px solid #ef4238;
  }
}
</style>
