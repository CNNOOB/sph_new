import Vue from 'vue'
import VueRouter  from 'vue-router'
import routes from './routes'
//重写push、replace方法以解决编程式导航时，参数不变多次导航时的报错问题
let originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
       
        originalPush.call(this,location,resolve,reject)
    }else{
        // console.log('调用')
        // originalPush.call(this,location,()=>{},(error)=>{console.log(error)})
        // originalPush.call(this,location,()=>{},()=>{})
        originalPush.call(this,location).catch(error=>{
            // console.log('重复调用')
        })
    }
   
}


let originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originalReplace.call(this,location,resolve,reject)
    }else{
        originalReplace.call(this,location,()=>{},()=>{})
    }
   
}


Vue.use(VueRouter)

export default new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y:0}
    }
})