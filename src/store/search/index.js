import { reqSearchInfo } from "@/api"


let state = {
    searchInfo: {}

}
let actions = {
    async getSearchInfo({ commit }, params = {}) {
        let result = await reqSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHINFO", result.data)
        } else {
            console.log(result.code, result.msg)
        }

    }
}
let mutations = {
    GETSEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo
    }

}
let getters = {
    //这里的state是search模块的，不是vuex全局的
    attrsList(state) {
        //如果网络延迟，导致searchInfo为空对象，这里或上一个空数组
        return state.searchInfo.attrsList||[]
    },
    goodsList(state) {
        return state.searchInfo.goodsList||[]
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList||[]
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
