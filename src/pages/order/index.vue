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
				<li><a :class="{active: orderStatus == 1}" @click="changeStatus(1)">跟踪中</a></li>
				<li><a :class="{active: orderStatus == 2}" @click="changeStatus(2)">待发放</a></li>
				<li><a :class="{active: orderStatus == 3}" @click="changeStatus(3)">已发放</a></li>
				<li><a :class="{active: orderStatus == 4}" @click="changeStatus(4)">无效</a></li>
				<li><a :class="{active: orderStatus == -1}" @click="changeStatus(-1)">全部</a></li>
			</ul>
		</div>
		<div id="index_order" v-if="orderList.length == 0">
			<img src="../../static/images/icon_null.png"/>
			<p>您还没有相关订单，快去逛逛吧</p>
		</div>
		<div class="order_main" v-load-more="loaderMore">
			<div class="index_thing" v-for="item in orderList">
				<em>{{ orderText[item.status]}}</em>
				<div class="index_img">
					<img :src="item.productUrl"/>
				</div>
				<div class="index_txt">
					<p>{{ item.productName }}</p>
					<span>￥{{ item.payAmount }}</span>
				</div>
			</div>
		</div>
		<p v-if="loading" class="empty_data">加载中</p>  
		<p v-if="touchend" class="empty_data">没有更多了</p>
		<error-message v-bind="{pastle: pastle,message: message}"></error-message>
	</div>
</template>
<script>
import ajax from '../../config/ajax'
import ApiControl from '../../config/envConfig.home'
import errorMessage from '../../components/requestError'
import { mapMutations } from 'vuex';
import {
    loadMore,
    getImgPath
} from '../../components/mixin'
var env = 'product';
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
	            page: 1,
                loading: false,
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载,
                touchend: false, //没有更多数据
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
	        }
	    },
	    components:{
    		errorMessage
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
	    			    	_vue.orderNumber = '';
	    			    	_vue.orderStatus = 1;
	    			    	_vue.queryOrder();
	    			    }else{
	    			    	_vue.setErrorMessage(res.message);
	    			    }
	    			})
	    		}
	    	},
	    	changeStatus: function(status){
	    		this.orderStatus = status;
	    		this.page = 1;
	    		this.preventRepeatReuqest = false;
	    		this.touchend = false;

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
            setErrorMessage: function(message){
            	var _vue = this;
            	this.pastle = true;
            	this.message = message;
            	setTimeout(function(){
            	        _vue.pastle = false;
            	        _vue.message = '';
            	},2000)
            }
	    },
	    created(){
	       //页面初始化，获取跟踪中订单信息
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
            .order_main {
                height: auto;
                background-color: #eee;
                .index_thing {
				float:left;
				padding:0px 15px;
				margin-bottom:5px;
				height:133px;
				background-color:#fff;
				width: 100%;
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
