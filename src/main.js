// ie兼容
import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import '@/utils/global'//全局
import './promission'//这里进行路由后台获取的模拟
import {get,post,patch,put} from './utils/http.js'
import {Form,Input,Button,Select,Icon,Checkbox,Message,Menu,Layout,Card,Table,Row,Col} from 'ant-design-vue'

Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Message);
Vue.use(Menu);
Vue.use(Layout);
Vue.use(Card);
Vue.use(Table);
Vue.use(Row);
Vue.use(Col);

Vue.config.devtools = true
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
