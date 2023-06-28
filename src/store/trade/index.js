import { reqUserAddress,reqTradeOrder } from "@/api"


let state = {
    addressList:[],
    orderInfo:{}

}
let actions = {
    async getUserAddress({ commit }) {
       let result =  await reqUserAddress()
       if(result.code == 200){
        console.log(result)
        commit('GETADDRESS',result.data)
        
       }
    },
    async getorderInfo({ commit }) {
        let result =  await reqTradeOrder()
        if(result.code == 200){
         commit('GETORDERINFO',result.data)
         
        }
     }

}
let mutations = {
    GETADDRESS(state,addressList){
        state.addressList = addressList
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
let getters = {
   
}

export default {
    state,
    actions,
    mutations,
    getters
}
