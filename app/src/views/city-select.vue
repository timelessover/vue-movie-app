<template>
    <div class="container">
        <!-- 搜索为空时显示所有城市列表 -->
        <div>
            <div class="citylist-content">
                <index-bar
                    highlight-color="#e54847"
                    :z-index="barIndex"
                    sticky
                    :sticky-offset-top="topDistance"
                    :index-list="indexList"
                >
                    <div v-for="section in citylist" :key="section.title" class="section">
                        <index-anchor :index="section.title"/>
                        <div
                            :class="[section.style==='inline'?'section-body-inline':'section-body']"
                        >
                            <div
                                v-for="city in section.items"
                                :key="city.id"
                                class="section-item"
                                @click="selectCity(city.city_name)"
                            >{{city.city_name}}</div>
                        </div>
                    </div>
                </index-bar>
            </div>
        </div>
    </div>
</template>

<script>
import empty from "@/components/empty.vue";
import { throttle } from "utils/util.js";
import { citys } from "utils/citys.js";
import { mapState, mapMutations } from "vuex";
import { Toast, IndexBar, IndexAnchor, Dialog } from "vant";
export default {
  name: "city-select",
  components: {
    empty,
    IndexBar,
    IndexAnchor
  },
  data() {
    return {
      citylist: [],
      navTop: 0, //侧边导航距离窗口顶部的距离,
      navItemHeight: 0, //侧边导航项的高度
      sections: [], //所有section，保存每个section的节点在文档的位置信息
      topDistance: 45,
      barIndex: 0,
      indexList: [],
    };
  },
  created() {
    this.$store.commit('changeTitle',"选择城市")
    this.$store.commit('IsBackPage',true)
    this.normalizeCityList(citys);
  },
  methods: {
    //处理API返回的城市列表数据
    normalizeCityList(citys) {
      let map = {};
      citys.forEach(item => {
        const key = item.city_pre.toUpperCase();
        //如果没有该字母索引，就创建该字母索引
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(item);
      });
      let list = [];
      for (let [index, value] of Object.entries(map)) {
        list.push(value);
      }
      //按字母顺序排序
      list.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      //创建热门城市
      const hot = {
        title: "热门",
        style: "inline",
        items: citys.slice(0, 10)
      };
      list.unshift(hot);
      //创建当前定位城市
      let current = {
        title: "当前",
        style: "inline",
        items: []
      };
      current.items = [
        {
          city_name: this.$store.state.selectCity
        }
      ];
      list.unshift(current);
      let arrIndex = [];
      list.forEach(item => {
        arrIndex.push(item.title);
      });
      this.indexList = arrIndex;
      this.citylist = list;
    },
    //点击城市的事件处理程序
    selectCity(cityName) {
      Dialog.confirm({
        title: "提示",
        message: "没有获取猫眼城市ID的API，所以暂不支持切换城市",
        confirmButtonColor: '#e54847'
      }).then(() => {
        this.$store.commit('selectCity',cityName)
        this.$router.push('/movie')
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #ebebeb;
  color: #333;
  font-size: 28px;

  .search-city {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #f5f5f5;
    padding: 22px 30px;
    box-sizing: border-box;
  }

  .search-input {
    height: 2em;
    background: #fff;
    padding-left: 60px;
    color: #999;
  }
}

.icon-sousuo {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  color: #999;
}

/* 搜索结果区样式 */

.result-box {
  min-height: calc(100vh - 100px);
  margin-top: 100px;
  background: #f5f5f5;
}

.result-item {
  height: 88px;
  line-height: 88px;
  margin-left: 30px;
  border-bottom: 1px solid #c8c7cc;
}

/* 城市列表样式 */
.section-title {
  padding-left: 30px;
  line-height: 60px;
}

.section-body {
  background-color: #f5f5f5;
  padding-right: 60px;

  .section-item:last-child {
    border: none;
  }

  .section-item {
    height: 88px;
    line-height: 88px;
    margin-left: 30px;
    border-bottom: 1px solid #c8c7cc;
  }
}

.section-body-inline {
  display: flex;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  padding-bottom: 30px;
  padding-left: 30px;

  .section-item {
    min-width: 26%;
    background: #fff;
    margin-top: 30px;
    margin-right: 4%;
    border-radius: 6px;
    line-height: 66px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 30px;
  }
}

/* 城市侧边栏导航样式 */

.citylist-nav {
  position: fixed;
  top: 13vh;
  right: 0;
  width: 30px;
  text-align: center;

  > view {
    font-size: 24px;
    line-height: 1.5;
  }
}
</style>