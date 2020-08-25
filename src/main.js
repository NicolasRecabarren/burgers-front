import VueResource from 'vue-resource';
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import App from './App.vue';
import router from './router';

// Estilos para componentes de plugin bootstrap-vue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue); // Le indicamos a Vue que utilizaremos el plugin de bootstrap-vue.
Vue.use(IconsPlugin); // Le indicamos a Vue que utilizaremos los iconos de bootstrap-vue.

Vue.use(VueResource);


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
