import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { Button,MessageBox } from 'element-ui';


Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    
  },
  mounted(){
    // console.log(this)
  }
}).$mount('#app')
