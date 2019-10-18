<template>
  <div class="container">
    <img class="logo" src="../assets/images/logo.png">
    <input type="phone" placeholder="请输入手机号" v-model="phone">
    <input type="password" v-model="password" placeholder="请输入密码">
    <div class="btn-warpper">
      <button @click="register">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      query:""
    };
  },
  created() {
    if(this.$storage.get('token')){
      this.$router.go(-1)
    }
    this.query = this.$route.query.redirect || ''
    this.$store.commit("changeTitle", "注册");
    this.$store.commit("IsBackPage");
  },
  methods: {
    goLogin(arr, phone, password) {
      arr.push({ phone: phone, password: password });
      this.$storage.set("users", arr);
      this.$router.push(`/auth/login?redirect=${this.query}`);
    },
    register() {
      const { phone, password } = this;
      let arr;
      let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (TEL_REGEXP.test(phone) && password.length >= 6) {
        if (!this.$storage.get("users")) {
          arr = [];
          this.$showToast("注册成功");
          setTimeout(() => {
            this.goLogin(arr, phone, password);
          }, 1000);
        } else {
          arr = this.$storage.get("users");
          arr.forEach(item => {
            if ((item.phone = phone)) {
              this.$showToast("该账户已注册");
            } else {
              setTimeout(() => {
                this.goLogin(arr, phone, password);
              }, 1000);
            }
          });
        }
      }
      if (!TEL_REGEXP.test(phone)) {
        this.$showToast("请输入正确的手机号");
      }
      if (password.length < 6) {
        this.$showToast("密码不得小于6位");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  height: 200px;
  width: 200px;
  display: block;
  margin: 200px auto 60px;
}
input {
  padding: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #d6d6d6;
  margin-left: 40px;
  width: 90%;
}
.btn-warpper {
  margin: 50px 30px;
  button {
    margin: 0;
    text-align: center;
    height: 80px;
    padding: 15px;
    border-radius: 20px;
    color: #fff;
    border: 0;
    background-color: #df2d2d;
    font-size: 40px;
    vertical-align: middle;
    line-height: 48px;
    box-sizing: border-box;
    background-color: #df2d2d;
    width: 100%;
  }
  .button-hover {
    background: #df2d2d;
    color: #fff;
  }
}
</style>
