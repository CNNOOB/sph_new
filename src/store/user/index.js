import { sendCode,userRegister } from "@/api"


let state = {
    code: ''

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
        console.log(result)
        if(result.code==200){
            return 'ok'
        }else{
           return  Promise.reject(new Error(result.message))
        }
    }
}
let mutations = {
    GETCCODE(state, code) {
        state.code = code
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
