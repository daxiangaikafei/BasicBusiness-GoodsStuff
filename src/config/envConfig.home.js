var _defaultApi = {
    debug: {
        couponList: 'http://192.168.132.44:8081/goods/goodsCoupon/couponList',
        couponDetail: 'http://192.168.132.44:8081/goods/couponDetail',
        activeGoodsDetail: 'http://192.168.132.44:8081/goods/activeGoodsDetail',
        categoryList: 'http://192.168.132.44:8081/goods/categoryList',
        checkLogin: 'http://192.168.132.44:8081/goods/user/checkLogin',
        login: 'http://192.168.132.44:8081/goods/user/login',
        getMyOrder: 'http://192.168.132.44:8081/goods/user/order/myorder',
        submitOrder: 'http://192.168.132.44:8081/goods/user/order/submitOrderNo',
        getUserInfo: 'http://192.168.132.44:8081/goods/user/getUserInfo',
        getAppId: 'http://192.168.132.44:8081/goods/appid',
        pointDetail: 'http://192.168.132.44:8081/goods/pointList',
        exchangeList: 'http://192.168.132.44:8081/goods/exchangeList',
        exchangeSubmit: 'http://192.168.132.44:8081/goods/exchangeSubmit',
        setAlipay: 'http://192.168.132.44:8081/goods/setAlipay',
	    getActiveGoods: 'http://192.168.132.44:8081/goods/goodsCoupon/activeGoods',
        getPartnerInfo: 'http://192.168.132.44:8081/goods/getPartnerInfo',
        partner: 'http://192.168.132.44:8081/goods/uc/partner/home',
        drawList: 'http://192.168.132.44:8081/goods/uc/point/drawing/list',
        submitDraw: 'http://192.168.132.44:8081/goods/uc/point/drawing/submit'
    },
    product: {
        couponList: 'api/item/goodsCoupon/couponList',//优惠券商品列表
        couponDetail: 'api/item/goodsCoupon/couponDetail',//商品详情
        activeGoodsDetail: 'api/item/goodsCoupon/activeGoodsDetail',//活动商品详情
        categoryList: 'api/item/goodsCoupon/catogry/all',//分类列表
        checkLogin: 'api/item/user/checkLogin',//校验是否登录
        login: 'api/item/user/login',//登录
        getMyOrder: 'api/item/user/order/myorder',//我的订单
        submitOrder: 'api/item/user/order/submitOrderNo',//提交订单
        getUserInfo: 'api/item/user/getUserInfo',//获取用户信息
        getAppId: 'api/item/weixin/info',//获取微信appId
        pointDetail: 'api/item/goods/pointList',//积分明细
        exchangeList: 'api/item/goods/exchangeList',//兑换明细
        exchangeSubmit: 'api/item/goods/exchangeSubmit',//兑换积分
        setAlipay: 'api/item/goods/setAlipay',//添加、修改支付宝账号
        getActiveGoods: 'api/item/goods/goodsCoupon/activeGoods',//活动商品列表
        getPartnerInfo: 'api/item/goods/getPartnerInfo',	//获取合伙人信息
        jsInfo: 'api/weixin/js/info/item?',
        uploadPartnerInfo: 'api/item/goods/uploadPartnerInfo',
        partner: 'api/item/goods/partner',
        drawList: 'api/item/point/drawing/list',
        submitDraw: 'api/item/point/drawing/submit'
    }
    // product: {
    //     couponList: 'http://txdy.tunnel.qydev.com/tr2/api/item/goodsCoupon/couponList',//优惠券商品列表
    //     couponDetail: 'http://txdy.tunnel.qydev.com/tr2/api/item/goodsCoupon/couponDetail',//商品详情
    //     categoryList: 'http://txdy.tunnel.qydev.com/tr2/api/item/goodsCoupon/catogry/all',//分类列表
    //     checkLogin: 'http://txdy.tunnel.qydev.com/tr2/api/item/user/checkLogin',//校验是否登录
    //     login: 'http://txdy.tunnel.qydev.com/tr2/api/item/user/login',//登录
    //     getMyOrder: 'http://txdy.tunnel.qydev.com/tr2/api/item/user/order/myorder',//我的订单
    //     submitOrder: 'http://txdy.tunnel.qydev.com/tr2/api/item/user/order/submitOrderNo',//提交订单
    //     getUserInfo: 'http://txdy.tunnel.qydev.com/tr2/api/item/user/getUserInfo',//获取用户信息
    //     getAppId: 'http://txdy.tunnel.qydev.com/tr2/api/item/weixin/info',//获取微信appId
    //     pointDetail: 'http://txdy.tunnel.qydev.com/tr2/api/item/goods/pointList',//积分明细
    //     exchangeList: 'http://txdy.tunnel.qydev.com/tr2/api/item/goods/exchangeList',//兑换明细
    //     exchangeSubmit: 'http://txdy.tunnel.qydev.com/tr2/api/item/goods/exchangeSubmit',//兑换积分
    //     setAlipay: 'http://txdy.tunnel.qydev.com/tr2/api/item/goods/setAlipay',//添加、修改支付宝账号
    //     getActiveGoods: 'http://txdy.tunnel.qydev.com/tr2/api/item/goods/goodsCoupon/activeGoods'//活动商品列表   
    // }
}
module.exports = {
    getApi: function(env,name){
        var type = env == 'product' ? env : 'debug'
        return _defaultApi[type][name]
    }
}