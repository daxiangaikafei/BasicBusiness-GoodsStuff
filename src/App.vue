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
    export default {
      name: 'goodStuff',
      data() {
        device: ''
      },
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
                var redirectUri = getLoginUri.getLoginUri(env,'baseUri') + this.$route.path.split('/')[1];
                redirectUri = encodeURIComponent(redirectUri);
                console.log(redirectUri);
                var appId = getLoginUri.getAppId();
                // window.location.href = 'ttps://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect';

                var finalUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                console.log(finalUrl);
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
              }
          })
        }
        
      }
    }

</script>

<style lang="less">
    @import './static/style/common.less';
  .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
  }
</style>
