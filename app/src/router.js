import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'movie' }
    },
    {
      path: '/movie',
      name: 'movie',
      component: () => import('./views/movie.vue')
    },
    {
      path: '/city-select',
      name: 'city-select',
      component: () => import('./views/city-select.vue')
    },
    {
      path:'/search-page/:stype',
      name:'search-page',
    },
    { path: '*',
      name: 404, 
      component: () => import('./views/404.vue') 
    }
  ],
});
