import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/my-vant.scss';
import 'assets/css/reset.css';
import 'assets/font/iconfont.css';
import {storage} from 'utils/storage'
import request from './utils/request';
// https://www.jianshu.com/p/bec7dbd5cdc6
import FastClick from 'fastclick';
FastClick.attach(document.body);


Vue.config.productionTip = false;
Vue.prototype.$http = request;
Vue.prototype.$storage = storage


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
