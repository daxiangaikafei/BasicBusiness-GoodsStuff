<!-- 我的订单页面 -->
<template>
	<div class="order_main">

		<div class="index_form">
			<div class="index_bind">
					<input class="index_bind_text" type="text" id="" name="" v-model="orderNumber" placeholder="粘贴绑定订单号"/>
					<button @click="submitOrder" class="index_submit">提交</button>
			</div>
		</div>
		<div class="index_ul">
			<ul>
				<li :class="{active: orderStatus == 0}"><a @click="changeStatus(0)">待跟踪</a></li>
				<li :class="{active: orderStatus == 1}"><a @click="changeStatus(1)">跟踪中</a></li>
				<li :class="{active: orderStatus == 2}"><a @click="changeStatus(2)">待发放</a></li>
				<li :class="{active: orderStatus == 3}"><a @click="changeStatus(3)">已发放</a></li>
				<li :class="{active: orderStatus == 4}"><a @click="changeStatus(4)">无效</a></li>
				<li :class="{active: orderStatus == -1}"><a @click="changeStatus(-1)">全部</a></li>
			</ul>
		</div>
		<div class="tip">
			提示：{{tip}}
		</div>
		<div id="index_order" v-if="orderList.length == 0">
			<img src="../../static/images/icon_null.png"/>
			<p>您还没有相关订单，快去逛逛吧</p>
		</div>
		<div class="order_main"  v-if="orderList.length != 0" v-load-more="loaderMore">
			<template  v-if="orderStatus != 0">
				<div class="index_thing" v-for="item in orderList" :key="item.id">
					<div class="top">
						<span class="time">提交时间2017-06-28 13:23:24</span>
						<em :style="{color:orderStatusColors[item.status]}">{{ orderText[item.status]}}</em>
					</div>
					<!-- <div class="index_img">
						<img :src="item.productImg"/>
					</div> -->
					<div class="content">
						<div class="title">{{ item.productName }}</div>
						<div class="order">
							<span>订单号：L012312312313123</span>
							<span>返积分：800</span>
						</div>
						<span class="pay">支付金额：￥{{ item.payAmount }}</span>
					</div>
				</div>
			</template>
			<template v-if="orderStatus == 0">
				<div class="index_thing" v-for="item in orderList" :key="item.id">
					<div class="top">
						<span class="time">提交时间2017-06-28 13:23:24</span>
					</div>
					<div class="content">
						<div class="order">
							<span>订单号：L012312312313123</span>
						</div>
					</div>
				</div>
			</template>
		</div>
		<!-- <p v-if="loading" class="empty_data">加载中</p>  
		<p v-if="touchend" class="empty_data">没有更多了</p> -->
		<error-message v-bind="{pastle, message}"></error-message>
	</div>
</template>
<script>
import ajax from '../../config/ajax'
import ApiControl from '../../config/envConfig.home'
import { mapMutations } from 'vuex';
import {
    loadMore,
    getImgPath
} from '../../components/mixin'
var env = 'product';
const tips = {
	0 : '订单提交后，非电商大促期，正常情况半小时之内，可以跟踪到哦',
	1 : '订单已经跟踪到，收到商品后，商品没问题，确认收货就可以拿到奖励啦',
	2 : '亲爱的, 这里的订单我们已经核实无误，进入发放流程，耐心等待哦',
	3 : '亲爱的，积分已经成功发放，可以随时兑换集分宝哦',
	4 : '订单未跟踪到，到微信公众号联系客服，人工审核!',
	'-1' : '亲爱的，积分已经成功发放，可以随时兑换集分宝哦'
}
	export default {
		data(){
			return{
				pastle:false,
				nickname:"",
				orderNumber: '',
				orderStatus: 1,
				orderList: [],
				orderText: {
					1: '跟踪中',
					2: '待发放',
					3: '已发放',
					4: '无效'
				},
				orderStatusColors: {
					1: '#28bc06',
					2: '#28bc06',
					3: '#28bc06',
					4: '#f62f42'
				},
				tip: '',
				message: [],
				page: 1,
				loading: false,
				preventRepeatReuqest: false, //到达底部加载数据，防止重复加载,
				touchend: false, //没有更多数据
				offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			}
		},
	    mixins: [loadMore, getImgPath],
	    methods: {
	    	...mapMutations([
                'buryPoint'
            ]),
	    	submitOrder: function(){
	    		if(this.orderNumber != ''){
	    			var eventId = '我的订单';
	    			var label = '提交';
	    			this.buryPoint({eventId,label});
	    			var _vue = this;
	    			_vue.$ajax.post(ApiControl.getApi(env, "submitOrder"), {
	    				orderNo: _vue.orderNumber
	    			}).
	    			then(res => {
	    				//提交成功刷新跟踪中列表
	    				// if(res.code == 200){
	    			    if(res.data.code == 0){
									this.setErrorMessage(`订单号：${this.orderNumber}`, res.data.message);									
	    			    	_vue.orderNumber = '';
	    			    	_vue.orderStatus = 1;
									_vue.queryOrder();
									this.orderStatus = 0
	    			    }else{
									this.setErrorMessage(`订单号：${this.orderNumber}`, res.data.message);									
	    			    	// _vue.setErrorMessage(res.data.message);
	    			    }
	    			})
	    		}
	    	},
	    	changeStatus: function(status){
	    		this.orderStatus = status;
	    		this.page = 1;
	    		this.preventRepeatReuqest = false;
	    		this.touchend = false;
				 	this.tip = tips[this.orderStatus]
					
	    		var eventId = '我的订单';
	    		var label = 'TAB页';
	    		this.buryPoint({eventId,label});
	    		this.queryOrder();
	    	},
	    	queryOrder: function(){
	    		var _vue = this;
	    		//根据orderStatus获取订单信息
	    		_vue.$ajax.get(ApiControl.getApi(env, "getMyOrder"), {
	    			params: {
	    				status: this.orderStatus,
	    				pageNo: 1
	    			}
	    		}).
	    		then(res => {
	    			//提交成功刷新跟踪中列表
	    		    if(res.data.code == 0){
	    		    	_vue.orderList = res.data.result.list;
	    		    }else{
	    		    	_vue.setErrorMessage(res.data.message);
	    		    }
	    		})
	    	},
	    	queryMoreOrder: function(){
	    		let _vue = this;
	    		this.preventRepeatReuqest = true;
	    		this.page++;

	    		_vue.$ajax.get(ApiControl.getApi(env, "getMyOrder"), {
	    			params:{
	    				status: _vue.orderStatus,
	    				pageNo: _vue.page,
	    				size: 10
	    			}
	    		}).
	    		then(res => {
	    			if(res.data.code == 0){
	    				for (var i in res.data.result.list)
	    				    _vue.orderList.push(res.data.result.list[i]);
	    				setTimeout(function() {
	    				    _vue.loading = false;
	    				    _vue.preventRepeatReuqest = false;
	    				    if (res.data.result.list.length == 0 || res.data.result.list.length < 10) {
	    				        _vue.touchend = true;
	    				        return
	    				    }
	    				}, 500);
	    			}else{
	    				_vue.setErrorMessage(res.data.message);
	    			}
	    		})
	    	},
	    	//到达底部加载更多数据
            async loaderMore() {
                //防止重复请求
                if (this.touchend || this.preventRepeatReuqest) {
                    return
                }
                this.loading = true;
                this.queryMoreOrder();
            },
            setErrorMessage: function(...message){
            	var _vue = this;
            	this.pastle = true;
            	this.message = message;
            	setTimeout(function(){
            	        _vue.pastle = false;
            	        _vue.message = [];
            	},2000)
            }
	    },
	    created(){
				 //页面初始化，获取跟踪中订单信息
				 this.tip = tips[this.orderStatus]
	       var _vue = this;
	       _vue.$ajax.get(ApiControl.getApi(env, "getMyOrder"), {
	       		params: {
	       			status: 1,
	       			pageNo: 1	
	       		}
	       }).
	       then(res => {
	       	//提交成功刷新跟踪中列表
	           if(res.data.code == 0){
	           		_vue.orderList = res.data.result.list;
	           }else{
	           		_vue.setErrorMessage(res.data.message);
	           }
	       })
	    },
	    mounted(){
	        
	    }
	}
