import { reqUserAddress } from "@/api"


let state = {
    

}
let actions = {
    async getUserAddress({ commit }) {
       let result =  await reqUserAddress()
       if(result.code == 200){
        console.log(result)
       }else{
        console.log(result)
       }
    }
}
let mutatios = {
   
}
let getters = {
   
}

export default {
    state,
    actions,
    mutatios,
    getters
}
