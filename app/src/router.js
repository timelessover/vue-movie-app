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
      component: () => import('./views/movie.vue'),
      children: [
        {
          path: 'hot',
          name: '热映',
          meta: { navShow: true },
          component: () => import('./views/hot-movie.vue')
        },
        {
          path: 'expected',
          name: '待映',
          meta: { navShow: true },
          component: () => import('./views/expected-movie.vue')
        },
      ],
    },
    {
      path: '/movie/movie-detail',
      name: '电影详情',
      component: () => import('./views/movie-detail.vue')
    },
    {
      path: '/movie/movie-detail/comment-detail',
      name: '电影评论',
      component: () => import('./views/comment-detail.vue')
    },
    {
      path: '/movie/movie-detail/video-page',
      name: '视频',
      component: () => import('./views/video-page.vue')
    },
    {
      path: '/movie/movie-detail/select-cinema',
      name: '选择影院',
      component: () => import('./views/select-cinema.vue')
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
      path: '/cinema/cinema-detail',
      name: '影院详情',
      component: () => import('./views/cinema-detail.vue')
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
