<template>
	<div>test</div>
</template>
<script>
import ajax from '../../config/ajax'
import utils from '../../config/utils'
export default {
	name: 'login',
	data () {
		return {
			pageRouter: {
				home: '/home',
				detail: '/detail',
				order: '/order',
				profile: '/profile',
				stuff: '/stuff',
				treasure: '/treasure'
			}
		}
	},
	created() {
		//发送初始化请求，若已登出，重新发起微信授权登录请求，页面跳转至微信授权页面
		var page = this.$route.query.pageType;
		var code = this.$route.query.code;
		//将code传至后台进行下一步授权登录操作，成功返回后，根据pageType跳转至对应的原始页面

		// window.location.href = this.pageRouter[page];
	}
}
</script>npm 