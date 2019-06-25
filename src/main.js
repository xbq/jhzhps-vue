// ie兼容
import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import '@/utils/global'//全局
import './promission'//这里进行路由后台获取的模拟
import {get,post,patch,put} from './utils/http.js'
import echarts from 'echarts'
import {Form,inputNumber,Input,Button,Select,Icon,Checkbox,message,Menu,Layout,Card,Table,Row,Col,LocaleProvider,Spin,Modal,Carousel,DatePicker,Tabs} from 'ant-design-vue'

Vue.use(Form);
Vue.use(inputNumber);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Checkbox);
// Vue.use(message);
Vue.use(Menu);
Vue.use(Layout);
Vue.use(Card);
Vue.use(Table);
Vue.use(Row);
Vue.use(Col);
Vue.use(LocaleProvider);
Vue.use(Spin);
Vue.use(Modal);
Vue.use(Carousel);
Vue.use(DatePicker);
Vue.use(Tabs);
message.config({
  top: '50%',
  duration: 2, //默认延时
  maxCount: 3, //最多显示数，超出覆盖
})
Vue.config.devtools = true
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$echarts = echarts
Vue.prototype.$message = message


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
