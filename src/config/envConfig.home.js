var _defaultApi = {
    debug: {
        couponList: 'http://192.168.132.44:8081/goods/goodsCoupon/couponList',
        couponDetail: 'http://192.168.132.44:8081/goods/couponDetail',
        categoryList: 'http://192.168.132.44:8081/goods/categoryList',
        checkLogin: 'http://192.168.132.44:8081/goods/user/checkLogin',
        login: 'http://192.168.132.44:8081/goods/user/login',
        getMyOrder: 'http://192.168.132.44:8081/goods/user/order/myorder',
        submitOrder: 'http://192.168.132.44:8081/goods/user/order/submitOrderNo'
    },
    product: {
        couponList: '/goodsCoupon/couponList',
        couponDetail: '/couponDetail',
        categoryList: 'goodsCoupon/catogry/all',
        checkLogin: '/user/checkLogin',
        login: '/user/login',
        getMyOrder: '/user/order/myorder',
        submitOrder: '/user/order/submitOrderNo'
    }
}
module.exports = {
    getApi: function(env,name){
        var type = env == 'product' ? env : 'debug'
        return _defaultApi[type][name]
    }
}