import Vue from 'vue';
import router from './router/router';
import App from './components/App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

