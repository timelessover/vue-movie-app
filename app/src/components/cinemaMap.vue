<template>
  <view class='cinema-info'>
    <view class='info-box'>
      <view class='title line-ellipsis'>{{cinemaData.nm}}</view>
      <view class='location'>{{cinemaData.addr}}</view>
    </view>
    <navigator :url='url' class='location-icon' hover-class='none'>
      <image src='/static/images/location.png' mode='aspectFit'/>      <view>地图</view>
    </navigator>
  </view>
</template>

<script>
	export default{
		name:'cinemaMap',
		props:{
			cinemaData:Object
		},
		data(){
			return {
				url:null
			}
		},
		watch:{
			cinemaData(){
				this.url = `/pages/cinema-map/cinema-map?latitude=${this.cinemaData.lat}&longitude=${this.cinemaData.lng}&nm=${this.cinemaData.nm}&addr=${this.cinemaData.addr}`
			}
		}
	}
</script>

<style>
	.cinema-info {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 30rpx;
	  padding-right: 0;
	  background: #fff;
	}
	
	.cinema-info .info-box {
	  width: 520rpx;
	}
	
	.cinema-info .title {
	  font-size: 30rpx;
	  line-height: 48rpx;
	  color: #333;
	}
	
	.cinema-info .location {
	  margin-top: 2px;
	  font-size: 28rpx;
	  line-height: 37rpx;
	  color: #999;
	}
	
	.cinema-info .location-icon {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  width: 140rpx;
	  height: 75rpx;
	  border-left: 1px solid #d8d8d8;
	  text-align: center;
	}
	
	.cinema-info .location-icon image {
	  width: 36rpx;
	  height: 39rpx;
	  margin-bottom: 10rpx;
	}
	.cinema-info .location-icon view{
	  font-size: 24rpx;
	  color: #999;
	}
</style>
