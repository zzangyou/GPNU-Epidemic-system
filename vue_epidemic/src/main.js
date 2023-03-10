/**
 * 项目的入口文件它执行的时候都是从你的 main.js 从上到下的执行的
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import 'v-charts/lib/pie.common'
import '../theme/index.css'
import axios from 'axios'
import{futureAxios,Axios} from '../src/api/api'
Vue.use(VCharts)
Vue.use(ElementUi)


import  io from './components/socket/weapp.socket.io'
//套接字端口定义
Vue.prototype.socket=io('http://localhost:5200')

// 引用vue-socket.io
import VueSocket from 'vue-socket.io'
Vue.use(new VueSocket({
    debug: false,
    connection:'http://localhost:5200'
}))


Vue.prototype.socketpath="http://localhost:5200",

Vue.prototype.basePath="http://localhost:3000";
//引包http://192.168.0.22:999

axios.defaults.baseURL = 'http://localhost:3000';

//需要添加拦截器的
Vue.prototype.$axiosjwt = futureAxios
//不拦截的(不带token)往往用在vue创建前的生命周期中
Vue.prototype.$Axios = Axios

Vue.config.productionTip = false

window.vm  = new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    let type=localStorage.getItem('type')
    store.commit('addMenu',{router,type})
  }
}).$mount('#app')
