import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import  ShopCart from '@/pages/ShopCart'
import  Trade from '@/pages/Trade'
import  Pay from '@/pages/Pay'
import  PaySuccess from '@/pages/PaySuccess'

export default
    [
        {
            path:'/home',
            component:Home,
            meta:{
                //控制footer组件的展示、隐藏
                show:true
            }
        },
        {
            name:'search',
            // 在占位时，后面加一个？，代表该params参数可传可不传。如果没加？，又没传，会导致URL错误
            path:'/search/:keyword?',
            component:Search,
            meta:{
                show:true
            }
        },
        {
            name:'detail',
            // 在占位时，后面加一个？，代表该params参数可传可不传。如果没加？，又没传，会导致URL错误
            path:'/detail/:id?',
            component:Detail,
            meta:{
                show:true
            }
        },
        {
            name:'addcartsuccess',
            path:'/addcartsuccess',
            component:AddCartSuccess,
            meta:{
                show:true
            }
        },
        {
            name:'shopcart',
            path:'/shopcart',
            component:ShopCart,
            meta:{
                show:true
            }
        },
        {
            name:'trade',
            path:'/trade',
            component:Trade,
            meta:{
                show:true
            }
        },
        {
            name:'pay',
            path:'/pay',
            component:Pay,
            meta:{
                show:true
            }
        },
        {
            name:'paySuccess',
            path:'/paySuccess',
            component:PaySuccess,
            meta:{
                show:true
            }
        },
       
        {
            path:'/register',
            component:Register,
            meta:{
                show:false
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                show:false
            }
        },
        {
            path:'/*',
            component:Home,
            meta:{
                show:true
            }
        }

    ]
