<!-- 合伙人规则页面 -->
<template>
	<div class="review">
		<div class="info">
			<div class="info-same info-name">
				  <span class="info-normal">姓名:</span>
          <span> {{ name }}</span>
			</div>
      <div class="info-same info-sex">
        <span class="info-normal">性别:</span>
        <img class="info-sex-icon" v-if="sex == 2" src="../../static/images/partner/male.png"/>
        <img class="info-sex-icon" v-if="sex == 1" src="../../static/images/partner/male-selected.png"/>
        <img class="info-sex-icon" v-if="sex == 1" src="../../static/images/partner/female.png"/>
        <img class="info-sex-icon" v-if="sex == 2" src="../../static/images/partner/female-selected.png"/>
      </div>
      <div class="info-same info-phone">
        <span class="info-normal">手机号码:</span>
        <span> {{ phone }}</span>
      </div>
      <div class="info-same info-identity">
        <span class="info-normal">身份证号码:</span>
        <span> {{ identity }}</span>
      </div>
      <div class="info-same info-alipay">
        <span class="info-normal">支付宝账号:</span>
        <span> {{ alipay }}</span>
      </div>
			<div class="info-special info-image">
				<div>证件上传:</div>
        <div class="image-area">
          <div class="image1-container">
            <img class="image1" :src="identityImg1"/>
            <div class="image-text">身份证(人像面)</div>
          </div>
          
          <div class="image2-container">
            <img class="image1" :src="identityImg2"/>
            <div class="image-text">身份证(国徽面)</div>
          </div>
        </div>
			</div>
      <div class="info-command"><img src="../../static/images/partner/selected.png"/><span>我已经阅读并完全同意合伙人制度</span></div>
		</div>
		<div class="to-partner">
			审核中
		</div>
    <error-message v-bind="{pastle: pastle,message: message}"></error-message>
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
				name: '张无忌',
        phone: '1344444444',
        identity: '13233232322',
        alipay: '322323',
        sex: 1,
        identityImg1: '',
        identityImg2: '',
        pastle:false,
        message: ''
			}
    },
    created:function(){
     	document.title = "我有好物 - 申请合伙人"

      var _vue = this;
      _vue.$ajax.get(ApiControl.getApi(env, "getPartnerInfo"), {
      }).
      then(res => {
          if(res.data.code == 0){
              _vue.name = res.data.result.name;
              _vue.alipay = res.data.result.alipay;
              _vue.identity = res.data.result.id;
              _vue.phone = res.data.result.mobile;
              _vue.identityImg1 = res.data.result.idCardImg1;
              _vue.identityImg2 = res.data.result.idCardImg2;
              _vue.sex = res.data.result.sex;
          }else{
              _vue.setMessage(res.data.message);
          }
          
      })
    },
    methods:{
      setMessage(message){
          var _vue = this;
          this.pastle = true;
          this.message = message;
          setTimeout(function(){
              _vue.pastle = false;
              _vue.message = '';
          },2000)
      }
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
  .review{
  	background: #fff;
  	padding-bottom: 20px;
  	.info{
  		font-size: 14px;
      color: #4f4345;
      .info-same{
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        border-bottom: solid 1px #ddd;
        .info-normal{
          padding-right: 15px;
        }
      }
      .info-special{
        margin-top: 10px;
        overflow: hidden;
        padding: 0 20px;
        .image-area{
          width: 100%;
          overflow: hidden;
          margin-top: 20px;
          .image1-container{
            width: 140px;
            height: 112px;
            float: left;
            display: inline-block;
            img{
              width: 100%;
              height: 81px;
            }
          }
          .image2-container{
            width: 140px;
            height: 112px;
            float: right;
            display: inline-block;
            img{
              width: 100%;
              height: 81px;
            }
          }
          .image1{

          }
          .image-text{
            padding-top: 11px;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
          }
        }
      }
      .info-command{
        text-align: center;
        font-size: 11px;
        color: #4f4345;
        line-height: 20px;
        padding-bottom: 50px;
        padding-top: 30px;
        img{
          width: 14px;
          height: 14px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .info-sex-icon{
        width: 58px;
        height: 30px;
        vertical-align: middle;
        margin-left: 10px;
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