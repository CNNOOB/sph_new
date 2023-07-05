import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { Button,MessageBox,Message } from 'element-ui';
import VueLazyload from 'vue-lazyload'
import loadimage from'@/assets/loading.gif'
import '@/plugins/validate'

// const loadimage = require('@/assets/loading.gif')

const errorimage = require('@/assets/error.webp')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})


Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)
console.log('main.js run!!!',new Date())


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$message = Message
    
  },
  mounted(){
    // console.log(this)
  }
}).$mount('#app')
