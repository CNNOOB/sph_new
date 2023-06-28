import { sendCode,userRegister,reqUserInfo,userLogin,userLogout } from "@/api"


let state = {
    code: '',
    token:localStorage.getItem('TOKEN'),
    nickName:''

}
let actions = {
    async getCode({ commit }, phone) {
        let result = await sendCode(phone)
        if (result.code == 200) {
            commit("GETCCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    async register({commit},data){
        let result = await userRegister(data)
   
        if(result.code==200){
            return 'ok'
        }else{
           return  Promise.reject(new Error(result.message))
        }
    },
    async userLogin({commit},data){
        let result = await userLogin(data)
        if(result.code == 200){
            commit('SET_TOKEN',result.data.token)
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('SET_USERINFO',result.data.nickName)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    async userLogout({commit}){
        let result = await userLogout()
        if(result.code==200){
            commit('CLEAR')
        }else{
            return Promise.reject(new Error(result.message))
        }
    }
}
let mutations = {
    GETCCODE(state, code) {
        state.code = code
    },
    SET_TOKEN(state,token){
        state.token = token
    },
    SET_USERINFO(state,nickName){
        state.nickName = nickName
    },
    CLEAR(state){
        state.nickName = ''
        state.token = ''
        localStorage.removeItem('TOKEN')
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
