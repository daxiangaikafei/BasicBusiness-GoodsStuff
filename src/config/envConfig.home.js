var _defaultApi = {
    debug: {
        couponList: 'http://192.168.132.44:8081/goods/goodsCoupon/couponList',
        couponDetail: 'http://192.168.132.44:8081/goods/couponDetail',
        categoryList: 'http://192.168.132.44:8081/goods/categoryList',
        checkLogin: 'http://192.168.132.44:8081/goods/user/checkLogin',
        login: 'http://192.168.132.44:8081/goods/user/login',
        getMyOrder: 'http://192.168.132.44:8081/goods/user/order/myorder',
        submitOrder: 'http://192.168.132.44:8081/goods/user/order/submitOrderNo',
        getUserInfo: '/user/userinfo/'
    },
    product: {
        couponList: '/tr1/api/item/goodsCoupon/couponList',
        couponDetail: '/tr1/api/item/couponDetail',
        categoryList: '/tr1/api/item/goodsCoupon/catogry/all',
        checkLogin: '/tr1/api/item/user/checkLogin',
        login: '/tr1/api/item/user/login',
        getMyOrder: '/tr1/api/item/user/order/myorder',
        submitOrder: '/tr1/api/item/user/order/submitOrderNo',
        getUserInfo: '/tr1/api/item/user/userinfo'
    }
}
module.exports = {
    getApi: function(env,name){
        var type = env == 'product' ? env : 'debug'
        return _defaultApi[type][name]
    }
}