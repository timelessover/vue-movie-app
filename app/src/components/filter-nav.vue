<template>
	<view class='nav'>
		<view class='tab'>
			<view :class="['nav-item', itemNum === 1?'select-item': '']" @click='selectItemNum(1)'>
				<text class='title line-ellipsis'>{{itemName1}}</text>
				<text class='city-entry-arrow'></text>
			</view>
			<view :class="['nav-item','have-border',itemNum===2?'select-item':'']" @click='selectItemNum(2)'>
				<text class='title line-ellipsis'>{{itemName2}}</text>
				<text class='city-entry-arrow'></text>
			</view>
			<view :class="['nav-item',itemNum === 3 ? 'select-item' : '']" @click='selectItemNum(3)'>
				<text class='title line-ellipsis'>{{itemName3}}</text>
				<text class='city-entry-arrow'></text>
			</view>
		</view>
		<view class='nav-content'>
			<view class='nav-content-item region' v-show='itemNum===1'>
				<view class='tab'>
					<view :class="['nav-item',selectRegion.item===0 ?'active':'']" @click='selectRegionItem(0)'>商区</view>
					<view :class="['nav-item',selectRegion.item===1 ?'active':'']" @click='selectRegionItem(1)'>地铁站</view>
				</view>
				<view class='region-list'>
					<scroll-view class='region-sidenav' scroll-y>
						<view v-for='(item,index) in selectRegion.sideList' :key='item.id' :class="['line-ellipsis','side-item',selectRegion.item === 0?(item.id===selectRegion.selectDistrictId?'active':''):(item.id===selectRegion.selectLineId?'active':'')]"
						 @click='regionSideClick(item)'>{{item.name}}({{item.count}})</view>
					</scroll-view>
					<scroll-view class='region-list-item' scroll-y>
						<view v-for='(item,index) in selectRegion.list' :key='item.id' :class="['item',selectRegion.item===0?(item.id===selectRegion.selectAreaId?'red':''):(item.id===selectRegion.selectStationId?'red':'')]"
						 @click='regionListClick(item)'>
							<view>
								<text class='iconfont icon-hook' :style="{'visibility':selectRegion.item===0?(item.id===selectRegion.selectAreaId?'':'hidden'):(item.id===selectRegion.selectStationId?'':'hidden')}"></text>
								{{item.name}}
							</view>
							<view>{{item.count}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- 品牌列表 -->
			<view class='nav-content-item brand' v-show="itemNum===2">
				<scroll-view class='brand-scroll-view' scroll-y>
					<view v-for='(item,index) in cityCinemaInfo.brand.subItems' :key='item.id' :class="['brand-item',selectBrandId===item.id?'red':'']"
					 @click='selectBrand(item)'>
						<view>
							<text class='iconfont icon-hook'></text> {{item.name}}
						</view>
						<view class='brand-count'>{{item.count}}</view>
					</view>
				</scroll-view>
			</view>
			<view class='nav-content-item special' v-show='itemNum === 3'>
				<scroll-view class='special-scroll-view' scroll-y>
					<view class='item-title'>特色功能</view>
					<view class='item-list'>
						<view v-for='(item,index) in cityCinemaInfo.service.subItems' :key='item.id' :class="['btn','line-ellipsis',selectServiceId===item.id?'select':'']"
						 @click="specialSelectItem(item.id,'service')">{{item.name}}</view>
					</view>
					<view class='item-title'>特殊厅</view>
					<view class='item-list'>
						<view v-for='(item,index) in cityCinemaInfo.hallType.subItems' :key='item.id' :class="['btn','line-ellipsis',selectHallTypeId===item.id?'select':'']"
						 @click="specialSelectItem(item.id,'hallType')">{{item.name}}</view>
					</view>
				</scroll-view>
				<view class='special-btn'>
					<view class='btn' @click='specialReset'>重置</view>
					<view class='btn confirm-btn' @click='specialConfirm'>确定</view>
				</view>
			</view>
			<view class='mask' @click.stop='cancal' v-show="itemNum !== -1"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'fitel-nav',
		props: {
			cityCinemaInfo: {
				type: Object,
				default: {}
			},
			hidden: {
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {
				itemNum: -1,
				itemName1: '全城',
				itemName2: '品牌',
				itemName3: '特色',
				selectBrandId: -1, //选择的品牌ID
				selectServiceId: -1, //选择的服务ID
				selectHallTypeId: -1, //选择的特殊厅ID
				selectRegion: {
					item: 0,
					sideList: [], //侧边导航的list
					list: [], //详情list
					selectDistrictId: -1, //选择的大区ID
					selectAreaId: -1, //选择的小区ID
					selectLineId: -1, //选择的地铁线ID
					selectStationId: -1 //选择的地铁站ID
				}
			}
		},
		methods: {
			selectItemNum(index) {
				if (this.itemNum === index) {
					this.itemNum = -1
				} else {
					this.itemNum = index
				}
				// 出现全城列表
				if(index===1){
					this.selectRegionItem(0) 
				}
			},
			//遮罩层的点击事件
			cancal() {
				this.itemNum = -1
			},
			selectBrand(brand) {
				let brandName = brand.name
				if (brand.id === -1) {
					brandName = '品牌'
				}
				this.$emit('change', {
					brandId: brand.id
				})
				this.selectBrandId = brand.id
				this.itemName2 = brandName
				this.itemNum = -1
			},
			//特色重置按钮
			specialReset() {
				this.selectServiceId = -1
				this.selectHallTypeId = -1
			},
			//特色选择按钮
			specialSelectItem(typeId, type) {
				if (type === 'service') {
					this.selectServiceId = typeId
				} else {
					this.selectHallTypeId = typeId
				}
			},
			//特色确定按钮
			specialConfirm() {
				const {
					selectServiceId,
					selectHallTypeId
				} = this
				this.$emit('change', {
					serviceId: selectServiceId,
					hallType: selectHallTypeId
				})
				this.itemNum = -1
			},
			//“全城”的side的点击事件
			regionSideClick(side) {
				const {
					item,
					selectDistrictId,
					selectLineId,
					selectStationId,
					selectAreaId
				} = this.selectRegion
				let obj = { ...this.selectRegion,
					list: side.subItems ? side.subItems : []
				}
				if (item === 0) {
					//点击“全部”时关闭下拉框
					if (side.id === -1 && selectDistrictId !== -1) {
						this.$emit('change', {
							districtId: -1,
							lineId: selectLineId,
							areaId: -1,
							stationId: selectStationId
						})
						this.itemNum = -1
						this.itemName1 = '全城'
						this.selectRegion = { ...this.selectRegion,
							selectDistrictId: -1,
							selectAreaId: -1,
							list: []
						}
						return
					}
					obj.selectDistrictId = side.id
					obj.list = side.subItems ? side.subItems : []
				} else {
					if (side.id === -1 && selectLineId !== -1) {
						this.$emit('change', {
							districtId: selectDistrictId,
							lineId: -1,
							areaId: selectAreaId,
							stationId: -1
						})
						this.itemNum = -1,
							this.itemName1 = '全城',
							this.selectRegion = { ...this.data.selectRegion,
								selectLineId: -1,
								selectStationId: -1,
								list: []
							}
						return
					}
					obj.selectLineId = side.id
				}
				this.selectRegion = obj
			},
			//“全城”详细list的点击事件
			regionListClick(item) {
				let obj = { ...this.selectRegion
				}
				if (this.selectRegion.item === 0) {
					obj.selectAreaId = item.id
				} else {
					obj.selectStationId = item.id
				}
				this.$emit('change', {
					districtId: obj.selectDistrictId,
					lineId: obj.selectLineId,
					areaId: obj.selectAreaId,
					stationId: obj.selectStationId
				})
				this.selectRegion = obj
				this.itemNum = -1
				this.itemName1 = item.name
			},
			//“全城”的item点击事件
			selectRegionItem(index) {
				const cityCinemaInfo = this.cityCinemaInfo
				let obj = { ...this.selectRegion
				}
				if (index === 0) {
					obj.item = 0
					obj.sideList = cityCinemaInfo.district.subItems
					const findItem = obj.sideList.find(item => item.id === obj.selectDistrictId)
					obj.list = findItem.subItems ? findItem.subItems : []
				} else {
					obj.item = 1
					obj.sideList = cityCinemaInfo.subway.subItems
					const findItem = obj.sideList.find(item => item.id === obj.selectLineId)
					obj.list = findItem.subItems ? findItem.subItems : []
				}
				this.selectRegion = obj 
			},

		}
	}
</script>

<style lang='scss'>
	.line-ellipsis {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.nav {
		font-size: 28upx;
	}

	.tab {
		display: flex;
		align-items: center;
		width: 100vw;
		height: 80upx;
		border-bottom: 1px solid #e6e6e6;
		color: #555;
		background: #fff;
	}

	.nav-item {
		flex-grow: 1;
		text-align: center;
		font-size: 28upx;
	}

	.tab .nav-item {
		width: 33.33%
	}

	.nav-item .title {
		display: inline-block;
		max-width: 80%;
	}

	.have-border {
		border-left: 1px solid #e6e6e6;
		border-right: 1px solid #e6e6e6;
	}

	.city-entry-arrow {
		width: 0;
		height: 0;
		border: 8upx solid #b0b0b0;
		border-left-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
		display: inline-block;
		vertical-align: text-top;
		margin-left: 8upx;
		margin-top: 10upx;
	}

	.select-item {
		color: #e54847;
	}

	.select-item .city-entry-arrow {
		position: relative;
		transform: translateY(-8upx);
		border: 8upx solid #e54847;
		border-left-color: transparent;
		border-right-color: transparent;
		border-top-color: transparent;
	}

	.nav-content-item {
		position: relative;
		width: 100vw;
		height: calc(100vh * 0.6);
		background: #fff;
		color: #777;
	}

	/* region */

	.region .tab {
		border: none;
	}

	.region .nav-item {
		height: 100%;
		line-height: 80upx;
		box-sizing: border-box;
	}

	.region .nav-item.active {
		color: #e54847;
		border-bottom: 2px solid #e54847;
	}

	.region-list {
		display: flex;
		width: 100%;
		height: calc(100% - 80upx);
	}

	.region-sidenav {
		white-space: nowrap;
		/* 直接用百分比有点问题 */
		width: calc(100vw * 0.4);
		height: 100%;
	}

	.side-item {
		height: 80upx;
		line-height: 80upx;
		padding-left: 30upx;
	}

	.side-item.active {
		color: #dd403b;
		background: #f5f5f5;
	}

	.region-list-item {
		white-space: nowrap;
		flex-grow: 1;
		height: 100%;
		background: #f5f5f5;
	}

	.region-list-item .item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 30upx;
		padding-right: 50upx;
		height: 80upx;
	}

	/* brand */

	.brand-scroll-view {
		white-space: nowrap;
		width: 100%;
		height: 100%;
	}

	.brand-item {
		display: flex;
		justify-content: space-between;
		line-height: 88upx;
		height: 88upx;
		border-bottom: 1px solid #f0f0f0;
		padding-left: 45upx;
		padding-right: 80upx;
	}

	.red {
		color: #dd403b;
	}


	.brand-count {
		font-size: 24upx;
	}

	/* special */

	.special-scroll-view {
		white-space: nowrap;
		width: 100%;
		height: calc(100% - 120upx);
	}

	.special .item-title {
		padding: 20upx 30upx;
	}

	.special .item-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
	}

	.special .item-list .btn {
		width: 21.3%;
		height: 60upx;
		margin-right: 3%;
		margin-bottom: 20upx;
		line-height: 60upx;
		text-align: center;
		border-radius: 10upx;
		font-size: 24upx;
		box-sizing: border-box;
		border: 1px solid #e5e5e5;
		padding: 0 6upx;
	}

	.special .item-list .btn.select {
		background: #fcf0f0;
		color: #f03d37;
		border: 1px solid #f03d37;
	}

	.special-btn {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120upx;
		background: #fafafa;
		border-top: 1px solid #e5e5e5;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.special-btn .btn {
		background: #fff;
		border: 1px solid #e5e5e5;
		height: 68upx;
		width: 20%;
		text-align: center;
		border-radius: 12upx;
		font-size: 28upx;
		line-height: 68upx;
	}

	.special-btn .btn.confirm-btn {
		background: #f03d37;
		border: 1px solid #f03d37;
		color: #fff;
	}

	/* 遮罩层 */

	.mask {
		position: fixed;
		z-index: -1;
		bottom: 0;
		left: 0;
		height: 50%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
	}
</style>
