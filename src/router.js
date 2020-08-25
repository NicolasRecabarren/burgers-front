import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Burguers from './views/Burguers.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/hamburguesas',
      name: 'hamburguesas',
      component: Burguers,
    },
  ],
});
