<template>
	<div class="cinema-info">
		<div class="info-box">
			<div class="title line-ellipsis">{{cinemaData.nm}}</div>
			<div class="location">{{cinemaData.addr}}</div>
		</div>
		<div class="location-icon">
			<img src="../assets/images/location.png">
			<div>地图</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "cinemaMap",
  props: {
	  cinemaData: {
		  type: Object,
		  default: {}
	  },
  },
};
</script>

<style lang="scss" scoped>
.cinema-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  padding-right: 0;
  background: #fff;
  .info-box {
    width: 520px;
  }
  .title {
    font-size: 30px;
    line-height: 48px;
    color: #333;
  }
  .location {
    margin-top: 2px;
    font-size: 28px;
    line-height: 37px;
    color: #999;
  }
  .location-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 75px;
    border-left: 1px solid #d8d8d8;
    text-align: center;
    div {
      font-size: 24px;
      color: #999;
    }
    img {
      width: 36px;
      height: 39px;
      margin-bottom: 10px;
    }
  }
}
</style>
