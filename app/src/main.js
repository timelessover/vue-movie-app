import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/my-mint.scss';
import 'assets/reset.css';
import request from './utils/request';
// https://www.jianshu.com/p/bec7dbd5cdc6
import FastClick from 'fastclick';
FastClick.attach(document.body);

Vue.use(MintUI)

Vue.config.productionTip = false;
Vue.prototype.$http = request;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
