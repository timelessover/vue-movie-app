<template>
    <div class="container">
        <img class="logo" src="../assets/images/logo.png">
        <input type="phone" placeholder="请输入手机号" v-model="phone">
        <input type="password" v-model="password" placeholder="密码">
        <div class="btn-warpper">
            <button @click="send">登陆</button>
        </div>
        <div class="tab-warpper">
            <div @click="goMovie" class="home">回到首页</div>
            <div @click="goRegtister" class="register">立即注册</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  created() {
    this.$store.commit("changeTitle", "登陆");
    this.$store.commit("IsBackPage");
  },
  methods: {
    send() {
      const { phone, password } = this;
      if (phone && password) {
        if (!this.$storage.get("users")) {
          this.$showToast("您还未注册", "", 1000);
        }
        const users = this.$storage.get("users") || [];
        users.forEach(item => {
          if (item.phone === phone && item.password === password) {
            this.$storage.set("token", "dsadsajlkjl");
            this.$router.push("/user");
          } else {
            this.$showToast("账号或密码有误", "", 1000);
          }
        });
      } else {
        this.$showToast("请填写账号和密码", "", 1000);
      }
    },
    goRegtister() {
      this.$router.push("/auth/register");
    },
    goMovie() {
      this.$router.push("/movie");
    }
  }
};
</script>

<style lang="scss">
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
  width:90%;
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
.register {
  text-align: center;
  color: #fe8c00;
}
.home {
  text-align: center;
  color: #fe8c00;
}
.tab-warpper {
  display: flex;
  justify-content: space-between;
  margin: 0 40px;
}
</style>
