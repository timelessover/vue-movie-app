import Vue from 'vue';
import Router from 'vue-router';
import { storage } from 'utils/storage'

Vue.use(Router);

const router = new Router({
  mode: 'hash',
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
      path: '/movie/buy-ticket',
      name: '购票',
      component: () => import('./views/buy-ticket.vue')
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
      path: '/movie/search-page',
      name: '搜索',
      component: () => import('./views/search-page.vue')
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
      name: '券',
      component: () => import('./views/cinema-detail.vue')
    },
    {
      path: '/cinema/snack-page',
      name: '零食',
      component: () => import('./views/snack-page.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/cinema/buy-snack',
      name: '购买零食',
      component: () => import('./views/buy-snack.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cinema/select-seat',
      name: '选择座位',
      component: () => import('./views/select-seat.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: '授权',
      component: () => import('./views/auth.vue'),
      children: [
        {
          path: 'login',
          name: '登陆',
          meta: { auth: true },
          component: () => import('./views/login.vue')
        },
        {
          path: 'register',
          name: '注册',
          meta: { auth: true },
          component: () => import('./views/register.vue')
        }
      ],
    },
    {
      path: '/user',
      name: '我的',
      meta: { navShow: true, requiresAuth: true },
      component: () => import('./views/user.vue'),

    },
    {
      path: '/my/snack-order',
      name: '我的零食',
      component: () => import('./views/snack-order.vue')
    },
    {
      path: '/my/movie-order',
      name: '我的电影',
      component: () => import('./views/movie-order.vue')
    },
    {
      path: '/my/movie-order-detail',
      name: '影券详情',
      component: () => import('./views/movie-order-detail.vue')
    },
    {
      path: '/my/about',
      name: '关于我',
      component: () => import('./views/about-page.vue')
    },
    {
      path: '*',
      name: 404,
      component: () => import('./views/404.vue')
    }
  ],
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!storage.get('token')) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }

})





export default router