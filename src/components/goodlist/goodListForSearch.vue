<template>
    <div id="goods-list-search" v-load-more="loaderMore" type="1">
        <!-- <div class="test">Only for test</div> -->
         <transition-group name="router-fade" mode="out-in">
         <div class="goods-items" v-for="item in itemList.result" :key="item.id">
            <!--<div class="header">好货推荐</div>-->
            <div class="good">
                <!--<router-link :to="'/detail?name='+item.title+'&price='+item.price+'&num='+item.salesNum+'&discount='+item.orgPrice+'&source='+item.source+'&pic='+item.pic+'&reason='+item.introduce+'&url='+item.linkUrl">-->
                <router-link  v-on:click.native="goodClick" :to="'/detail?id='+item.id" >
                <div class="img-frame">
                <img class="" :src="item.productImg">
                <span class="ticket">优惠券:{{(item.productCouponPrice+"").split(".")[0]}}元</span>
                <span style="clear:both"></span>
                </div>
                <span class="purchase"><img src="../../static/images/shopping-car.png" alt="">领券购买</span>
                <div class="content">  
                    <span class="title">
                        <img v-if="item.product_platform=='淘宝'" src="../../static/images/taobao.png">
                        <img v-else-if="item.product_platform=='天猫'" src="../../static/images/tmall.png">
                        <img v-else-if="item.product_platform=='京东'" src="../../static/images/jd.png">
                        {{item.productTitle}}
                    </span>
                    <span class="dicount"><font style="color:#717171;font-size: 12px;">券后价:</font>￥{{
                    Math.floor(item.productPriceDeductCoupon)}}
                    <font style="color:#fd472b;font-size: 13px;margin-left:-5px;">
                    .{{ item.productPriceDeductCoupon.toString().split('.').length == 1 ? '00' : item.productPriceDeductCoupon.toString().split('.')[1].length == 1 ? item.productPriceDeductCoupon.toString().split('.')[1] + '0' : item.productPriceDeductCoupon.toString().split('.')[1]}}
                    </font>
                    <i v-if="item.returnPoints && item.returnPoints > 0">返积分{{ item.returnPoints }}</i>
                    </span>
                    <span class="price"><font style="font-size: 10px;">在售价:</font>{{item.productPrice}}</span>
                    <span class="count">目前销量:{{item.productSales}}</span>
                    <span class="recommend"><font color="#fd472b" style="font-size:10px">[好物推荐]</font>{{item.productPromoReason}}</span>
                </div>
                <div style="clear:both"></div>
                </router-link>
            </div>
        </div>
         </transition-group>
    <p v-if="loading" class="empty_data">加载中</p>  
    <p v-if="touchend" class="empty_data">没有更多了</p>  
    <div class="error_notify" v-if="itemList.result.length == 0 && keyword != ''">
        <div class="error_message">未找到<span v-if="keyword != ''">"{{keyword}}"</span>相关的商品</div>
        <div class="error_message">请尝试重新搜索</div>
    </div>
    <div class="error_notify" v-if="itemList.result.length == 0 && categoryName != ''">
        <div class="error_message">未找到<span>"{{categoryName}}"</span>类目下的商品</div>
        <div class="error_message">请尝试搜索功能，我们会尽快更新数据</div>
    </div>
    </div>
</template>

