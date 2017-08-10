<!-- 合伙人规则页面 -->
<template>
	<div class="rules">
		<div class="rules-container">
			<div class="rules-title">【好物合伙人介绍】</div>
			<div class="rules-subtitle">
				好物合伙人的含义，即是自愿成为我有好物的推广大使，达到相应门槛后，能享受推广过程中成交订单金额对应比例的分成收益。成为合伙人的条件仅仅是年满18岁，无需任何成本。	
			</div>
			<div class="rules-detail">
				<div class="rules-item-first">
					<div class="rules-icon"> 
						<img src="../../static/images/partner/first.jpg"/>
					</div>
					<div class="rules-context">成为合伙人，有权为我有好物推荐顾客，即注册用户。过程非常简单，合伙人拥有自己的微信二维码，对方用微信扫描你的二维码，顾客按提示操作加入即可。从此该顾客通过我有好物购买成功的订单，你即可获得其消费金额对应佣金的分成收益。</div>
				</div>
				<div class="rules-item-first">
					<div class="rules-icon"> 
						<img src="../../static/images/partner/second.png"/>
					</div>
					<div class="rules-context">如果你推荐的顾客也成为了好物合伙人，那么他推荐的顾客，通过我有好物下单后，我们对你也会有部分佣金奖励哦。所以自己成为合伙人后，记得教你的朋友一起加入成为合伙人哦。</div>
				</div>
				<div class="rules-item-first">
					<div class="rules-icon"> 
						<img src="../../static/images/partner/third.png"/>
					</div>
					<div class="rules-context">下面就是不同等级对应的分佣比例，合伙人等级越高对应的收益比例也就越高，而升级的考核标准是合伙人活跃分，活跃分将会从邀请用户数、用户下单数、用户下单金额这些维度来进行计算，当然自己下单的也算在其中哦，还有每日签到也会增加活跃分。可以在合伙人的界面中查看自己的活跃分哦。除了自己用我有好物，记得推荐给朋友用哦，这样大家都能省钱。</div>
				</div>
			</div>
		</div>
		<router-link :to="'/home'" class="to-partner" v-if="showBanner == 1">
			申请成为合伙人
		</router-link>
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
				showBanner: 0
			}
    },
    created:function(){
     	this.showBanner = this.$route.query.type;
     	document.title = "我有好物 - 申请合伙人"
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
  .rules{
  	background: #fff;
  	padding-bottom: 20px;
  	.rules-container{
  		.rules-title{
  			text-align: center;
  			font-size: 20px;
  			font-weight: bold;
  			color: #000;
  			padding-top: 20px;
  			padding-bottom: 20px;
  		}
  		.rules-subtitle{
  			background: rgb(255,248,229);
  			font-size: 11px;
  			color: #4f4345;
  			padding: 5px 20px 20px 20px;
  			line-height: 16px;
  		}
  		.rules-detail{
  			padding: 20px;
  			.rules-icon{
  				display: inline-block;
  			}
  			.rules-context{
  				display: inline-block;
  				width: 95%;
  				float: right;
  			}
  			.rules-item-first{
  				overflow: hidden;
  				padding-bottom: 20px;
  				font-size: 13px;
  			}
  		}
  	}
  	.to-partner{
  		background: rgb(243,33,77);
  		height: 50px;
  		line-height: 50px;
  		color: #fff;
  		text-align: center;
  		position: fixed;
  		bottom: 0;
  		width: 100%;
  	}
  }
	
}
</style>