import Vue from 'vue';
import router from './router/router';
import App from './components/App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'

import 'vuetify/dist/vuetify.min.css'
//import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'

Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(DaySpanVuetify, {
    methods: {
      getDefaultEventColor: () => '#1976d2'
    }
 });

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