<script>
    // import dialogList from '../../components/dialogContainer'
    var env = 'product'; // set env type for debug or product
    import ajax from '../../config/ajax'
    import utils from '../../config/utils'
    import ApiControl from '../../config/envConfig.home'
    import { mapState,mapGetters,mapMutations } from 'vuex';
    import {
        loadMore,
        getImgPath
    } from '../mixin'
    export default {
        name: 'goodsListSearch',
        data() {
            return {
                itemList: {
                    result:[]
                },
                keyword: '',
                category: '',
                categoryName: '',
                sortfield: '',
                ad: '',
                page: 1,
                loading: false,
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载,
                touchend: false, //没有更多数据
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
            }
        },
        props: ['pageId'],
        mixins: [loadMore, getImgPath],
        computed: {
            ...mapState([
                'pageY','goodsList'
            ]),
            ...mapGetters([
                'getGoodsList'
            ])
        },
        methods: {
            ...mapMutations([
              'buryPoint','resetGoodsList','updateGoodsList','setPageY','setLatestLength'
            ]),
            scrollScreen:function(pageY){
                console.log('settimeout');
                console.log(this.goodsList);
            },
            goodClick: function(e){
                this.setPageY(e.pageY);
            },
            refreshItems: function() {
                let _vue = this;
                this.preventRepeatReuqest = true;
                this.page++;
                _vue.$ajax.post(ApiControl.getApi(env, "couponList"), {
                    keyword: _vue.keyword,
                    page: _vue.page,
                    ad: _vue.ad,
                    sortfield: _vue.sortfield,
                    category: _vue.category,
                    size: 10
                }).
                then(res => {
                    if(res.data.code == 0){
                       for (var i in res.data.result)
                            _vue.itemList.result.push(res.data.result[i]);
                        _vue.updateGoodsList(res.data.result);
                        _vue.setLatestLength(res.data.result.length);
                       setTimeout(function() {
                           _vue.loading = false;
                           _vue.preventRepeatReuqest = false;
                           if (res.data.result.length == 0 || res.data.result.length < 10) {
                               _vue.touchend = true;
                               return
                           }
                       }, 500); 

                   }else{
                        _vue.$emit("setErrorMessage", res.data.message);
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
                this.refreshItems();
            },
            setErrorMessage: function(message){
                var _vue = this;
                this.pastle = true;
                this.message = message;
                setTimeout(function(){
                    _vue.pastle = false;
                },2000)
            }
        },
        created() {
            var pageId = this.$route.query.pageId
            this.title = this.$route.query.title == undefined ? '小智' : this.$route.query.title
            var _vue = this;
            
            this.itemList.result = this.goodsList;
            // console.log(this.getGoodsList);
            this.$nextTick(() => {
                window.scroll(0,this.pageY);
            });
            
        },
        mounted() {
            // this.itemList.result = this.goodsList;
        }
    }
</script>

<style lang="less">
    @highlightColor:#fd472b;

    #goods-list-search {
        padding-top: 1px;
        background: #eee;
        margin-top: 5px;
        &>span * + * {
            margin-top: 5px;
        }
        .header {
            color: #ac56f5;
            line-height: 35px;
            height: 40px;
            text-align: center;
            border-bottom: 1px solid rgba(222, 222, 222, 0.27);
        }
        .goods-list {
            background: #dedede;
        }
        .goods-items {
            background: #fff;
            font-family: PingFang-SC-Regular!important;
        }
        @media screen and (min-device-width: 376px) and (max-device-width: 414px) {
            .goods-items {
                padding-bottom: 10px;
            }
        }
        .good {
            position: relative;
            padding: 10px;
            width: 100%;
            padding-top: 0px;
            .img-frame {
                margin-top: 9px;
                height: 140px;
                position: relative;
                float: left;
                width: 29.6%;
            }
            img {
                float: left;
                width: 100%;
            }
            .ticket {
                font-family: PingFang-SC-Regular!important;
                border-radius: 2px;
                color: #fff;
                font-size: 9px;
                background: #2cb4f3;
                left: 17%;
                bottom: 1px;
                position: absolute;
                padding: 2px 11px;
            }
            .purchase {
                font-family: PingFang-SC-Regular!important;
                color: #fff;
                font-size: 10px;
                background: @highlightColor;
                right: 10px;
                bottom: 40px;
                position: absolute;
                padding: 5px 10px;
                text-align: center;
                width: 85px;
                img {
                    width: 12px;
                }
            }
            span.ticket:before {
                border-radius: 50px;
                position: absolute;
                content: '';
                left: -5px;
                top: 5px;
                width: 8px;
                height: 8px;
                background: #fff;
            }
            span.ticket:after {
                border-radius: 50px;
                position: absolute;
                content: '';
                right: -5px;
                top: 5px;
                width: 8px;
                height: 8px;
                background: #fff;
            }
            .content {
                padding: 2px 15px;
                padding-bottom: 0px;
                width: 70%;
                float: left;
                span {
                    color: #35353f;
                    font-size: 13px;
                    line-height: 13px;
                    width: 100%;
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .dicount {
                    font-family: PingFang-SC-Medium!important;
                    margin-top: 15px;
                    line-height: 18px;
                    color: @highlightColor;
                    font-size: 18px;
                    img {
                        float: none;
                        width: 12px;
                    }
                    i {
                        color: @highlightColor;
                        border: 1px solid @highlightColor;
                        border-radius: 5px;
                        font-size: 12px;
                        padding: 0 2px;
                        margin-left: 5px;
                    }
                }
                .price {
                    margin-top: 10px;
                    line-height: 15px;
                    font-size: 10px;
                    color: #90909b;
                }
                .count {
                    font-size: 10px;
                    margin-top: 10px;
                    line-height: 13px;
                    color: #999;
                }
                .recommend {
                    font-size: 10px;
                    margin-top: 12px;
                    color: #999;
                }
            }
            .title {
                height: 30px;
                margin-top: 10px;
                line-height: 15px!important;
                font-size: 14px;
                color: #35353f;
                text-overflow: ellipsis;
                display: -webkit-box!important;
                white-space: inherit!important;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                img {
                    float: none;
                    width: 12px;
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
        .error_notify{
            height: 50px;
            margin: 200px auto;
            text-align: center;
            .error_message{
                height: 25px;
                line-height: 25px;
                font-size: 16px;
                text-align: center;
                overflow: hidden;
                word-break: break-all;
                color: #666;
                font-family: PingFang-SC-Regular!important;
            }
        }
    }
</style>