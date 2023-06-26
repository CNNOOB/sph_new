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