<!-- 我的订单页面 -->
<template>
	<div id="user_order">
		<div class="bind_order">
			<input class="bind_input" placeholder="粘贴绑定订单号"/>
			<button class="submit_order">提交</button>
		</div>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				orderList: []
			}
		}
	}
</script>
<style lang="less">
@import '../../static/style/common.less';
	html,body{
		background: #fff;
	}
	#user_order{
		.bind_order{
			width: 100vw;
			margin: 15px;
			height: 45px;
			display: flex;
			.bind_input{
				flex-grow: 1;
			}
			.submit_order{
				width: 100px;
				display: inline-block;
				background: rgb(252,91,31);
				border-radius: 0 5px 5px 0;
				text-align: center;
				line-height: 45px;
				font-size: 15px;
			}
		}
	}
</style>