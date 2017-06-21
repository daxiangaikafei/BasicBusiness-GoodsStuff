<template>
    <div>
      <search-module @searching="searchKey" ref="searchModule" @setErrorMessage="setErrorMessage"></search-module>
      <good-list ref="goodsList" @setErrorMessage="setErrorMessage"></good-list>
      <foot-guide ref="footGuide"></foot-guide>
      <error-message v-bind="{pastle: pastle,message: message}"></error-message>
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
    import errorMessage from '../../components/requestError'
    import { mapMutations } from 'vuex';
    export default {
        name: 'home',
        data() {
            return {
                itemList: {},
                keyword: '',
                page: 1,
                pastle: false,
                message: '测试公共提示框'
            }
        },
        components: {
            footGuide,
            searchModule,
            goodList,
            errorMessage
        },
        methods: {
            ...mapMutations([
                'buryPoint'
            ]),
            searchKey: function(keywords) {
                // console.log(TDAPP);
                // var eventId = '首页',
                //   label = '搜索';
                // TDAPP.onEvent(eventId,label);
                // this.setErrorMessage('This is only for test');
                this.page = 1;
                this.key = keywords;
                ajax('POST', ApiControl.getApi(env, "couponList"), {
                    keyword: this.key,
                    page: 1,
                    size: 10
                }).
                then(res => {
                    if(res.code == 0){
                        this.$refs.goodsList.keyword = keywords;
                        this.$refs.goodsList.itemList = res;
                        this.$refs.goodsList.page = 1;
                        this.$refs.goodsList.loading = false;
                        this.$refs.goodsList.touchend = false;
                        this.$refs.goodsList.preventRepeatReuqest = false;
                    }else{
                        this.setErrorMessage(res.message);
                    }
                    
                })
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
        created() {
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