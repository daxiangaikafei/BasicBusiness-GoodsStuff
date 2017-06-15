<template>
	<div class="commend">页面跳转中，请稍后...</div>
</template>
<script>
import ajax from '../../config/ajax'
import ApiControl from '../../config/envConfig.home'
import utils from '../../config/utils'
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
				treasure: '#/treasure'
			}
		}
	},
	created() {
		//发送初始化请求，若已登出，重新发起微信授权登录请求，页面跳转至微信授权页面
		var page = this.$route.query.pageType;
		var code = window.location.href.split('code=')[1].split('&state')[0];
		console.log('page is: ' + page + ';code is: ' + code);
		//将code传至后台进行下一步授权登录操作，成功返回后，根据pageType跳转至对应的原始页面
		ajax('POST', ApiControl.getApi(env, "login"), {
		    code: code
		}).
		then(res => {
		    if(res.code == 1){
		    	window.location.href = this.pageRouter[page];
		    }
		})
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