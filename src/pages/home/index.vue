<template>
    <div>
      <search-module @searching="searchKey" ref="searchModule"></search-module>
      <good-list ref="goodsList"></good-list>
      <foot-guide ref="footGuide"></foot-guide>
    </div>
                          
</template>

<script>
    // import dialogList from '../../components/dialogContainer'
    var env = 'product'; // set env type for debug or product
    import ajax from '../../config/ajax'
    import utils from '../../config/utils'
    import ApiControl from '../../config/envConfig.home'
    import getLoginUri from '../../config/loginConfig'
    import footGuide from '../../components/footer/footGuide'
    import searchModule from '../../components/search'
    import goodList from '../../components/goodlist/goodlist'
    export default {
        name: 'home',
        data() {
            return {
                itemList: {},
                keyword: '',
                page: 1,
            }
        },
        components: {
            footGuide,
            searchModule,
            goodList
        },
        methods: {
            searchKey: function(keywords) {
                this.page = 1;
                this.key = keywords;
                ajax('GET', ApiControl.getApi(env, "couponList"), {
                    key: this.key,
                    page: 1,
                    size: 10
                }).
                then(res => {
                    this.$refs.goodsList.keyword = keywords;
                    this.$refs.goodsList.itemList = res;
                    this.$refs.goodsList.page = 1;
                    this.$refs.goodsList.loading = false;
                    this.$refs.goodsList.touchend = false;
                    this.$refs.goodsList.preventRepeatReuqest = false;
                })
            }
        },
        created() {
            //检测用户是否登录
            // ajax('GET', ApiControl.getApi(env, "checkLogin"), {}).
            // then(res => {
            //     if (res.code != 0) {
            //         //跳转至微信授权页面：https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
            //         //参数解释如下：state为重定向后需要添加的参数，redirect_url为重定向地址，我们这边统一为/login
            //         // window.location.href = '/login?pageType=home';
            //         var redirectUri = getLoginUri.getLoginUri(env, 'baseUri') + 'home';
            //         var appId = getLoginUri.getAppId();
            //         // window.location.href = 'ttps://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect';

            //         window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            //     }
            // })
            document.title = "有好物"
            var pageId = this.$route.query.pageId
            this.title = this.$route.query.title == undefined ? '小智' : this.$route.query.title
        },
        mounted() {},
        computed() {}
    }
</script>

<style lang="less">

</style>