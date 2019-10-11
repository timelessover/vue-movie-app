<template>
  <div class="select-nav">
    <div class="tab">
      <div :class="['nav-item', itemNum === 1?'select-item': '']" @click="selectItemNum(1)">
        <span class="title line-ellipsis">{{itemName1}}</span>
        <span class="city-entry-arrow"></span>
      </div>
      <div
        :class="['nav-item','have-border',itemNum===2?'select-item':'']"
        @click="selectItemNum(2)"
      >
        <span class="title line-ellipsis">{{itemName2}}</span>
        <span class="city-entry-arrow"></span>
      </div>
      <div :class="['nav-item',itemNum === 3 ? 'select-item' : '']" @click="selectItemNum(3)">
        <span class="title line-ellipsis">{{itemName3}}</span>
        <span class="city-entry-arrow"></span>
      </div>
    </div>
    <div class="nav-content">
      <div class="nav-content-item region" v-show="itemNum===1">
        <div class="tab">
          <div
            :class="['nav-item',selectRegion.item===0 ?'active':'']"
            @click="selectRegionItem(0)"
          >商区</div>
          <div
            :class="['nav-item',selectRegion.item===1 ?'active':'']"
            @click="selectRegionItem(1)"
          >地铁站</div>
        </div>
        <div class="region-list">
          <div class="region-sidenav">
            <div
              v-for="item in selectRegion.sideList"
              :key="item.id"
              :class="['line-ellipsis','side-item',selectRegion.item === 0?(item.id===selectRegion.selectDistrictId?'active':''):(item.id===selectRegion.selectLineId?'active':'')]"
              @click="regionSideClick(item)"
            >{{item.name}}({{item.count}})</div>
          </div>
          <div class="region-list-item">
            <div
              v-for="item in selectRegion.list"
              :key="item.id"
              :class="['item',selectRegion.item===0?(item.id===selectRegion.selectAreaId?'red':''):(item.id===selectRegion.selectStationId?'red':'')]"
              @click="regionListClick(item)"
            >
              <div>
                <span
                  class="iconfont icon-hook"
                  :style="{'visibility':selectRegion.item===0?(item.id===selectRegion.selectAreaId?'':'hidden'):(item.id===selectRegion.selectStationId?'':'hidden')}"
                ></span>
                {{item.name}}
              </div>
              <div>{{item.count}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 品牌列表 -->
      <div class="nav-content-item brand" v-show="itemNum===2">
        <div class="brand-scroll-view">
          <div
            v-for="item in cityCinemaInfo.brand.subItems"
            :key="item.id"
            :class="['brand-item',selectBrandId===item.id?'red':'']"
            @click="selectBrand(item)"
          >
            <div>
              <span class="iconfont icon-hook"></span>
              {{item.name}}
            </div>
            <div class="brand-count">{{item.count}}</div>
          </div>
        </div>
      </div>
      <div class="nav-content-item special" v-show="itemNum === 3">
        <div class="special-scroll-view">
          <div class="item-title">特色功能</div>
          <div class="item-list">
            <div
              v-for="item in cityCinemaInfo.service.subItems"
              :key="item.id"
              :class="['btn','line-ellipsis',selectServiceId===item.id?'select':'']"
              @click="specialSelectItem(item.id,'service')"
            >{{item.name}}</div>
          </div>
          <div class="item-title">特殊厅</div>
          <div class="item-list">
            <div
              v-for="item in cityCinemaInfo.hallType.subItems"
              :key="item.id"
              :class="['btn','line-ellipsis',selectHallTypeId===item.id?'select':'']"
              @click="specialSelectItem(item.id,'hallType')"
            >{{item.name}}</div>
          </div>
        </div>
        <div class="special-btn">
          <div class="btn" @click="specialReset">重置</div>
          <div class="btn confirm-btn" @click="specialConfirm">确定</div>
        </div>
      </div>
      <div class="mask" @click.stop="cancal" v-show="itemNum !== -1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fitel-nav",
  props: {
    cityCinemaInfo: {
      type: Object,
      default: {}
    },
    hidden: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      itemNum: -1,
      itemName1: "全城",
      itemName2: "品牌",
      itemName3: "特色",
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
    };
  },
  methods: {
    selectItemNum(index) {
      if (this.itemNum === index) {
        this.itemNum = -1;
      } else {
        this.itemNum = index;
      }
      // 出现全城列表
      if (index === 1) {
        this.selectRegionItem(0);
      }
    },
    //遮罩层的点击事件
    cancal() {
      this.itemNum = -1;
    },
    selectBrand(brand) {
      let brandName = brand.name;
      if (brand.id === -1) {
        brandName = "品牌";
      }
      this.$emit("change", {
        brandId: brand.id
      });
      this.selectBrandId = brand.id;
      this.itemName2 = brandName;
      this.itemNum = -1;
    },
    //特色重置按钮
    specialReset() {
      this.selectServiceId = -1;
      this.selectHallTypeId = -1;
    },
    //特色选择按钮
    specialSelectItem(typeId, type) {
      if (type === "service") {
        this.selectServiceId = typeId;
      } else {
        this.selectHallTypeId = typeId;
      }
    },
    //特色确定按钮
    specialConfirm() {
      const { selectServiceId, selectHallTypeId } = this;
      this.$emit("change", {
        serviceId: selectServiceId,
        hallType: selectHallTypeId
      });
      this.itemNum = -1;
    },
    //“全城”的side的点击事件
    regionSideClick(side) {
      const {
        item,
        selectDistrictId,
        selectLineId,
        selectStationId,
        selectAreaId
      } = this.selectRegion;
      let obj = {
        ...this.selectRegion,
        list: side.subItems ? side.subItems : []
      };
      if (item === 0) {
        //点击“全部”时关闭下拉框
        if (side.id === -1 && selectDistrictId !== -1) {
          this.$emit("change", {
            districtId: -1,
            lineId: selectLineId,
            areaId: -1,
            stationId: selectStationId
          });
          this.itemNum = -1;
          this.itemName1 = "全城";
          this.selectRegion = {
            ...this.selectRegion,
            selectDistrictId: -1,
            selectAreaId: -1,
            list: []
          };
          return;
        }
        obj.selectDistrictId = side.id;
        obj.list = side.subItems ? side.subItems : [];
      } else {
        if (side.id === -1 && selectLineId !== -1) {
          this.$emit("change", {
            districtId: selectDistrictId,
            lineId: -1,
            areaId: selectAreaId,
            stationId: -1
          });
          (this.itemNum = -1),
            (this.itemName1 = "全城"),
            (this.selectRegion = {
              ...this.data.selectRegion,
              selectLineId: -1,
              selectStationId: -1,
              list: []
            });
          return;
        }
        obj.selectLineId = side.id;
      }
      this.selectRegion = obj;
    },
    //“全城”详细list的点击事件
    regionListClick(item) {
      let obj = {
        ...this.selectRegion
      };
      if (this.selectRegion.item === 0) {
        obj.selectAreaId = item.id;
      } else {
        obj.selectStationId = item.id;
      }
      this.$emit("change", {
        districtId: obj.selectDistrictId,
        lineId: obj.selectLineId,
        areaId: obj.selectAreaId,
        stationId: obj.selectStationId
      });
      this.selectRegion = obj;
      this.itemNum = -1;
      this.itemName1 = item.name;
    },
    //“全城”的item点击事件
    selectRegionItem(index) {
      const cityCinemaInfo = this.cityCinemaInfo;
      let obj = {
        ...this.selectRegion
      };
      if (index === 0) {
        obj.item = 0;
        obj.sideList = cityCinemaInfo.district.subItems;
        const findItem = obj.sideList.find(
          item => item.id === obj.selectDistrictId
        );
        obj.list = findItem.subItems ? findItem.subItems : [];
      } else {
        obj.item = 1;
        obj.sideList = cityCinemaInfo.subway.subItems;
        const findItem = obj.sideList.find(
          item => item.id === obj.selectLineId
        );
        obj.list = findItem.subItems ? findItem.subItems : [];
      }
      this.selectRegion = obj;
    }
  }
};
</script>

