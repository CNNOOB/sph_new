import { reqCartList,deleteCartListById,updatedCheckedById} from "@/api"
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
    async deleteCartList({commit},skuId){
        let result = await deleteCartListById(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async updatedChecked({commit},{skuId,isChecked}) {
        let result = await updatedCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //遍历数组，isChecked为1的全部删除
    deleteAllCartList({state,dispatch}){
        let promiseAll = []
        state.cartInfo[0].cartInfoList.forEach(item => {
            if(item.isChecked==1){
                let promise = dispatch('deleteCartList',item.skuId)
                promiseAll.push(promise)
            }
        });
        return Promise.all(promiseAll)
    },
    updatedCheckedAll({state,dispatch},isChecked){
        let promiseAll =[]
        state.cartInfo[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updatedChecked',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }

   
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
