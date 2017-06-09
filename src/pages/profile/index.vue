<!-- 个人中心页面 -->
<template>
	<div class="index_main">
		<!--用户信息 start-->
		<div class="index_info">
			<div class="info_logo">
				<img src="../../static/images/logo.jpg" />
			</div>
			<div class="info_name">	
				<h3>青春的柠檬</h3>
				<p>ID:6575223</p>
			</div>
		</div>
		<!--用户信息 end-->
		<div class="index_list">
			<div class="list_title">
				<h3>积分可以兑换集分宝</h3>
				<span>了解集分宝
				<i class="icon_right"></i>
				</span>
			</div>
			<div class="list_item">
				<span class="list_icon icon_order"></span>
				<h3>我的订单</h3>
				<span><i class="icon_right"></i></span>
			</div>
			<div class="list_item" v-on:click='pop'>
				<div class="list_icon icon_eye"></div>
				<h3>浏览足迹</h3>
				<span>查看全部<i class="icon_right"></i></span>
			</div>
			<div class="list_item" v-on:click='pop'>
				<div class="list_icon icon_invite"></div>
				<h3>邀请有奖</h3>
				<span>邀请<i class="icon_right"></i></span>
			</div>
			<div class="list_item" v-on:click='pop'>
				<div class="list_icon icon_member"></div>
				<h3>会员特权</h3>
				<span>查看<i class="icon_right"></i></span>
			</div>
		</div>
		<transition name="router-fade" mode="out-in">
    	<div class="modal" v-if="pastle">功能正在开发~</div>
    </transition>
	</div>
</template>
<script>

	export default {
	data(){
        return{
            pastle:false
        }
    },
    created(){
       
    },
    methods:{
    	pop:function(){
    		this.pastle = true;
    		var _vue = this;
    		setTimeout(function(){
    				_vue.pastle = false;
    		},2000)
    	}
    },
    mounted(){
        
    }
}
	 
	   

</script>
<style lang="less">
body{
  height: 100%;
  line-height: 100%;
  background: #ececec;
  font-family:'PingFangSC-Regular';

	.index_main{
	  height: 100%;
	  line-height: 100%;
	  background: #ececec;
	  width: 100%;
	  float: left;
	
		.index_info{
			width: 100%;
			height: 90px;
			line-height: 90px;
			vertical-align: middle;
			background-color: #fff;
			float: left;

			.info_logo{
				height: 100%;
				float: left;
				padding: 0px 15px;

				img{
					width: 50px;
					height: 50px;
					display:inline-block;
					border-radius: 50%;
					-webkit-border-radius:50%;
					background-color: #ccc;
					margin:20px 0px;
				}
			}
			.info_name{
				float: left;
				line-height: 100%;
				vertical-align: middle;
				margin: 20px 0px;

			  h3{
			  color: #333333;
				font-size: 15px;
				line-height:1.8;
			  }

			  p{
			  color: #666666;
				font-size: 13px;
				line-height:1.8;
			  }
			}

		}
		
		.index_list{
			float: left;
		  width: 100%;
		  margin-top: 5px;
		  background: #fff;

		  .list_title{
				height: 57px;
				line-height: 57px;
				vertical-align: middle;
				padding: 0px 15px;
				border-bottom: 1px solid #ececec;

				h3{
					color: #35353f;
					font-size: 15px;
					float: left;
				}

				span{
					float: right;
					font-size: 13px;
					color: #666666;
					height: 57px;
				}
				.icon_right{
					width: 8px;
					height: 14px;
					line-height: 14px;
					vertical-align: middle;
					background-image: url(../../static/images/icon_rt.jpg);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				  margin-left: 8px;
    			margin-top: -3px;
				}
			}

			.list_item{
				height: 49px;
				line-height: 49px;
				vertical-align: middle;
				border-bottom: 1px solid #ececec;
				padding: 0px 15px;

				.list_icon{
					width: 26px;
					height: 26px;
					display: inline-block;
					background-repeat: no-repeat;
					background-size: 100% 100%;
				  margin-top: 10px;
				  margin-bottom: 10px;
				  float: left;
				}

				.icon_order{
					background-image: url(../../static/images/icon_order.png);
				}
				.icon_eye{
					background-image: url(../../static/images/icon_eye.png);
				}
				.icon_invite{
						background-image: url(../../static/images/icon_invite.png);
				}
				.icon_member{
						background-image: url(../../static/images/icon_member.png);
				}
				.icon_right{
						width: 8px;
						height: 14px;
						line-height: 14px;
						vertical-align: middle;
						display: inline-block;
						background-image: url(../../static/images/icon_rt.jpg);
						background-repeat: no-repeat;
						background-size: 100% 100%;
					  margin-left: 8px;
					  margin-top: -3px;
				}
			  span{
					color: #666;
					font-size: 13px;
					float: right;
				}
				h3{
				  color: #35353f;
				  font-size: 15px;
				  float: left;
				  margin-left: 10px;
				}
			}
		}

			.modal {
        font-size: 15px;
        position: fixed;
        top: 55%;
        width: 50%;
        height: 75px;
        text-align: center;
        background: rgba(0, 0, 0, 0.53);
        color: #fff;
        padding: 30px;
        left: 25%;
        border-radius: 5px;
    }

	}
}
</style>