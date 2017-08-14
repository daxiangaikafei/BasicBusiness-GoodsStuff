<!-- 个人中心页面 -->
<template>
	<div class="profile_main">
		<!--用户信息 start-->
		<div class="index_info">
			<div class="info_logo">
				<img :src="headimgurl" />
			</div>
			<div class="info_name">	
				<h3>{{nickname}}</h3>
				<p>ID:{{userId}}</p>
			</div>
			<div class="info-integral"> 
				<div class="integral-total">可兑换积分 {{ balance }}</div>
				<div class="integral-exchange">
					<router-link :to="'/points'"><span>积分明细</span></router-link>
					<span @click="handleExchange">立即兑换</span>
				</div>
			</div>
		</div>
		<!--用户信息 end-->
		<div class="index_list">
			<div class="list_title">
				<h3>已兑换集分宝 {{ exchanged }}</h3>
					<router-link :to="'/treasure'">
						了解集分宝
						<i class="icon_right"></i>
					</router-link>
			</div>
			<router-link :to="'/order'">
				<div class="list_item">
						<div class="list_icon icon_order"></div>
						<h3>我的订单</h3>
						<span><i class="icon_right"></i></span>
				</div>
			</router-link>
			<div class="list_item" v-on:click='pop'>
				<div class="list_icon icon_eye"></div>
				<h3>浏览足迹</h3>
				<span>查看全部<i class="icon_right"></i></span>
			</div>
			<router-link :to="'/partnerRules?type=1'" v-if="partnerStatus == 1">
				<div class="list_item">
					<div class="list_icon icon_invite"></div>
					<h3>好物合伙人</h3>
					<span class="partner">一群伙伴，一个事业<i class="icon_right"></i></span>
				</div>
			</router-link>
			<router-link :to="'/review'" v-if="partnerStatus == 2">
				<div class="list_item">
					<div class="list_icon icon_invite"></div>
					<h3>好物合伙人</h3>
					<span class="partner">一群伙伴，一个事业<i class="icon_right"></i></span>
				</div>
			</router-link>
			<router-link :to="'/gang'" v-if="partnerStatus == 3">
				<div class="list_item">
					<div class="list_icon icon_invite"></div>
					<h3>好物合伙人</h3>
					<span class="partner">一群伙伴，一个事业<i class="icon_right"></i></span>
				</div>
			</router-link>
			<!-- <div class="list_item" v-on:click='pop'>
				<div class="list_icon icon_invite"></div>
				<h3>好物合伙人</h3>
				<span class="partner">一群伙伴，一个事业<i class="icon_right"></i></span>
			</div> -->
			<div class="list_item" v-on:click='pop'>
				<div class="list_icon icon_member"></div>
				<h3>会员特权</h3>
				<span>查看<i class="icon_right"></i></span>
			</div>
		</div>
    <error-message v-bind="{pastle: pastle,message: message}"></error-message>
		<div class="pay-bundle-box-container" v-if="isPayBundleBoxShow">
			<div class="pay-bundle-box">
				<i class="icon icon-close" @click="handlePayBundleBoxClose"></i>				
				<i class="icon icon-alipay"></i>
				<h4>请先添加支付宝账号</h4>
				<p>只有添加完账号之后才能兑换积分，建议直接打开支付宝，直接复制账号哦</p>
				<input type="text" v-model="payBundleForm.account" ref="accountInput" placeholder="请输入支付宝账号">
				<input type="text" v-model="payBundleForm.accountConfirm" ref="accountConfirmInput" placeholder="再次输入支付宝账号">
				<span class="warning" v-if="isPayBundleBoxWarn">
					<i class="icon icon-warning"></i>
					{{payBundleBoxWarn}}
				</span>
				<div class="btns">
					<div class="btn" @click="handlePayBundleBoxClose">取消</div>
					<div class="btn" @click="handlePayBundleBoxCommit">确定</div>
				</div>	
			</div>
		</div>
	</div>
	
