import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'



Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
// let result = reqSearchInfo({})
// result.then(res=>{
//   console.log(res.code,res.data)
// })
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
