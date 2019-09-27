<template>
  <div class='loading-more'>
    <img src='../assets/images/loading.gif' class='loading-img'/>
    <div class='loading-text'>正在加载...</div>
  </div>
</template>

<script>
	export default{
		name: 'loadingMore',
	}
</script>

<style lang="scss">
	.loading-more{
	  text-align: center;
	  margin-top: 18px;
	  .loading-img{
	    width: 54px;
	    height: 54px;
	  }
	  .loading-text{
	    margin-top: 8px;
	    color: #666;
	    font-size: 28px;
	  }
	}
</style>
