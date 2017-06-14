var _defaultBaseUri = {
    debug: {
        baseUri: 'http://txdy.tunnel.qydev.com/login?pageType='
    },
    product: {
        baseUri: 'http://txdy.tunnel.qydev.com/login?pageType='
    }
}
module.exports = {
    getLoginUri: function(env,name){
        var type = env == 'product' ? env : 'debug'
        return _defaultBaseUri[type][name]
    },
    getAppId: function(){
        return 'wxf83b631bccb522df'
    }
}
