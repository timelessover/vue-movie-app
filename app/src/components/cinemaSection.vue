<template >
  <router-link class='cinema-section' :to='url' >
    <div class='name-price line-ellipsis'>{{cinema.nm}}
      <span class='sell-price' v-if='cinema.sellPrice'><span class='price'>{{cinema.sellPrice}}</span> 元起</span>
    </div>
    <div class='address'>
      <span class='line-ellipsis'>{{cinema.addr}}</span>
      <span class='distance'>{{cinema.distance}}</span>
    </div>
    <div class='feature-tags'>
      <span v-if='cinema.endorse || cinema.tag.endorse'>退</span>
      <span v-if='cinema.allowRefund || cinema.tag.allowRefund'>改签</span>
      <span v-for='item in cinema.hallType || cinema.tag.hallType' :key='item'>{{item}}</span>
      <span class='featrue' v-if='cinema.snack || cinema.tag.snack'>小吃</span>
      <span class='featrue' v-if='cinema.vipDesc ||cinema.tag.vipTag'>{{cinema.vipDesc ||cinema.tag.vipTag}}</span>
    </div>
    <div v-if='!!cinema.promotion.cardPromotionTag'>
      <span class='card'></span>
      <span class='discount-label-span'>{{cinema.promotion.cardPromotionTag}}</span>
    </div>
    <div v-if='cinema.showTimes' class='showTimes'>近期场次：{{cinema.showTimes}}</div>
  </router-link>
</template>

<script>
	export default{
		props:{
			cinema: Object,
			movieId: Number,
			day: String || Number
		},
		computed:{
			url(){
				return `/pages/cinema-detail/cinema-detail?cinemaId=${this.cinema.id}&movieId=${this.movieId}&day=${this.day}`
			}
		}
	}
</script>

<style lang="scss">
	.cinema-section {
	  padding: 30upx 0;
	  margin: 0 30upx;
	  border-bottom: 1px solid #f0f0f0;
	  line-height: 1.8em;
	}
	
	.name-price {
	  font-size: 32upx;
	  color: #333;
	}
	
	.sell-price {
	  font-size: 24upx;
	  color: #999;
	  white-space: nowrap;
	  margin-left: 20upx;
	}
	
	.price {
	  font-size: 34upx;
	  color: #ef4238;
	}
	
	.address {
	  display: flex;
	  justify-content: space-between;
	  font-size: 28upx;
	  color: #666;
	}
	
	.distance {
	  margin-left: 10upx;
	}
	
	.feature-tags {
	  width: 80%;
	}
	
	.feature-tags span {
	  display: inline-block;
	  border: 1px solid #589daf;
	  color: #589daf;
	  padding: 0 6upx;
	  height: 30upx;
	  line-height: 30upx;
	  border-radius: 4upx;
	  font-size: 24upx;
	  margin-right: 8upx;
	}
	
	.feature-tags .featrue {
	  color: #f90;
	  border-color: #f90;
	}
	
	.card {
	  position: relative;
	  top: 6upx;
	  display: inline-block;
	  width: 30upx;
	  height: 28upx;
	  margin-right: 6upx;
	  z-index: -1;
	  background-size: contain;
	  background-repeat: no-repeat;
	  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg==');
	}
	
	.discount-label-span {
	  font-size: 22upx;
	  color: #999;
	}
	
	.showTimes {
	  font-size: 24upx;
	  color: #999;
	}

</style>
