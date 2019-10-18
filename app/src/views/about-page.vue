<template>
	<div class='container'>
		<div class='banner'>
			<img src='../assets/images/youcan.jpg'/>
		</div>
		<div class='section'>
			<div v-for='(item,index) in info' :key='index'>
				<span>{{item.label}}：</span>
				<span>{{item.value}}</span>
			</div>
			<div>
			</div>
		</div>
		<div class='section' style="text-align: center;">
			<span>觉得不错的可以给个star鼓励一个哦！</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info: [{
						label: '姓名',
						value: '刘延平'
					},
					{
						label: '岗位',
						value: '前端工程师'
					},
					{
						label: '微信',
						value: '17812260489'
					},
					{
						label: 'github',
						value: 'https://github.com/timelessover'
					},
				]
			};
        },
        created () {
             this.$store.commit('changeTitle',"关于我")
             this.$store.commit('IsBackPage');
        },
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		background: #f7f7f7;
		overflow: auto;
	}

	.banner {
		height: 375px;
		margin: 20px;
		box-sizing: border-box;
		background-color: #eee;
		line-height: 0;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 2px 2px 2px 1px #ddd;

		>img {
			width: 100%;
			height: 100%;
		}
	}



	.section {
		background-color: #fff;
		margin: 0 20px 20px;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 2px 2px 2px 1px #ddd;
		

		span {
			font-size: 28px;
			line-height: 2em;
			color: #666;
		}
	}
</style>
