import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/movie'
    },
    {
      path: '/movie',
      redirect: '/movie/hot',
      name: '电影',
      meta: { navShow: true },
      component: () => import('./views/movie.vue'),
      children: [
        {
          path: 'hot',
          name: '电影详情',
          component: () => import('./views/hot-movie.vue')
        },
      ],
    },

    {
      path: '/city-select',
      name: '城市选择',
      component: () => import('./views/city-select.vue')
    },
    {
      path: '/cinema',
      name: '影院',
      meta: { navShow: true },
      component: () => import('./views/cinema.vue')
    },
    {
      path: '/login',
      name: '登陆',
      component: () => import('./views/login.vue'),
      children: [
        {
          path: 'register',
          name: '注册',
          component: () => import('./views/cinema.vue')
        }
      ],
    },
    {
      path: '/user',
      name: '我的',
      meta: { navShow: true },
      component: () => import('./views/user.vue')
    },

    {
      path: '*',
      name: 404,
      component: () => import('./views/404.vue')
    }
  ],
});
