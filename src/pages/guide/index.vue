<!-- 合伙人规则页面 -->
<template>
	<div class="guides">
		<div class="guides-container">
        <p>先关注【我有好物】公众微信账号</p>
        <p>在微信公众号内，点击"我的"</p>
        <p>即可查询订单返利</p>
        
        <router-link :to="'/home'" class="to-partner">
          朕知道了
        </router-link>
		</div>
		
	</div>
</template>
<script>
var env = 'product';// set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
	export default {
	name: 'profile',
	data(){
			return {
			}
    },
    created:function(){
     	document.title = "用户中心"
    },
    methods:{
    },
    computed:{
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
body{
  height: 100%;
  font-family:'PingFangSC-Regular';
  .guides{
  	background: #fff;
  	.guides-container{
      width: 80%;
      margin: 0 auto;
      text-align: center;
      padding-top:100px;
      p{
        margin-bottom: 10px;
      }
      .to-partner{
        background: #f3214d;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
        width: 100%;
        display: block;
        margin-top: 50px;
        border-radius: 8px;
      }
  	}
  	
  }
	
}
</style>