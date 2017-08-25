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
      <div class="info-command"><input class="command-checkbox" type="checkbox" v-model='checked' v-on:click='checkedCheckBox'/><span>我已经阅读并完全同意合伙人制度</span></div>
    </div>
    <div class="to-partner" @click="joinPartner">
      提交申请
    </div>
    <error-message v-bind="{pastle: pastle,message: message}"></error-message>

    <div class="pay-bundle-box-container" v-if="isJoinPartnerSuccess">
      <div class="pay-bundle-box">       
        <h4>提交成功</h4>
        <p>您好，工作人员会在5个工作日内审核完毕。</p>
        <div class="btns">
          <div class="btn" @click="handleJoinPartnerBoxCommit">朕知道了</div>
        </div>  
      </div>
    </div>
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
        identityImg1: '',
        identityImg2: '',
        pastle:false,
        message: '',
        image1Success: false,
        image2Success: false,
        imageUpload1Flag: false,
        imageUpload2Flag: false,
        isJoinPartnerSuccess: false,
        idCardImg1: '',
        idCardImg2: '',
        serverId1:'',
        serverId2:'',
        checked: false,
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
      // check user partner status
      _vue.$ajax.get(ApiControl.getApi(env,"getUserInfo"),{

      })
       .then(function (res) {
        if(res.data.code == 0){
          var partnerStatus = res.data.result.partnerStatus;
          if(partnerStatus == 2){ // partner status is in auditing
            _vue.$router.push('/review')
          }else if(partnerStatus == 3){
            _vue.$router.push('/gang')
          }else{
            var url = document.URL;
            _vue.$ajax.get(ApiControl.getApi(env, "jsInfo"), {
              params: {
                url: url
              }
            }).
                // _vue.$ajax.get(ApiControl.getApi(env, "jsInfo") + 'url=http://wyhw-test.banyan-data.com/tr4/#/join', {}).
            then(res => {
                if (res.data.code == 0) {
                    config = res.data.result;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: config.appid, // 必填，公众号的唯一标识
                        timestamp: config.timestamp, // 必填，生成签名的时间戳
                        nonceStr: config.nonceStr, // 必填，生成签名的随机串
                        signature: config.signature, // 必填，签名，见附录1
                        jsApiList: [
                                "chooseImage", //拍照或从手机相册中选图接口
                                "previewImage", //预览图片接口
                                "uploadImage" //上传图片接口
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                }else{
                  _vue.setMessage(res.data.message);
                }
                
            })
          }
        }else if(res.data.code == 200){
          _vue.setErrorMessage(res.data.message);
        }else{
          _vue.setErrorMessage(res.data.message);
        }
       });
      
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
                        // alert(res.serverId);
                       // vm.media(res.serverId);  //将微信服务器id传给后台
                        _vue.serverId1 = res.serverId;   
                        // alert(_vue.serverId1); 
                        // nodejs端上传图片接口，参数为serverId1,success之后， imageUpload1Flag设置为true。 设置idCardImg1为后端返回的image url   

                        _vue.$ajax.post(ApiControl.getApi(env, "idImage"), {
                              media_id : _vue.serverId1,
                        }).
                        then(res => {
                            if(res.data.code == 0){
                              //提交成功后添加弹出提示框，带关闭按钮。//TBD
                              _vue.imageUpload1Flag = true;
                              _vue.idCardImg1 = res.data.result.access_url;
                            }else{
                              _vue.setMessage(res.data.message);
                            }
                        })
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
                        // nodejs端上传图片接口，参数为serverId1,success之后， imageUpload2Flag设置为true。设置idCardImg2为后端返回的image url
                        _vue.$ajax.post(ApiControl.getApi(env, "idImage"), {
                              media_id : _vue.serverId2,
                        }).
                        then(res => {
                            if(res.data.code == 0){
                              //提交成功后添加弹出提示框，带关闭按钮。//TBD
                              _vue.imageUpload2Flag = true;
                              _vue.idCardImg2 = res.data.result.access_url;
                            }else{
                              _vue.setMessage(res.data.message);
                            }
                        })
                   },
                   fail: function (res) {
                       alert(JSON.stringify(res));
                   }
               });
           }
        });
      },
      checkedCheckBox: function(){
        this.checked = !checked;
      },
      joinPartner: function(){
        // var _vue = this;
        // _vue.$ajax.POST(ApiControl.getApi(env, "idImage"), {
        //       media_id : _vue.serverId1,
        // }).
        // then(res => {
        //     alert(res);
        //     if(res.data.code == 0){
        //       //提交成功后添加弹出提示框，带关闭按钮。//TBD
        //       _vue.imageUpload2Flag = true;
        //       _vue.idCardImg2 = res.data.access_url;
        //     }else{
        //       _vue.setMessage(res.data.message);
        //     }
        // })
        var _vue = this;
        if(this.name == ''){
          this.setMessage('请输入姓名');
        }else if(this.sexMan && this.sexWoman){
          this.setMessage('请选择性别');
        }else if(this.phone == '' || !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone))){
          this.setMessage('请输入正确的手机号码');
        }else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.identity))){
          this.setMessage('请输入正确的身份证号码');
        }else if(this.alipay == ''){
          this.setMessage('请输入支付宝账号');
        }else if(!(this.imageUpload1Flag && this.imageUpload2Flag)){
          this.setMessage('请上传身份证正反面照片');
        }else if(!this.checked){
          this.setMessage('请同意合伙人制度');
        }else{
          _vue.$ajax.post(ApiControl.getApi(env, "uploadPartnerInfo"), {
                alipay : _vue.alipay,
                name: _vue.name,
                sex: _vue.sex,
                mobile: _vue.phone,
                idNumber: _vue.identity,
                idCardImg1: _vue.idCardImg1,
                idCardImg2: _vue.idCardImg2
          }).
          then(res => {
              if(res.data.code == 0){
                //提交成功后添加弹出提示框，带关闭按钮。//TBD

                _vue.isJoinPartnerSuccess = true;
              }else{
                _vue.setMessage(res.data.message);
              }
          })
        }
      },
      changeSexMan: function(){
        this.sexMan = !this.sexMan;
        this.sexWoman = true;
        if(!this.sexMan){
          this.sex = 1;
        }
        console.log(this.sex);
      },
      changeSexWoman: function(){
        this.sexWoman = !this.sexWoman;
        this.sexMan = true;
        if(!this.sexWoman){
          this.sex = 2;
        }
        console.log(this.sex);
      },
      handleJoinPartnerBoxCommit() {
        this.isJoinPartnerSuccess = false
        this.$router.push('/review');
      }
    },
    computed:{
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
        .command-checkbox{
          vertical-align: middle;
          margin-right: 5px;
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
          margin: 0 auto;
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