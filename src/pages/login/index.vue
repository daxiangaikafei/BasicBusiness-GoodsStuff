<template>
	<div class="commend">页面跳转中，请稍后...{{message}}</div>
</template>
<script>
import ajax from '../../config/ajax'
import ApiControl from '../../config/envConfig.home'
import utils from '../../config/utils'
import getLoginUri from '../../config/loginConfig'
var env = 'product'
export default {
	name: 'login',
	data () {
		return {
			pageRouter: {
				home: '#/home',
				detail: '#/detail',
				order: '#/order',
				profile: '#/profile',
				stuff: '#/stuff',
				treasure: '#/treasure',
			},
			message: ''
		}
	},
	created() {
		var _vue = this;
		//发送初始化请求，若已登出，重新发起微信授权登录请求，页面跳转至微信授权页面
		var page = this.$route.query.pageType == '' ? 'home' : this.$route.query.pageType;
		var code = '';
		if(window.location.href.indexOf('code=') != -1){
			code = window.location.href.split('code=')[1].split('&state')[0];
		}
		//将code传至后台进行下一步授权登录操作，成功返回后，根据pageType跳转至对应的原始页面
		if(code != ''){
			_vue.$ajax.get(ApiControl.getApi(env, "login"), {
			    code: code
			}).
			then(res => {
				_vue.message = 'code is:' + res.data.code + ';message is:' + res.data.message;
			    if(res.data.code == 0){
			    	window.location.href = _vue.pageRouter[page];
			    }else if(res.data.code == 201){
			    	var redirectUri = window.location.origin + window.location.pathname + '/#login?pageType=' + page;
			    	redirectUri = encodeURIComponent(redirectUri);
			    	var appId = getLoginUri.getAppId();
			    	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
			    }
			})
		}
		
		// window.location.href = this.pageRouter[page];
	}
}
</script>
<style lang="less">
	.commend{
		position: absolute;
		top: 40%;
		left: 30%;
	}
</style>