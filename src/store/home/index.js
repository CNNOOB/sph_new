import { reqCategory,reqBanner,reqFloor } from "@/api"


let state = {
    category:[],
    banner:[],
    floor:[],

}
let actions = {
    async getCategory(context,value){
       let result = await reqCategory()
       if(result.code == 200){
        context.commit("GETCATEGORY",result.data)
       }

    },
    async getBanner(context,value){
        let result = await reqBanner()
        if(result.code == 200){
         context.commit("GETBANNER",result.data)
        }
 
     },
     async getFloor(context,value){
        let result = await reqFloor()
        if(result.code == 200){
         context.commit("GETFLOOR",result.data)
        }
 
     }
}
let mutations = {
    GETCATEGORY(state,category){
        state.category = category
    },
    GETBANNER(state,banner){
        state.banner = banner
    },
    GETFLOOR(state,floor){
        state.floor = floor
    }

}
let getters = {}

export default{
    state,
    actions,
    mutations,
    getters
}
