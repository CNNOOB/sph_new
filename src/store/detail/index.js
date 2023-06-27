import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"


let state = {
    goodsInfo: {}

}
let actions = {
    async getGoodsInfo({ commit }, skuId ) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit("GETGOODSINFO", result.data)
        } 
    },
    async reqAddOrUpdateShopCart({commit},{skuId,skuNum}){
    
            let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        
            if(result.code==200){
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }

    },
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
