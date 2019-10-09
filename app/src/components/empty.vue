<template>
	<div class="empty">
		<img src="../assets/images/nothing.png" class="empty-img">
		<div class="empty-text">{{message}}</div>
	</div>
</template>

<script>
export default {
  name: "empty",
  props: {
    message: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.empty {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .empty-img {
    width: 174px;
    height: 200px;
    margin-bottom: 16px;
  }

  .empty-text {
    font-size: 32px;
    color: #999;
  }
}
</style>
