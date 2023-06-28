import Vuex from 'vuex'
import Vue from 'vue'
import home from '@/store/home'
import search from '@/store/search'
import detail from '@/store/detail'
import cartList from '@/store/cartList'
import user  from '@/store/user'
import trade from '@/store/trade'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        cartList,
        user,
        trade

    }
})