</template>
<script>
// import dialogList from '../../components/dialogContainer'
var env = 'debug';// set env type for debug or product
// import fetch from '../../config/fetch'
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
import { mapState ,mapMutations} from 'vuex';
	export default {
	name: 'profile',
	data(){
			return {
				pastle:false,
				nickname:"",
				headimgurl:"",
				userId:"",
				partnerStatus: 1,
				pastle: false,
				message: '',
				balance: '',
				exchanged: '',
				isPayBundle: false,
				isPayBundleBoxShow: false,
				isPayBundleBoxWarn: false,
				canPayBundleBoxCommit: false,				
				payBundleBoxWarn: '',
				payBundleForm: {
					account: '',
					accountConfirm: ''
				}
			}
    },
    created:function(){
       var _vue = this;
       _vue.$ajax.get(ApiControl.getApi(env, "getAppId"),{

       }).
       then(res =>{
         if(res.data.code == 0){
           var appId = res.data.result.appid;
           // _vue.appId = res.data.result.appid;
           _vue.setAppId({appId});
         }
           //检测用户是否登录
           _vue.$ajax.get(ApiControl.getApi(env, "checkLogin"), {
           }).
           then(res => {
               if(res.data.code != 0){
                 //跳转至微信授权页面：https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
                 //参数解释如下：state为重定向后需要添加的参数，redirect_url为重定向地址，我们这边统一为/login
                 // window.location.href = '/login?pageType=stuff';
                 var redirectUri = window.location.origin + window.location.pathname + '#/login?pageType=' + _vue.$route.path.split('/')[1];
                 redirectUri = encodeURIComponent(redirectUri);
                 // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + _vue.appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                 window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + _vue.appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
               }else{
               	    _vue.$ajax.get(ApiControl.getApi(env,"getUserInfo"),{

               	    })
               	     .then(function (res) {
               				if(res.data.code == 0){
               					_vue.nickname = res.data.result.nickname;
               					_vue.userId = res.data.result.userId;
               					_vue.headimgurl = res.data.result.headimgurl;
               					_vue.isPayBundle = res.data.result.alipayExist == 'Y' ? true : false;
               					_vue.partnerStatus = res.data.result.partnerStatus;
               					var points = '' + res.data.result.balance;
               					var regx = /(\d)(?=(\d{3})+(?!\d))/g;
               					_vue.balance = points.replace(regx,'$1,');
               					var exchangePoints = '' + res.data.result.exchanged;
               					_vue.exchanged = exchangePoints.replace(regx,'$1,');
               				}else if(res.data.code == 200){
               					_vue.setErrorMessage(res.data.message);
               				}else{
               					_vue.setErrorMessage(res.data.message);
               				}
               	     });
               }
           })
       })

     
    },
    methods:{
    	...mapMutations([
            'setAppId'
        ]),
    	pop:function(){
    		this.setErrorMessage('此功能正在开发中~');
    	},
    	setErrorMessage: function(message){
    		var _vue = this;
    		this.pastle = true;
    		this.message = message;
    		setTimeout(function(){
    		        _vue.pastle = false;
    		        _vue.message = '';
    		},2000)
		},
		handleExchange() {
			if (!this.isPayBundle) {
				this.isPayBundleBoxShow = true
				return
			}else{
				this.$router.push('/exchange');
			}
		},
		handlePayBundleBoxClose() {
			this.isPayBundleBoxShow = false
			this.payBundleBoxWarn = ''
			this.payBundleForm.account = ''
			this.payBundleForm.accountConfirm = ''
			
		},
		handlePayBundleBoxCommit() {
			if(!this.payBundleForm.account || this.payBundleForm.account == '') {
				this.payBundleBoxWarn = '请输入账号'
				this.$refs.accountInput.focus()
				this.isPayBundleBoxWarn = true
			} else if(!this.payBundleForm.accountConfirm || this.payBundleForm.accountConfirm == '') {
				this.payBundleBoxWarn = '请再次输入账号'
				this.$refs.accountConfirmInput.focus()					
				this.isPayBundleBoxWarn = true
			} else if(this.payBundleForm.account !== this.payBundleForm.accountConfirm) {
				this.payBundleBoxWarn = '两次账号输入不一致'
				this.$refs.accountConfirmInput.focus()
				this.isPayBundleBoxWarn = true
			} else {
				this.payBundleBoxWarn = ''
				this.isPayBundleBoxWarn = false
				var _vue = this;
				_vue.$ajax.post(ApiControl.getApi(env, "setAlipay"), {
				    alipay: _vue.payBundleForm.account
				}).
				then(res => {
				    if(res.data.code == 0){
				        _vue.isPayBundleBoxShow = false;
				        this.isPayBundle = true;
				        _vue.setErrorMessage('添加成功');
				    }else{
				        _vue.setErrorMessage('呃，出错了，请稍后重试');
				        // _vue.setErrorMessage(res.data.message);
				    }
				    
				})
			}
		}
    },
    computed:{
      ...mapState([
          'appId'
      ])
    },
    mounted(){
        
    }
}
</script>
<style lang="less" scoped>
@import "../../static/style/layout-mixin";
@btnColor: #fc3f5a;
body{
  height: 100%;
  font-family:'PingFangSC-Regular';

  .profile_main {
	  height: 100%;
	  line-height: 100%;
	  background: #ececec;
	  width: 100%;
	  float: left;
	
		.index_info{
			width: 100%;
			height: 123px;
			color: #fff;
			background: #FB905C url("../../static/images/me-bg.png") no-repeat right;
			background-size: cover;
			.flex;
			.flex-wrap;
			& * {
				color: #fff;		
			}
			.info_logo{
				padding: 0px 15px;

				img{
					width: 50px;
					height: 50px;
					display:inline-block;
					border-radius: 50%;
					-webkit-border-radius:50%;
					background-color: #ccc;
					margin:20px 0 0;
					box-shadow: 0 0 0 2px rgba(255,255,255,.6);
					box-sizing: border-box;
				}
			}
			.info_name{
				margin: 20px 0 0;
			  h3{
				font-size: 15px;
				line-height:1.8;
			  }

			  p{
				font-size: 13px;
				line-height:1.8;
			  }
			}
			.info-integral {
				width: 100%;
				.flex;
				.flex-justify;
				padding: 0 15px;
				.integral-total {
					font-size: 13px;
				}
				.integral-exchange {
					font-size: 12px;
					span {
						padding-right: 6px;
					}
					& * + * {
						border-left: 1px solid #fff;
						padding-left: 10px;
					}
				}
			}
		}
		
		.index_list{
			float: left;
		  width: 100%;
		  margin-top: 5px;
		  background: #fff;
			h3 {
				font-weight: 400;				
			}
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

				a{
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
    			display:inline-block;
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
					background-image: url(../../static/images/icon-partner.png);
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
				.partner {
					color: #FA4935;
				}
			}
		}

			.modal {
        font-size: 15px;
        position: fixed;
				top: 45%;
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

	.pay-bundle-box-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);
		z-index: 100;
		.flex;
		.flex-center;
		.flex-align-center;
		.pay-bundle-box {
			background: #fff;
			width: 80%;
			padding: 15px 5%;
			text-align: center;
			border-radius: 10px;
			position: relative;
			h4 {
				font-size: 15px;
				margin: 10px 0 5px;
				font-weight: 400;
			}
			p {
				font-size: 12px;
				color: #8a8dad;
				text-align: left;
			}
			input[type=text] {
				width: 100%;
				display: block;
				border: 1px solid #babac5;
				border-radius: 5px;
				margin: 12px 0;
				font-size: 13px;
				line-height: 35px;
				box-sizing: border-box;
				padding: 0 10px;		
				&::-webkit-input-placeholder {
					color: #b3bac1;
				}
				&:focus {
					border-color: #18a3ff;
				}
			}
			.warning {
				font-size: 12px;
				color: #f62f42;
				.flex;
				.flex-align-center;
				.icon {
					margin-right: 2px;
				}
				& + .btns {
					margin-top: 12px;
				}
			}
			.btns {
				margin-top: 25px;
				.flex;
				.flex-justify;
				.btn {
					color: @btnColor;
					border: 1px solid @btnColor;
					border-radius: 5px;
					width: 45%;
					font-size: 13px;
					line-height: 40px;
					&:last-child {
						background: @btnColor;
						color: #fff;
					}
				}
			}
		}
		.icon {
			display: inline-block;			
		}
		.icon.icon-alipay {
			width: 60px;
			height: 60px;
			background: url("../../static/images/icon-alipay.png") no-repeat ;
			background-size: contain;
		}
		.icon.icon-close {
			width: 25px;
			height: 25px;
			background: url("../../static/images/icon-close.png") no-repeat ;
			background-size: contain;
			position: absolute;
			top: 5px;
			right: 5px;
		}
		.icon.icon-warning {
			width: 12px;
			height: 12px;
			background: url("../../static/images/icon-warning.png") no-repeat ;
			background-size: contain;
		}
	}
}
</style>