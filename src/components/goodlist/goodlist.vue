<template>
    <div id="goods-list" v-load-more="loaderMore" type="1">
         <transition-group name="router-fade" mode="out-in">
         <div class="goods-items" v-for="item in itemList.data" :key="item.id">
            <!--<div class="header">好货推荐</div>-->
            <div class="good">
                <!--<router-link :to="'/detail?name='+item.title+'&price='+item.price+'&num='+item.salesNum+'&discount='+item.orgPrice+'&source='+item.source+'&pic='+item.pic+'&reason='+item.introduce+'&url='+item.linkUrl">-->
                <router-link :to="'/detail?id='+item.id">
                <div class="img-frame">
                <img class="" :src="item.productImg">
                <span class="ticket">优惠券:{{(item.productCouponPrice+"").split(".")[0]}}元</span>
                <span style="clear:both"></span>
                </div>
                <span class="purchase"><img src="../../static/images/shopping-car.png" alt="">领券购买</span>
                <div class="content">
                    <span class="title">{{item.productTitle}}</span>
                    <span class="dicount"><font style="color:#717171;font-size: 12px;">券后价:</font>￥{{(item.productPriceDeductCoupon+"").split(".")[0]}}.<font style="color:#fd472b;font-size: 13px;">{{(item.productPriceDeductCoupon+"").split(".")[1]}}</font>
                    <img v-if="item.productSource=='taobao'" src="../../static/images/taobao.png">
                    <img v-else-if="item.productSource=='tmall'" src="../../static/images/tmall.png">
                    <img v-else-if="item.productSource=='jd'" src="../../static/images/jd.png">
                    </span>
                    <span class="price"><font style="font-size: 10px;">在售价:</font>{{item.productPrice}}</span>
                    <span class="count">目前销量:{{item.productSales}}</span>
                    <span class="recommend"><font color="#fd472b" style="font-size:10px">[AI导购推荐]</font>{{item.productPromoReason}}</span>
                </div>
                <div style="clear:both"></div>
                </router-link>
            </div>
        </div>
         </transition-group>
    <p v-if="loading" class="empty_data">加载中</p>  
    <p v-if="touchend" class="empty_data">没有更多了</p>  
    </div>
</template>

<script>
    // import dialogList from '../../components/dialogContainer'
    var env = 'product'; // set env type for debug or product
    import ajax from '../../config/ajax'
    import utils from '../../config/utils'
    import ApiControl from '../../config/envConfig.home'
    import {
        loadMore,
        getImgPath
    } from '../mixin'
    export default {
        name: 'goodsList',
        data() {
            return {
                itemList: {},
                keyword: '',
                page: 1,
                loading: false,
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载,
                touchend: false, //没有更多数据
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
            }
        },
        props: ['pageId'],
        mixins: [loadMore, getImgPath],
        methods: {
            refreshItems: function() {
                let _vue = this;
                this.preventRepeatReuqest = true;
                this.page++;
                ajax('POST', ApiControl.getApi(env, "couponList"), {
                    keyword: this.keyword,
                    page: this.page,
                    size: 10
                }).
                then(res => {
                    for (var i in res.data)
                        this.itemList.data.push(res.data[i]);
                    setTimeout(function() {
                        _vue.loading = false;
                        _vue.preventRepeatReuqest = false;
                        if (res.data.length == 0 || res.data.length < 10) {
                            _vue.touchend = true;
                            return
                        }
                    }, 500);
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
        },
        created() {
            var pageId = this.$route.query.pageId
            this.title = this.$route.query.title == undefined ? '小智' : this.$route.query.title
            ajax('POST', ApiControl.getApi(env, "couponList"), {
                page: 1,
                size: 10
            }).
            then(res => {
                this.itemList = res;
            })
        },
        mounted() {},
        computed() {}
    }
</script>

<style lang="less">
    #goods-list {
        padding-top: 1px;
        background: #eee;
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
            margin: 5px 0;
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
                background: #fd472b;
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
                    color: #fd472b;
                    font-size: 18px;
                    img {
                        float: none;
                        width: 12px;
                    }
                }
                .price {
                    margin-top: 10px;
                    line-height: 10px;
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
    }
</style>