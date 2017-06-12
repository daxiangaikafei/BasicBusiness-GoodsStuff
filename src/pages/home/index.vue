<template>
    <div>
      <search-module @searching="searchKey" ref="searchModule"></search-module>
      <good-list ref="goodsList"></good-list>
    </div>
                          
</template>

<script>
    // import dialogList from '../../components/dialogContainer'
    var env = 'product'; // set env type for debug or product
    import ajax from '../../config/ajax'
    import utils from '../../config/utils'
    import ApiControl from '../../config/envConfig.home'
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
                    this.$refs.goodsList.itemList = res;
                    this.$refs.goodsList.loading = false;
                    this.$refs.goodsList.preventRepeatReuqest = false;
                })
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