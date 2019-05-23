import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/index'

Vue.use(Router)
var constantRouterMap=[{
path:"/login",
component:Login
}]

export default new Router({
  routes: constantRouterMap
 
})
