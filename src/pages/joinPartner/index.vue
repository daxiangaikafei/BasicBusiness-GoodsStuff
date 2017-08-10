<!-- 合伙人规则页面 -->
<template>
  <div class="review">
    <div class="info">
      <div class="info-same info-name">
          <span class="info-normal">姓名:</span>
          <input class="info-input" placeholder="请输入姓名" v-model="name"></input>
      </div>
      <div class="info-same info-sex">
        <span class="info-normal">性别:</span>
        <img class="info-sex-icon" @click="changeSexMan" v-if="sexMan" src="../../static/images/partner/male.png"/>
        <img class="info-sex-icon" @click="changeSexMan" v-if="!sexMan" src="../../static/images/partner/male-selected.png"/>
        <img class="info-sex-icon" @click="changeSexWoman" v-if="sexWoman" src="../../static/images/partner/female.png"/>
        <img class="info-sex-icon" @click="changeSexWoman" v-if="!sexWoman" src="../../static/images/partner/female-selected.png"/>
      </div>
      <div class="info-same info-phone">
        <span class="info-normal">手机号码:</span>
        <input class="info-input" placeholder="请输入手机号码" type="tel" maxlength="11" v-model="phone"></input>
        <div class="info-text">请真实填写，人工电话审核</div>
      </div>
      <div class="info-same info-identity">
        <span class="info-normal">身份证号码:</span>
        <input class="info-input" placeholder="请输入身份证号码" v-model="identity"></input>
      </div>
      <div class="info-same info-alipay">
        <span class="info-normal">支付宝账号:</span>
        <input class="info-input" placeholder="请输入支付宝账号" v-model="alipay"></input>
        <div class="info-text">请确认账号准确，避免填写错误带来的财务损失</div>
      </div>
      <div class="info-special info-image">
        <div>证件上传:</div>
        <div class="image-area">
          <div class="image1-container">
            <img class="image1" v-if="image1Success" :src="identityImg1"/>
            <div class="file" v-if="!image1Success" @click="chooseImage1">+
                <!-- <input type="file" name="" id=""> -->
            </div>
            <div class="image-text">身份证(人像面)</div>
          </div>
          
          <div class="image2-container">
            <img class="image1" v-if="image2Success" :src="identityImg2"/>
            <div class="file" v-if="!image2Success" @click="chooseImage2">+
                <!-- <input type="file" name="" id=""> -->
            </div>
            <div class="image-text">身份证(国徽面)</div>
          </div>
        </div>
      </div>
      <div class="info-command"><img src="../../static/images/partner/selected.png"/><span>我已经阅读并完全同意合伙人制度</span></div>
    </div>
    <div class="to-partner" @click="joinPartner">
      提交申请
    </div>
    <error-message v-bind="{pastle: pastle,message: message}"></error-message>
  </div>
