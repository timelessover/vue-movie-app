<template>
	<div class='container' :style="{position: isShow ? 'fixed' : ''}">
		<div class='topbar'>
			<roter-link class='city-entry' to='/city-select'>
				<span class='city-name'>{{city}}</span>
				<span class='city-entry-arrow'></span>
			</roter-link>
			<roter-link to='/pages/search-page/search-page?stype=2' class='search-input'>
				<span class='iconfont icon-sousuo'></span>搜影院</roter-link>
		</div>
		<div class='nav-wrapper'>
	    <!-- <filter-nav :city-cinema-info='cityCinemaInfo' @change='changeCondition' @toggleShow='toggleShow'/> -->
		</div>
		<div class='cinema-list'>
			<block v-for="(cinema) in cinemas" :key="cinema.id">
				<!-- <cinemaSection :cinema="cinema"></cinemaSection> -->
			</block>
		</div>
		<div v-if='!loadComplete && cinemas.length'>
			<loadingMore></loadingMore>
		</div>
		<div v-show='nothing'>
			<empty message="暂无符合条件的影院"></empty>
		</div>
	</div>
</template>

<script>
	import cinemaSection from '@/components/cinemaSection.vue'
	import empty from '@/components/empty.vue'
	// import filterNav from '@/components/filter-nav.vue'
	import request from '@/utils/request.js'
	import loadingMore from '@/components/loadingMore.vue'
	import {getToday} from '@/utils/util.js'
	export default {
		components: {
			cinemaSection,
			empty,
			filterNav,
			loadingMore
		},
		data() {
			return {
				params: { //url请求参数对象
					day: getToday(),
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
					updateShowDay: false
				},
				nothing: false, //结果是否为空
				cinemas: [], //影院列表
				cityCinemaInfo: {}, //城市影院信息
				loadComplete: false, //数据是否加载完
				isShow: false, //导航下拉框是否展开
			}

		},
		computed: {
			city(){
				if (!this.$store.state.selectCity) {
					return '正在定位'
				} else {
					return this.$store.state.selectCity.cityName
				}
			}
		},
		methods: {
			//初始化页面
			initPage() {
				uni.showLoading({
					title: '正在加载...'
				})
				this.getCinemas(this.params).then((res) => {
					this.cinemas = [...this.cinemas, ...res[1].data.cinemas]
					this.loadComplete = !res[1].data.paging.hasMore
					uni.hideLoading()
				})
				request('/ajax/filterCinemas').then((res) => {
					this.cityCinemaInfo = res[1].data
				})
			},
			//获取影院列表
			getCinemas(params) {
				return request('/ajax/cinemaList', params)
			},
			// 当过滤条件变化时调用的函数
			changeCondition(obj) {
				uni.showLoading({
					title: '正在加载...'
				})
				this.params = {
					...this.params,
					...obj
				}
				this.cinemas = []
				this.nothing = false
				this.getCinemas(this.params).then((list) => {
					if (!list[1].data.cinemas.length) {
						this.nothing = true
					}
					this.cinemas = [...this.cinemas, ...list[1].data.cinemas]
					this.loadComplete = !list[1].data.paging.hasMore
					uni.hideLoading()
				})
			},
			//导航下拉框状态变化时的处理
			toggleShow(e) {
				const item = e.detail.item
				this.isShow = item !== -1
			},
		},
		created() {
			this.initPage()
		},

		//上拉触底加载更多
		onReachBottom() {
			if (this.loadComplete) {
				return
			}
			const params = { ...this.params,
				offset: this.cinemas.length
			}
			this.getCinemas(params).then((res) => {
				this.cinemas = [...this.cinemas, ...res[1].data.cinemas]
				this.loadComplete = !res[1].data.paging.hasMore
				uni.hideLoading()
			})
		},
		//转发
		onShareAppMessage(res) {
			return {
				title: '最近上映的这些电影你都看了吗？',
				path: 'pages/tabBar/movie/movie'
			}
		}
	}
</script>

<style lang="scss">
	.topbar {
	  position: fixed;
	  width: 100vw;
	  top: 0;
	  height: 90upx;
	  border: none;
	  background-color: #f5f5f5;
	}
	
	.search-input {
	  flex-grow: 1;
	  height: 56upx;
	  font-size: 26upx;
	  color: #999;
	  border: 1upx solid #e6e6e6;
	  border-radius: 10upx;
	  margin: 0 30upx;
	  background: #fff;
	  line-height: 56upx;
	  text-align: center;
	}
	
	.icon-sousuo {
	  display: inline-block;
	  margin-right: 10upx;
	  font-size: 24upx;
	  color: #999;
	}
	
	.nav-wrapper {
	  position: fixed;
	  z-index: 10;
	  top: 90upx;
	  left: 0;
	  width: 100vw;
	  height: 80upx;
	  background: #fff;
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
