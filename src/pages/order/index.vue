<!-- 我的订单页面 -->
<template>
	<div class="index_main">

		<div class="index_form">
			<div class="index_bind">
					<input class="index_bind_text" type="text" id="" name="" placeholder="粘贴绑定订单号"/>
					<button class="index_submit">提交</button>
			</div>
		</div>
		<div class="index_ul">
			<ul>
				<li><a class="active">跟踪中</a></li>
				<li><a >待发放</a></li>
				<li><a class="active">已发放</a></li>
				<li><a >无效</a></li>
				<li><a class="active">全部</a></li>
			</ul>
		</div>
		<div id="index_order" style="display:none;">
			<img src="../../static/images/icon_null.png"/>
			<p>您还没有相关订单，快去逛逛吧</p>
		</div>
		<div class="index_main">
			<div class="index_thing">
				<em>待发放</em>
				<div class="index_img">
					<img src="../../static/images/thing.png"/>
				</div>
				<div class="index_txt">
					<p>滴露(健康沐浴露 柑橘沁爽950克 送 薄荷冰爽 350克 男女通用)</p>
					<span>￥168.9</span>
				</div>
			</div>
			<div class="index_thing">
				<em>待发放</em>
				<div class="index_img">
					<img src="../../static/images/thing.png"/>
				</div>
				<div class="index_txt">
					<p>滴露(健康沐浴露 柑橘沁爽950克 送 薄荷冰爽 350克 男女通用)</p>
					<span>￥168.9</span>
				</div>
			</div>
		</div>
		


	</div>
</template>
<script>
	export default {
		data(){
	        return{
	            
	        }
	    },
	    created(){
	       
	    },
	    mounted(){
	        
	    }
	}
</script>
<style lang="less">
body{
	margin:0px;
	padding:0px;
	font-family:'PingFangSC-Regular';
	background-color:#fff;
	.index_main{
		width: 100%;
    margin: 0 auto;
    text-align: center;
    float: left;
		.index_form{
			padding-top:15px;
			padding-bottom:18px;
			padding-left:15px;
			padding-right:15px;
			float:left;
			width:100%;
			.index_bind{
				width:100%;
				margin:0 auto;
				.index_bind_text{
				width:71%;
				height:44px;
				line-height:44px;
				border-top:1px solid #d2d2d2;
				border-bottom:1px solid #d2d2d2;
				border-left:1px solid #d2d2d2;
				color:#999999;
				font-size:13px;
				border-top-left-radius:5px;
				-webkit-border-bottom-left-radius:5px;
				padding-left:13px;
				float:left;

			}
			.index_submit{
				width:29%;
				height:44px;
				font-size:15px;
				color:#fff;
				float:left;
				background-color:#ff5a00;
				border-top-right-radius:5px;
				-webkit-border-bottom-right-radius:5px;
				float:left;
			}
			}
			
		}
		.index_ul{
				float:left;
				background-color: #f5f5f5;
				width:100%;
				display:flex;
				 	ul{
				 		float:left;
				 		background-color:#fff;
				 		margin-bottom:5px;
				 		width:100%;
				 		display:flex;
				 		li{
							float:left;
							font-size:14px;
							flex:1;
							-ms-flex:1;
							-webkit-flex:1;
							text-align:center;
							margin:0px 10px;
							.active{
									
									color:#fd472b;
									display:block;
									border-bottom:1px solid #fd472b;
									padding-bottom: 12px;
									
								}
						}
				  }
		}
		#index_order{
			float:left;
			width:100%;
			text-align:center;
			margin:5px auto 0;
			img{
				width:107px;
				height:97px;
				margin:65px 0px 20px;
			}
			p{
				font-size:15px;
				color:#35353f;
			}
		}
		.index_main{
			background-color:#f5f5f5;
			.index_thing{
				float:left;
				padding:0px 15px;
				margin-bottom:5px;
				height:133px;
				background-color:#fff;
				em{
					float:left;
					font-size:14px;
					color:#35353f;
					width: 100%;
    			text-align: left;
    			margin:12px 0px 15px;
    			display:block;
    			font-style:normal;
				}
				.index_img{
					float:left;
					img{
						width:75px;
						height:75px;

					}
					
				}
				.index_txt{
						text-align:left;
					  margin-left: 85px;
					p{
						font-size:14px;
						color:#35353f;

					}
					span{
						color:#fd472b;
						display:block;
						margin:13px 0px 15px;
						float:left;
					}
				}
			}
		}
		
	}
}



</style>
