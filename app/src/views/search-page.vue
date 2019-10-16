<template>
	<div class="search-wrapper">
		<search v-model="value" :placeholder="placeholder" show-action @cancel="onCancel"/>
		<div class="result-list">
			<div v-if="movies.length" class="movie-box">
				<div class="title">电影/电视剧/综艺</div>
				<router-link
					v-for="(movie,index) in movies"
					:key="index"
					class="movie-section"
					:to="goMovieDetail(movie)"
				>
					<img class="movie-img" :src="movie.img">
					<div class="movie-info">
						<div class="movie-name line-ellipsis">
							{{movie.nm}}
							<span :class="['version', movie.version]"></span>
						</div>
						<div class="line-ellipsis">{{movie.enm}}</div>
						<div class="line-ellipsis">{{movie.cat}}</div>
						<div class="line-ellipsis">{{movie.rt}}</div>
					</div>
					<div class="score">
						<span class="grade" v-if="movie.sc">{{movie.sc}}分</span>
						<span v-else>暂无评分</span>
					</div>
				</router-link>
			</div>
			<div v-if="cinemas.length">
				<div class="title">影院</div>
				<cinemaSection v-for="(cinema,index) in cinemas" :key="index" :cinema="cinema"/>
			</div>
		</div>
		<div v-show="!isEmpty">
			<empty message="没有找到相关内容"></empty>
		</div>
	</div>
</template>

<script>
import empty from "@/components/empty.vue";
import cinemaSection from "@/components/cinemaSection.vue";
import { Search } from "vant";
import {throttle} from 'utils/util'
import { mapState, mapMutations } from "vuex";


export default {
  name: "searchPage",
  components: {
    empty,
    cinemaSection,
    Search
  },
  data() {
    return {
      value: "",
      stype: "",
      placeholder: "",
      movies: [],
      cinemas: [],
      isEmpty: true
    };
  },
  created() {
    this.tabBarSetting('搜素')
    const query = this.$route.query;
    this.initPage(query);
  },

  watch: {
    value: throttle(function() {
	  this.searchValue()
    },500)
  },
  methods: {
    tabBarSetting(title, back=true) {
      this.$store.commit("changeTitle", title);
      this.$store.commit("IsBackPage", back);
    },
    goMovieDetail(movie) {
      return `/movie/movie-detail?movieId=${movie.id}`;
    },
    initPage(query) {
      //搜索类型，-1代表搜索影院或电影，2代表搜索影院
      const stype = query.stype;
      let placeholder = "";
      if (stype === "-1") {
        placeholder = "搜电影、搜影院";
      } else {
        placeholder = "搜影院";
      }
      this.stype = stype;
      this.placeholder = placeholder;
    },
    onCancel() {
      this.$router.go(-1);
    },
    searchValue() {
      this.$http
        .get(`/movie/search?kw=${this.value}&cityId=1&stype=${this.stype}`)
        .then(res => {
          this.cinemas = res.data.cinemas ? res.data.cinemas.list : [];
          let movies = res.data.movies ? res.data.movies.list : [];
          movies = movies.map(item => {
            item.img = item.img.replace("w.h", "128.180");
            return item;
          });
          this.movies = movies;
          this.isEmpty =
            this.movies.length || this.cinemas.length || !this.value;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  background-color: #fff;
  font-size: 28px;
}

.search-input {
  flex-grow: 1;
  margin-right: 20px;
  background: #fff;
  color: #999;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  height: 60px;
  box-sizing: border-box;
  padding-left: 50px;

  .result-list {
    margin-top: 88px;
  }
}

.movie-box {
  padding-bottom: 20px;
  border-bottom: 20px solid #f5f5f5;
}
.title {
  font-size: 30px;
  color: #999;
  padding: 18px 30px;
}

.movie-section {
  position: relative;
  display: flex;
  align-items: center;
  height: 228px;
  padding: 0 30px;
  border-top: 1px solid #f0f0f0;
  .movie-name {
    font-size: 34px;
    color: #333;
    padding-right: 10px;
  }
  .movie-img {
    width: 128px;
    height: 180px;
  }
}

.movie-info {
  margin: 0 20px;
  font-size: 26px;
  color: #666;
  width: 55%;

  > div {
    margin-bottom: 6px;
  }
}

.version {
  display: inline-block;
  height: 28px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 10px;
  margin-top: 10px;
}

.score {
  flex: 1;
  text-align: right;
  font-size: 18px;
  color: #666;
}

.grade {
  font-size: 32px;
  color: #faaf00;
}

.cinema-section {
  padding: 30px;
  margin: 0;
  border: none;
  border-top: 1px solid #f0f0f0;
}
.van-search__action {
  color: #e54847 !important;
}
</style>
