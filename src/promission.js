import router from './router.js'
import {get } from './utils/http.js'
const _import = require('./utils/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layout from '@/views/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import AppMain from '@/views/layout/components/AppMain'
import { getlocalStorageItm, savelocalStorageItem } from './utils/common'

const whiteList = ["/login"]; // 不重定向白名单
var getRouter //用来获取后台拿到的路由


router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = getlocalStorageItm('access_token');
        if (token) {
            //已经登陆
            if (!getRouter) { //不加这个判断，路由会陷入死循环
                if (!getlocalStorageItm('router')) {
                    get('role/getAuthByToken', { access_token: token }).then(res => {
                        getRouter = JSON.parse(res.data.data) //后台拿到路由
                        savelocalStorageItem('router', getRouter) //存储路由到localStorage
                        routerGo(to, next) //执行路由跳转方法
                    })
                } else { //从localStorage拿到了路由
                    getRouter = getlocalStorageItm('router') //拿到路由
                    routerGo(to, next)
                }
            } else {
                next()
            }
        } else {
            next({ path: '/login', component: _import('login/index') });
        }
    }
})


function routerGo(to, next) {
    getRouter = filterAsyncRouter(getRouter) //过滤路由
    console.log(getRouter);
    router.addRoutes(getRouter) //动态添加路由
    global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
    next({
        ...to,
        replace: true
    })
}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.hidden !== "true") {
            if (route.component) {
                if (route.component === 'Layout') { //Layout组件特殊处理
                    //一级菜单需要layout以及layout包含的appmain中的router-view
                    route.component = Layout
                } else {
                    route.component = _import(route.component)
                }
            }else{
                //二级菜单没有配置route.compont属性，需要指定一个router-view
                route.component = AppMain;
            }
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children)
            }
            return true
        }
    })
    return accessedRouters
}