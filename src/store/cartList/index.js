import { reqCartList } from "@/api"
import {getUserUUID} from '@/utils/USER_ID'



let state = {
    cartInfo: [],
    USER_ID:getUserUUID()

}
let actions = {
    async getCartList({ commit } ) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        } 
    },
   
}
let mutations = {
    GETCARTLIST(state, cartInfo) {
        state.cartInfo = cartInfo
    }

}
let getters = {
    //这里的state是search模块的，不是vuex全局的
    shopCartInfo(state){
        return state.cartInfo[0]||{}
    }
  
}

export default {
    state,
    actions,
    mutations,
    getters
}
