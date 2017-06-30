var _defaultApi = {
    debug: {
        couponList: 'http://192.168.132.44:8081/goods/goodsCoupon/couponList',
        couponDetail: 'http://192.168.132.44:8081/goods/couponDetail',
        categoryList: 'http://192.168.132.44:8081/goods/categoryList',
        checkLogin: 'http://192.168.132.44:8081/goods/user/checkLogin',
        login: 'http://192.168.132.44:8081/goods/user/login',
        getMyOrder: 'http://192.168.132.44:8081/goods/user/order/myorder',
        submitOrder: 'http://192.168.132.44:8081/goods/user/order/submitOrderNo',
        getUserInfo: 'http://192.168.132.44:8081/goods/user/getUserInfo',
        getAppId: 'http://192.168.132.44:8081/goods/appid'
    },
    product: {
        couponList: 'api/item/goodsCoupon/couponList',
        couponDetail: 'api/item/goodsCoupon/couponDetail',
        categoryList: 'api/item/goodsCoupon/catogry/all',
        checkLogin: 'api/item/user/checkLogin',
        login: 'api/item/user/login',
        getMyOrder: 'api/item/user/order/myorder',
        submitOrder: 'api/item/user/order/submitOrderNo',
        getUserInfo: 'api/item/user/getUserInfo',
        getAppId: 'api/item/weixin/info'
    }
}
module.exports = {
    getApi: function(env,name){
        var type = env == 'product' ? env : 'debug'
        return _defaultApi[type][name]
    }
}