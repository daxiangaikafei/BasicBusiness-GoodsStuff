<!-- 集分宝页面 -->
<template>
	<!-- site_frame start -->
	<div class="site_frame">
    <!-- index_main start -->
			<div class="index_main">
				<div class="index_page">
					<span class="icon_dott_blue"></span>
					<h2>集分宝是什么？</h2>
					<p>集分宝可以当钱花.100集分宝=1元淘宝购物，还信用卡，缴水电煤，爱怎么花就怎么花！</p>
				</div>
				<div class="index_page">
					<span class="icon_dott_green"></span>
					<h2>集分宝在哪里查看？</h2>
					<p>集分宝可在支付宝里查看</p>
				</div>
				<div class="index_side"><img src="../../static/images/side.png"></div>
				<div class="index_page">
					<span class="icon_dott_orange"></span>
					<h2>集分宝怎么设置使用？</h2>
					<ul>
						<li><span></span>打开支付宝钱包</li>
						<li><span></span>点击右下角“我的”</li>
						<li><span></span>点击设置</li>
						<li><span></span>点击支付设置</li>
						<li><span></span>打开优先使用集分宝按钮</li>
					</ul>
					<div class="sideRight">
						<img src="../../static/images/img1.jpg" />
					</div>
				</div>
				
			</div>
			<div class="sideLeft">
				<img src="../../static/images/img2.jpg" />
			</div>
			<div class="sideRight sideNext">
				<img src="../../static/images/img3.jpg" />
			</div>
    <!-- index_main end -->
  </div>
  <!-- site_frame end -->
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
	background-color:#fff;
	font-family: 'PingFangSC-Medium';
	.site_frame{
		padding: 10px 22px;
	}
	.index_page{
	  padding-top: 12px;
		span{
		  width: 5px;
		  height: 5px;
		  display: inline-block;
		  float: left;
		  margin: 7px 0px;
		  border-radius: 6px;
		  -webkit-border-radius: 6px;
		  margin-right:3px;
		}
		.icon_dott_blue{
			background-color: #3f9dfd;
		}
		.icon_dott_green{
			background-color: #3ae232;
		}
		.icon_dott_orange{
			background-color: #f96f13;
		}
		h2{
		  font-size: 14px;
		  color: #333333;
		  padding-left: 8px;
		}
		p{
		  font-size: 13px;
		  line-height: 1.5;
		  color: #666666;
		  padding-left: 8px;
		}
		 ul{
		  margin: 0px;
		  padding: 8px 8px;
		  float: left;

		  li{
				list-style: none;
				height: 25px;
				letter-spacing: 0px;
			  font-size: 13px;
			  color: #333;

			  span{
					width: 5px;
					height: 5px;
					display: inline-block;
					background-color: #000;
					border-radius: 10px;
					-webkit-border-radius:10px;
				}
			}
		}
	}

	.index_side{
		margin: 0px 10px;

		 img{
			width: 94%;
			margin-top:10px;
			margin-bottom:10px;
		}
	}
	.sideLeft{
		float: left;
		width: 156px;
		 img{
			width: 100%;
			height: auto;
			display: inline-block;
			float: left;
			margin-top:40px;

		}
	}
	.sideRight{
		float: right;
		width:156px;
		img{
			width: 90%;
			height: auto;
			display: inline-block;
			float: left;
		}
	}
	.sideNext img{
		width: 100%;
		margin-top:75px;
	}

}
</style>