<style lang='scss' scoped>
.select-nav {
  font-size: 28px;
}

.tab {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 10vw;
  position: relative;
  color: #555;
  background: #fff;
  &::before {
    position: absolute;
    content: " ";
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #d8d8d8;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .nav-item {
    width: 33.33%;
    flex-grow: 1;
    text-align: center;
    font-size: 28px;
    .title {
      display: inline-block;
      max-width: 80%;
    }
  }
}

.have-border {
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
}

.city-entry-arrow {
  width: 0;
  height: 0;
  border: 8px solid #b0b0b0;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  display: inline-block;
  vertical-align: span-top;
  margin-left: 8px;
  margin-top: 10px;
}

.select-item {
  color: #e54847;
  .city-entry-arrow {
    position: relative;
    transform: translateY(-8px);
    border: 8px solid #e54847;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
  }
}

.nav-content {
  .nav-content-item {
     z-index: 999;
    position: relative;
    width: 100vw;
    height: calc(100vh * 0.6);
    background: #fff;
    color: #777;
  }
}
.region {
  .tab {
    border: none;
  }
  .nav-item {
    height: 100%;
    line-height: 80px;
    box-sizing: border-box;
    &.active {
      color: #e54847;
      border-bottom: 2px solid #e54847;
    }
  }
  .region-list {
    display: flex;
    width: 100%;
    height: calc(100% - 80px);
  }
}

