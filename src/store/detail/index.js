import { reqGoodsInfo } from "@/api"


let state = {
    goodsInfo: {}

}
let actions = {
    async getGoodsInfo({ commit }, skuId ) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit("GETGOODSINFO", result.data)
        } 
    }
}
let mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }

}
let getters = {
    //这里的state是search模块的，不是vuex全局的
   categoryView(state){
    return state.goodsInfo.categoryView||{}
   },
   skuInfo(state){
    return state.goodsInfo.skuInfo||{}
   },
   spuSaleAttrList(state){
    return  state.goodsInfo.spuSaleAttrList||[]
   }
}

export default {
    state,
    actions,
    mutations,
    getters
}