</script>
<style lang="less">
@import "../../static/style/layout-mixin";
@bdColor: #ddd;
body{
	margin:0px;
	padding:0px;
	font-family:'PingFangSC-Regular';
	.order_main {
		background-color: #fff;
		width: 100%;
		height: 100%;
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
				font-size:13px;
				border-top-left-radius:5px;
				-webkit-border-bottom-left-radius:5px;
				padding-left:13px;
				float:left;
				&::-webkit-input-placeholder {
					color: #b3bac1;
				}
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
		.tip {
			font-size: 12px;
			padding: 8px 10px;
			background: #ffe396;
			text-align: left;
		}
		.index_ul{
			background-color: #f5f5f5;
			width:100%;
			border-top: 1px solid @bdColor;
			.flex;
			.flex-center;
			.flex-align-center;
			ul{
				background-color:#fff;
				width:100%;
				height: 40px;
				display:flex;
				li{
					font-size:14px;
					text-align:center;
					border-bottom:2px solid #fff;
					box-sizing: border-box;
					.flex;
					.flex-center;
					.flex-align-center;
					.flex-item-auto;
					&.active{
						color:#fd472b;
						border-bottom:2px solid #fd472b;
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
		.order_main {
				height: auto;
				background-color: #eee;
				border-top: 1px solid @bdColor;
				.index_thing {
					float:left;
					margin-bottom:5px;
					background-color:#fff;
					width: 100%;
					
					.top {
						border-bottom: 1px solid @bdColor;
						line-height: 24px;
						padding:0px 15px;						
						.flex;
						.flex-justify;
						.time {
							color: #999;
							font-size: 12px;
						}
						em{
							font-size:12px;
							color:#35353f;
							font-style:normal;
						}
					}
					.content {
						box-sizing: content-box;
    				padding: 13px 15px;
						.flex;
						.flex-vertical;
						.flex-around;
						.title, .order, .pay {
							text-align: left;
						}
						& > * + * {
							margin-top: 10px;
						}
						.title {
							font-size: 14px;
							color: #2d3c49;
							width: 70%;
							.text-line-feed(1);							
						}
						.order {
							color: #666;
							font-size: 13px;
							.flex;
							.flex-justify;
						}
						.pay {
							color: #666;
							font-size: 13px;
						}
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
					.item_title{
						color:#35353f;
						overflow: hidden;
						height: 36px;
						line-height: 18px;
						font-size: 14px;
						text-overflow: ellipsis;
						display: -webkit-box;
						display: -moz-box;
						-moz-line-clamp: 2;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						white-space: normal;
						width: 100%;
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
	.empty_data {
	    font-size: 10px;
	    line-height: 10px;
	    text-align: center;
	    color: #666;
	    font-family: PingFang-SC-Regular!important;
	    padding-bottom: 3.5rem;
	}
}



</style>
