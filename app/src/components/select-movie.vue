<template>
	<div class="swiper-container">
		<div class="post-bg" :style="bgImg"></div>
		<div class="post-bg-mask"></div>
		<div class="scroll-view_H">
			<div
				class="movie-item"
				v-for="(item,index) in movies"
				:key="index"
				@click="selectMovie(item)"
				:id="ids(index)"
				:style="translateBox(index)"
			>
				<div :class="['post',{'select':movie.id===item.id}]">
					<img :src="item.img">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      value: []
    },
    defaultSelectID: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      movie: { id: 0 }, //选中的电影
      scrollLeft: 0, //设置滚动条位置
      size: 0, //电影item的大小（包括margin）
      index: 0
    };
  },
  computed: {
    bgImg() {
      if (this.movie) return `background-image: url(${this.movie.img})`;
    }
  },
  mounted() {
    this.selectMovie(this.movies[0]);
  },
  methods: {
    translateBox(index) {
      return { transform: `translateX( ${-this.scrollLeft}px)` };
    },
    ids(index) {
      if (this.movie) {
        return `item${index}`;
      }
    },
    selectMovie(curMovie) {
      const { movies } = this;
      const movie =
        curMovie ||
        movies.find(item => item.id == this.defaultSelectID) ||
        movies[this.i];
      if (movies.length && this.movie && movie.id === this.movie.id) {
        return;
      }
      const index = movies.findIndex(item => item.id === movie.id);
      this.index = index;
      if (this.size) {
        this.movie = movie;
        this.scrollLeft = this.size * index;
      } else {
        this.calcSize().then(size => {
          this.movie = movie;
          this.size = size;
          this.scrollLeft = size * index;
        });
      }
      this.$emit("selectMovie", movie);
    },
    // 计算节点大小
    calcSize() {
      return new Promise((resolve, reject) => {
        const elem = document.querySelector("#item1");
        const width =
          elem.getBoundingClientRect().right -
          elem.getBoundingClientRect().left;
        const margin = window.getComputedStyle(elem, null)["margin-left"];
        const size = width + parseFloat(margin.replace("px", ""));
        resolve(size);
      });
    }
  }
};
</script>

<style lang='scss'>
.swiper-container {
  position: relative;
  width: 100%;
  height: 350px;
  display: inline-block;
  .post-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    filter: blur(12px);
    background-position-y: 40%;
  }
  .post-bg-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #40454d;
    opacity: 0.55;
  }
}

.scroll-view_H {
  flex-wrap: nowrap;
  overflow: auto;
  width: 100%;
  overflow: hidden;
  overflow: auto;
}

.movie-item {
  display: inline-block;
  width: 156px;
  margin: 50px 0 40px 40px;
  transition: all 0.6s;
  &:first-child {
    margin-left: calc(50vw - 78px);
  }
  &:last-child {
    margin-right: calc(50vw - 78px);
  }
  .post {
    width: 156px;
    height: 228px;
    transition: transform 0.3s;
  }
  > .select {
    position: relative;
    transform: scale(1.15);
    border: 2px solid #fff;
    &::after {
      content: "";
      position: absolute;
      bottom: -14px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 10px;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMwODIyNEEwNTkwRDExRTZBNkMwOTE1NDA0RjA5MDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMwODIyNEExNTkwRDExRTZBNkMwOTE1NDA0RjA5MDA3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzA4MjI0OUU1OTBEMTFFNkE2QzA5MTU0MDRGMDkwMDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzA4MjI0OUY1OTBEMTFFNkE2QzA5MTU0MDRGMDkwMDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kjYk3AAAAVUlEQVR42qzMMQ7AIAwEwSvy8P25EwokZNkYCFcgCu/IzLB7Q9+jS2gz1MG/KN0ZwVOU0fDgLorvI3AVJWozsELJuhmYocyaCvQo1f2jeiT/cK8AAwBzvH2t7aaajQAAAABJRU5ErkJggg==");
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
