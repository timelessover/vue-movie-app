<template>
	<div class="container" :style="{position:isShow?'fixed':''}">
		<div class="top">
			<div>
				<selectTime
					:days="days"
					:start-time="showTime"
					@selectDayEvent="changeTime"
					@changeDays="changedays"
				></selectTime>
			</div>
			<div>
				<filter-nav
					:city-cinema-info="cityCinemaInfo"
					@change="changeCondition"
					@toggleShow="toggleShow"
					v-show="isShow"
				></filter-nav>
			</div>
		</div>
		<div class="main-content">
			<div class="cinema-list">
				<cinemaSection
					v-for="(cinema,index) in cinemas"
					:key="index"
					:cinema="cinema"
					:movieId="params.movieId"
					:day="params.day"
				></cinemaSection>
			</div>
			<div v-show="nothing">
				<empty message="暂无符合条件的影院"></empty>
			</div>
			<div v-show="noSchedule">
				<empty message="当天暂无场次"></empty>
			</div>
		</div>
	</div>
</template>

<script>
	import empty from '@/components/empty.vue'
	import cinemaSection from '@/components/cinemaSection.vue'
	import selectTime from '@/components/select-time.vue'
	import filterNav from '@/components/filter-nav.vue'
	  
	export default {
		components:{
			selectTime,
			filterNav,
			cinemaSection,
			empty
		},
		data() {
			return {
				showTime: '', //影片上映日期
				isShow: false, //导航下拉框是否展开
				cityCinemaInfo: {}, //影院过滤菜单
				params: { //影院搜索条件
					movieId: 0,
					day: '',
					offset: 0,
					limit: 20,
					districtId: -1,
					lineId: -1,
					hallType: -1,
					brandId: -1,
					serviceId: -1,
					areaId: -1,
					stationId: -1,
					item: '',
					updateShowDay: false,
				},
				days:null,
				cinemas: [], // 影院列表 
				loadComplete: false, // 数据是否加载完
				nothing: false, // 是否有符合过滤的影院
				noSchedule: false ,// 当天是否有场次，原本时间是由后台返回的，但是缺少城市ID就没有返回，导致当天可能没有播放场次,
			};
		},
		created() {
			const options = this.$route.query
			this.initPage(options)
		},
		methods:{
			initPage(options) {
				const movieId = options.movieId
				const movieName = options.movieName
				const showTime = options.showTime //影片上映日期
				this.showTime = showTime
				this.params = {
						...this.params,
						movieId
					}
			},
			//获取影院列表
			getCinemas(params) {
				return new Promise((resolve, reject) => {
					this.$http.post(`/ajax/movie?forceUpdate=${Date.now()}`,params).then(res=>{
						this.cinemas = this.cinemas.concat(res.data.cinemas),
						this.loadComplete = !res.data.paging.hasMore
						// 缺少了城市ID所以返回值缺少showDays，只能自己模拟时间
						resolve(res.data.cinemas)
					})
				})
			},
			//获取过滤菜单数据
			async getFilter() {
				const {
					params
				} = this
				const res = await this.$request.get(`/ajax/filterCinemas?movieId=${params.movieId}&day=${params.day}`)
				this.cityCinemaInfo = res.data
			},
			//当选择的时间变化时触发
			async changeTime(day) {
				this.params = { ...this.params,
					...day
				}
				this.cinemas = []
				this.isShow = false //隐藏过滤下拉框
				this.noSchedule = false
				const list =  await this.getCinemas(this.params)
					if (!list.length) {
						this.noSchedule =  true
						this.nothing = false
					}
				this.getFilter()
			},
			// 获取最近七天影院信息
			changedays(days){
				this.days = days  
			},
			//当过滤条件变化时调用的函数
			changeCondition(obj) {
				this.params = {
					...this.params,
					...obj
				},
				this.cinemas = [],
				this.nothing = false
				const list =  await this.getCinemas(this.params)
					if (!list.length) {
						this.noSchedule =  true
						this.nothing = false
					}
			},
			//导航下拉框状态变化时的处理，在下拉框展开时禁止滚动穿透
			toggleShow(item) {
				this.isShow = item !== -1
			}
		},
		//上拉触底加载更多
		onReachBottom() {
			if (this.loadComplete) {
				return
			}
			const params = {
				...this.params,
				offset: this.cinemas.length
			}
			this.getCinemas(params)
		}
	}
</script>

<style lang="scss">
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #555;
  font-size: 28upx;
  background: #fff;
  z-index: 10;
}
.main-content {
  padding-bottom: 30upx;
}

.cinema-list {
  margin-top: 170upx;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
