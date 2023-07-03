import Vue from 'vue'
import VueRouter  from 'vue-router'
import routes from './routes'
import stroe from '@/store'
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

const router =  new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y:0}
    }
})

router.beforeEach(async (to,from,next)=>{
    let token = stroe.state.user.token
    let nickName = stroe.state.user.nickName
    if(token){
        if(to.path=='/login'){
            next('/home')
        }else{
            //vuex中没有用户信息则去获取，有则放行
            if(!nickName){
                try {
                    await stroe.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token存在，但是getUserInfo获取失败，视为token过期了
                    await stroe.dispatch('userLogout')
                    next('/login')
                }
            }else{
               next()
            }
        }
    }else{
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/center')!=-1||toPath.indexOf('/pay')!=-1){
            next('/login?redirect='+toPath)

        }else{
            next()
        }
    }
})

export default router