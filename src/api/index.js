import requests from "./requests";
import mockRequests from './mockRequests'

export const reqCategory = () => {
     return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}

export const reqBanner = () => {
     return mockRequests({ method: 'get', url: '/banner' });
}

export const reqFloor = () => {
     return mockRequests({ method: 'get', url: '/floor' });
}
export const reqSearchInfo = (params) => {
     return requests({ method: 'post', url: '/list', data: params });
}
export const reqGoodsInfo = (skuId) => {
     return requests({ method: 'get', url: `/item/${skuId}` });
}
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
     return requests({ method: 'post', url: `/cart/addToCart/${skuId}/${skuNum}` })
}
export const reqCartList = () => {
     return requests({ method: 'get', url: '/cart/cartList' })
}
export const deleteCartListById = (skuId)=>{
     return requests({method:'delete',url:`/cart/deleteCart/${skuId}`})
}
export const updatedCheckedById = (skuId,isChecked)=>{
     return requests({method:'get',url:`/cart/checkCart/${skuId}/${isChecked}`})
}
export const sendCode = (phone)=>{
     return requests({method:'get',url:`/user/passport/sendCode/${phone}`})
}
export const userRegister = (data)=>{
     return  requests({ method: 'post', url: `/user/passport/register`,data:data })
}
export const userLogin  = (data)=>{
     return requests({method:'post',url:`/user/passport/login`,data:data})
}
export const reqUserInfo = ()=>{
     return requests({method:'get',url:`/user/passport/auth/getUserInfo`})
}
export const userLogout = ()=>{
     return requests({method:'get',url:`/user/passport/logout`})
}
export const reqUserAddress = ()=>{
     return requests({method:'get',url:`/user/userAddress/auth/findUserAddressList`})
}