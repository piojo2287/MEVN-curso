import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/Home.vue';
import AboutView from '../views/About.vue';
import Contacts from '../views/Contactos.vue';
import Patients from '../views/Pacientes.vue';
import Turns from '../views/Turnos.vue';
import Calendar from '../views/Calendar.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            //component: HomeView
            component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/contactos',
            name: 'contactos',
            component: Contacts
        },
        {
            path: '/pacientes',
            name: 'pacientes',
            component: Patients
        },
        {
            path: '/turnos',
            name: 'turnos',
            component: Turns
        },
        {
            path: '/calandario',
            name: 'calendario',
            component: Calendar
        }
    ]
})