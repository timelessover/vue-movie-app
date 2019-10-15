<template >
	<router-link class="cinema-section" :to="url">
		<div class="name-price line-ellipsis">
			<span>{{cinema.nm}}</span>
			<span class="sell-price" v-if="cinema.sellPrice">
				<span class="price">{{cinema.sellPrice}}</span>元起
			</span>
		</div>
		<div class="address">
			<span class="line-ellipsis">{{cinema.addr}}</span>
			<span class="distance">{{cinema.distance}}</span>
		</div>
		<div class="feature-tags">
			<span v-if="cinema.endorse || cinema.tag&&cinema.tag.endorse">退</span>
			<span v-if="cinema.allowRefund || cinema.tag&&cinema.tag.allowRefund">改签</span>
			<span v-for="item in cinema.hallType || cinema.tag&&cinema.tag.hallType" :key="item">{{item}}</span>
			<span class="featrue" v-if="cinema.snack || cinema.tag&&cinema.tag.snack">小吃</span>
			<span
				class="featrue"
				v-if="cinema.vipDesc || cinema.tag&&cinema.tag.vipTag"
			>{{cinema.vipDesc || cinema.tag&&cinema.tag.vipTag}}</span>
		</div>
		<div v-if="!!cinema.promotion&&cinema.promotion.cardPromotionTag">
			<span class="card"></span>
			<span class="discount-label-text">{{cinema.promotion&&cinema.promotion.cardPromotionTag}}</span>
		</div>
		<div v-if="cinema.showTimes" class="showTimes">近期场次：{{cinema.showTimes}}</div>
	</router-link>
</template>

<script>
export default {
  props: {
    cinema: {
      type:Object,
      default:{}
    },
    movieId:{
      type:String || Number,
      default:''
    },
    day: {
      type:String || Number,
      default:''
    },
  },
  computed: {
    url() {
      return `/cinema/cinema-detail?cinemaId=${
        this.cinema.id
      }&movieId=${this.movieId}&day=${this.day}`;
    }
  }
};
</script>

<style lang="scss">
.cinema-section {
  padding: 30px 0;
  margin: 0 30px;
  border-bottom: 1px solid #f0f0f0;
  line-height: 1.3em;
  display: inline-block;
  width: 90%;
}

.name-price {
  font-size: 32px;
  color: #333;
  display: flex;
  justify-content: space-between;
}

.sell-price {
  font-size: 24px;
  color: #999;
  white-space: nowrap;
  margin-left: 20px;
}

.price {
  font-size: 34px;
  color: #ef4238;
}

.address {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  color: #666;
  line-height: 50px;
  .line-ellipsis {
    margin-right: 50px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.feature-tags {
  width: 80%;
  span {
    display: inline-block;
    border: 1px solid #589daf;
    color: #589daf;
    padding: 0 6px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    font-size: 24px;
    margin-right: 8px;
  }
  .featrue {
    color: #f90;
    border-color: #f90;
  }
  .card {
    position: relative;
    top: 6px;
    display: inline-block;
    width: 30px;
    height: 28px;
    margin-right: 6px;
    z-index: -1;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg==");
  }
}
.discount-label-text {
  font-size: 22px;
  color: #999;
}
.showTimes {
  font-size: 24px;
  color: #999;
}
</style>