</template>
<script>
var env = 'product';// set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
const wx = require('weixin-js-sdk');
  export default {
  name: 'profile',
  data(){
      return {
        name: '',
        phone: '',
        identity: '',
        alipay: '',
        sex: 0,
        sexMan: true,
        sexWoman:true,
        identityImg1: 'http://7j1xky.com2.z0.glb.qiniucdn.com/2%25oriHIMQCeoHakAGkNYwQ_thumb_237.jpg',
        identityImg2: 'http://7j1xky.com2.z0.glb.qiniucdn.com/2%25oriHIMQCeoHakAGkNYwQ_thumb_237.jpg',
        pastle:false,
        message: '',
        image1Success: false,
        image2Success: false,
        imageUpload1Flag: false,
        imageUpload2Flag: false,
        idCardImg1: '',
        idCardImg2: '',
        serverId1:'',
        serverId2:'',
        images: {
          localId: [],
          serverId: []
        }
      }
    },
    created:function(){
      window.wx = wx;
      document.title = "我有好物 - 申请合伙人"
      var config = {};
      var _vue = this;
      _vue.$ajax.get(ApiControl.getApi(env, "jsInfo") + 'url=http://wyhw-test.banyan-data.com/tr3/#/join', {
      }).
      then(res => {
          console.log(res);
          if(res.data.code == 0){
              config = res.data.result;
              wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: config.appid, // 必填，公众号的唯一标识
                  timestamp: config.timestamp, // 必填，生成签名的时间戳
                  nonceStr: config.nonceStr, // 必填，生成签名的随机串
                  signature: config.signature,// 必填，签名，见附录1
                  jsApiList: [
                    "chooseImage",//拍照或从手机相册中选图接口
                    "previewImage",//预览图片接口
                    "uploadImage"//上传图片接口
                  ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });

          }else{
              _vue.setMessage(res.data.message);
          }
          
      })

      // console.log(wx);

      
      wx.ready(function(){
        // console.log('config success callback');
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
      },
      chooseImage1: function(){
        var _vue = this;
        wx.chooseImage({
           success: function (res) {
              _vue.image1Success = true;
              _vue.identityImg1 = res.localIds[0];              
               wx.uploadImage({
                   localId: _vue.identityImg1,
                   success: function (res) {
                       // vm.media(res.serverId);  //将微信服务器id传给后台
                        _vue.serverId1 = res.serverId;   
                        // alert(_vue.serverId1); 
                        // nodejs端上传图片接口，参数为serverId1,success之后， imageUpload1Flag设置为true。 设置idCardImg1为后端返回的image url      
                   },
                   fail: function (res) {
                       alert(JSON.stringify(res));
                   }
               });
           }
        });
      },
      chooseImage2: function(){
        var _vue = this;
        wx.chooseImage({
           success: function (res) {
              _vue.image2Success = true;
              _vue.identityImg2 = res.localIds[0];              
               wx.uploadImage({
                   localId: _vue.identityImg2,
                   success: function (res) {
                       // vm.media(res.serverId);  //将微信服务器id传给后台
                        _vue.serverId2 = res.serverId;   
                        // alert(_vue.serverId2); 
                        // nodejs端上传图片接口，参数为serverId1,success之后， imageUpload2Flag设置为true。设置idCardImg2为后端返回的image url
                   },
                   fail: function (res) {
                       alert(JSON.stringify(res));
                   }
               });
           }
        });
      },
      joinPartner: function(){
        if(this.name == ''){
          this.setMessage('请输入姓名');
        }else if(this.sexMan && this.sexWoman){
          this.setMessage('请选择性别');
        }else if(this.phone == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.phone))){
          this.setMessage('请输入正确的手机号码');
        }else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.identity))){
          this.setMessage('请输入正确的身份证号码');
        }else if(this.alipay == ''){
          this.setMessage('请输入支付宝账号');
        }else if(!(this.imageUpload1Flag && this.imageUpload2Flag)){
          this.setMessage('请上传身份证正反面照片');
        }else{
          _vue.$ajax.get(ApiControl.getApi(env, "checkLogin"), {
              params: {
                  alipay : this.alipay,
                  name: this.name,
                  sex: this.sex,
                  mobile: this.phone,
                  idCardImg1: this.idCardImg1,
                  idCardImg2: this.idCardImg2
              }
          }).
          then(res => {
              if(res.data.code == 0){
                //提交成功后添加弹出提示框，带关闭按钮。//TBD
              }else{

              }
          })
        }
      },
      changeSexMan: function(){
        this.sexMan = !this.sexMan;
        this.sexWoman = true;
        if(!sexMan){
          this.sex = 1;
        }
      },
      changeSexWoman: function(){
        this.sexWoman = !this.sexWoman;
        this.sexMan = true;
        if(!sexWoman){
          this.sex = 2;
        }
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
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        border-bottom: solid 1px #ddd;
        .info-normal{
          padding-right: 15px;
        }
        .info-input{
          font-size: 14px;
          line-height: 30px;
        }
      }
      .info-phone{
        position: relative;
        line-height: 50px;
        height: 60px;
      }
      .info-alipay{
        position: relative;
        line-height: 50px;
        height: 60px;
      }
      .info-text{
        position: absolute;
        bottom: 8px;
        font-size: 12px;
        line-height: 12px;
        color: red;
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
  .file {
        position: relative;
        display: inline-block;
        background: #eee;
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #ddd;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        width: 140px;
        height: 81px;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
    }
}
</style>