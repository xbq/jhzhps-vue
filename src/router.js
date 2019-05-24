import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/login/index.vue';

Vue.use(Router)
var constantRouterMap = [{
  path: "/login",
  component: Login
}]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})