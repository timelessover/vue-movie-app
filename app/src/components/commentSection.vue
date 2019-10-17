<template >
  <div class="commentSection">
    <div>
      <img :src="comment.avatarurl" class="avatar">
    </div>
    <div class="left">
      <div class="nickName">
        <span>{{comment.nick||comment.nickName}}</span>
        <span v-if="comment.purchase" class="buy">购</span>
      </div>
      <div class="stars">
        <img class="movie-star" v-for="(item,index) in comment.stars" :key="index" :src="item">
      </div>
      <div class="content">{{comment.content}}</div>
      <div class="comment-footer">
        <div class="comment-time">{{comment.calcTime}}</div>
        <div class="approve">
          <span class="iconfont icon-zan1"></span>
          <span>{{comment.approve ? comment.approve : '赞'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object
    }
  }
};
</script>

<style lang='scss' scpoed>
.commentSection {
  display: flex;
  padding: 30px 0 0 30px;
  color: #555;
  .stars {
    margin-top: 10px;
    line-height: 12px;
    .movie-star {
      width: 22px;
      height: 22px;
      margin-right: 3px;
    }
    &:last-child .left {
      border: none;
    }
  }
}

.avatar {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}

.left {
  flex-grow: 1;
  margin-left: 40px;
  padding-right: 30px;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 30px;
}

.nickName {
  font-size: 24px;
  color: #444;
}

.buy {
  display: inline-block;
  border-radius: 2px;
  color: #fff;
  background: #f90;
  font-size: 22px;
  margin-left: 5px;
  padding: 1px 2px;
}

.content {
  font-size: 30px;
  margin: 20px 0;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: #999;
}
.approve {
  .icon-zan1 {
    font-size: 24px;
    margin-right: 5px;
  }
}
</style>