.region-sidenav {
  white-space: nowrap;
  width: calc(100vw * 0.4);
  height: 100%;
  overflow: scroll;
  .side-item {
    height: 80px;
    line-height: 80px;
    padding-left: 30px;
    &.active {
      color: #dd403b;
      background: #f5f5f5;
    }
  }
}

.region-list-item {
  white-space: nowrap;
  flex-grow: 1;
  height: 100%;
  background: #f5f5f5;
  overflow: scroll;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 50px;
    height: 80px;
  }
}

/* brand */

.brand-scroll-view {
  white-space: nowrap;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.brand-item {
  display: flex;
  justify-content: space-between;
  line-height: 88px;
  height: 88px;
  border-bottom: 1px solid #f0f0f0;
  padding-left: 45px;
  padding-right: 80px;
}

.red {
  color: #dd403b;
}

.brand-count {
  font-size: 24px;
}

/* special */

.special-scroll-view {
  white-space: nowrap;
  width: 100%;
  height: calc(100% - 120px);
}

.special {
  .item-title {
    padding: 20px 30px;
  }
  .item-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 30px;
    .btn {
      width: 21.3%;
      height: 60px;
      margin-right: 3%;
      margin-bottom: 20px;
      line-height: 60px;
      text-align: center;
      border-radius: 10px;
      font-size: 24px;
      box-sizing: border-box;
      border: 1px solid #e5e5e5;
      padding: 0 6px;
      &.select {
        background: #fcf0f0;
        color: #f03d37;
        border: 1px solid #f03d37;
      }
    }
  }
}
.special-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  background: #fafafa;
  border-top: 1px solid #e5e5e5;
  padding: 0 30px;
  box-sizing: border-box;
  .btn {
    background: #fff;
    border: 1px solid #e5e5e5;
    height: 68px;
    width: 20%;
    text-align: center;
    border-radius: 12px;
    font-size: 28px;
    line-height: 68px;
    .confirm-btn {
      background: #f03d37;
      border: 1px solid #f03d37;
      color: #fff;
    }
  }
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
