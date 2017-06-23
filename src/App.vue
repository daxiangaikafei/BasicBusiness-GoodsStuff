<template>
  <div>
    <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
var env = 'product';// set env type for debug or product
import ajax from './config/ajax'
import utils from './config/utils'
import ApiControl from './config/envConfig.home'
import getLoginUri from './config/loginConfig'
import talkingData from './plugins/talking.data'
    export default {
      name: 'goodStuff',
      data() {
        device: ''
      },
      // methods: {
      //   buryPoint: function(eventId,label){
      //     TDAPP.onEvent(eventId,label);
      //   }
      // },
      created() {
        this.device = utils.getDevice();
        // if not mobile ,set empty document
        if(this.device == 3) document.body.innerHTML = '';


        if(this.$route.path.indexOf('login') == -1){
          //检测用户是否登录
          ajax('GET', ApiControl.getApi(env, "checkLogin"), {
          }).
          then(res => {
              if(res.code != 0){
                //跳转至微信授权页面：https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
                //参数解释如下：state为重定向后需要添加的参数，redirect_url为重定向地址，我们这边统一为/login
                // window.location.href = '/login?pageType=stuff';
                var redirectUri = window.location.origin + window.location.pathname + '/#login?pageType=' + this.$route.path.split('/')[1];
                redirectUri = encodeURIComponent(redirectUri);
                var appId = getLoginUri.getAppId();
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
              }
          })
        }

        // document.cookie="token=467ac9ec5890ed167e69c0daec93107a; path=/"; 
        // console.log(document.cookie);
        //bury point
        // this.buryPoint('test','label');
        
      }
    }

</script>

<style lang="less">
    @import './static/style/common.less';
    .router-fade-enter-active,
    .router-fade-leave-active {
        transition: opacity .3s;
    }
    
    .router-fade-enter,
    .router-fade-leave-active {
        opacity: 0;
    }
    
    body {
        background-color: #eee;
    }
    
    #app {
        width: 100%;
        height: 100%;
        >div {
            width: 100%;
            height: 100%;
        }
    }
</style>
