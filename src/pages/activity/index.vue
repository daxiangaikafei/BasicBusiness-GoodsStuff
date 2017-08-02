<!-- 好物精选页面 -->
<template>
	<div class="act_detail">
        <div class="header"><img src="../../static/images/points/bg-activity.png" alt=""></div>
        <div class="banner"><img src="../../static/images/points/bg-qbao.png" alt=""></div>
        <div class="nav_container">
            <div v-for="(item,index) in activetimetype" @click="selectTime(item)" v-bind:class="item==currentTime?'active':''">
                <span v-if="item==0" class="yeseterday">{{parseTimeType(item)}}</span>
                <span v-else class="time_period">
                <span class="period">{{parseTimeType(item)}}</span>
                <span class="status">{{parseTimeStatus(activetimestatus[item-1])}}</span>
                </span>
                <span class="left_line" v-if="item!=3" v-bind:class="item==0?'first_line':''"></span>
            </div>
        </div>
        <div class="goods_main"  v-if="goodsList.length != 0" v-load-more="loaderMore">
            <transition-group name="router-fade" mode="out-in">
            <div class="index_thing" v-for="item in goodsList" :key="item.productPrice" v-bind:class="!enterable?'darkness':''" >
                <div class="mask"><span>即将开始</span></div>
                <a :href="item.taobaoUrl">
                <div class="stuff">
                    <div>{{item.productCouponPrice}}</div>
                </div>
                <div class="content">
                    <div class="header">{{item.productTitle}}</div>
                    <div class="deduct">券后价:￥{{item.productPriceDeductCoupon}}</div>
                    <div class="price">原价:￥{{item.productPrice}}</div>
                    <div class="points">返积分{{item.returnPoints}}</div>
                    <div class="goods"><img :src="item.productImg" alt=""></div>
                </div>
                <div class="case">推荐理由: {{item.productPromoReason}}</div>
                </a>
            </div>
            </transition-group>
        </div>
        <aside class="return_top" @click="backTop" v-if="toBack">
			<img src="../../static/images/points/back-to-top.png" alt="">
		</aside>
    </div>
</template>
<script>
    import ajax from '../../config/ajax'
    import ApiControl from '../../config/envConfig.home'
    import {
        mapMutations
    } from 'vuex';
    import {
        loadMore
    } from '../../components/mixin';
    import {
        showBack,
        animate
    } from '../../config/mUtils';
    var env = 'product';
    export default {
        data() {
                return {
                    activetimetype: [0, 1, 2, 3],
                    activetimestatus: [1, 0, 0],
                    page: 1,
                    currentTime: 1,
                    size: 10,
                    goodsList: [],
                    toBack: false,
                    loading: false,
                    preventRepeatReuqest: false, //到达底部加载数据，防止重复加载,
                    touchend: false, //没有更多数据
                    enterable: false, //商品是否可点击
                    offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
                }
            },
            mixins: [loadMore],
            methods: {
                ...mapMutations([
                    'buryPoint'
                ]),
                //到达底部加载更多数据
                async loaderMore() {
                    //防止重复请求
                    if (this.touchend || this.preventRepeatReuqest) {
                        return
                    }
                    this.loading = true;
                    this.queryMoreGoods();
                },
                parseTimeType(num) {
                    switch (num) {
                        case 0:
                            return "昨日";
                            break;
                        case 1:
                            return "9:00";
                            break;
                        case 2:
                            return "13:00";
                            break;
                        case 3:
                            return "19:00";
                            break;
                    }
                },
                parseTimeStatus(num) {
                    switch (num) {
                        case 0:
                            return "即将开始";
                            break;
                        case 1:
                            return "已经开始";
                            break;
                    }
                },
                backTop() {
                    animate(document.body, {
                        scrollTop: '0'
                    }, 400, 'ease-out');
                },
                selectTime(num) {
                    this.currentTime = num;
                    this.page = 1;
                    this.preventRepeatReuqest = false;
                    this.touchend = false;
                    this.refreshGoods(num);

                },
                refreshGoods(num) {
                    var _vue = this;
                    _vue.$ajax.post(ApiControl.getApi(env, "getActiveGoods"), {
                        page: this.page,
                        size: 10,
                        activetimetype: num
                    }).
                    then(res => {
                        //提交成功刷新跟踪中列表
                        if (res.data.code == 0) {
                            this.goodsList = res.data.result.dataList;
                        } else {
                            _vue.setErrorMessage(res.data.message);
                        }
                        if (num == 0) _vue.enterable = true;
                        else
                            _vue.enterable = _vue.activetimestatus[num - 1] == 1 ? true : false;
                    })
                },
                queryMoreGoods: function() {
                    let _vue = this;
                    this.preventRepeatReuqest = true;
                    this.page++;

                    _vue.$ajax.post(ApiControl.getApi(env, "getActiveGoods"), {
                        page: this.page,
                        size: 10,
                        activetimetype: this.currentTime
                    }).
                    then(res => {
                        if (res.data.code == 0) {
                            _vue.goodsList = [..._vue.goodsList, ...res.data.result.dataList];
                            setTimeout(function() {
                                _vue.loading = false;
                                _vue.preventRepeatReuqest = false;
                                if (res.data.result.dataList.length == 0 || res.data.result.dataList.length < 10) {
                                    _vue.touchend = true;
                                    return
                                }
                            }, 500);
                        } else {
                            _vue.setErrorMessage(res.data.message);
                        }
                    })
                },
                setErrorMessage: function(...message) {
                    var _vue = this;
                    this.pastle = true;
                    this.message = message;
                    setTimeout(function() {
                        _vue.pastle = false;
                        _vue.message = [];
                    }, 2000)
                }
            },
            created() {
                //页面初始化，获取跟踪中订单信息
                var _vue = this;
                showBack(status => {
                    this.toBack = status;
                });
                _vue.$ajax.post(ApiControl.getApi(env, "getActiveGoods"), {
                    page: 1,
                    size: 10
                }).
                then(res => {
                    //提交成功刷新跟踪中列表
                    if (res.data.code == 0) {
                        var currentTime = 1;
                        _vue.activetimestatus = [];
                        for (var i in res.data.result.acGoodsStatusList) {
                            _vue.activetimestatus.push(res.data.result.acGoodsStatusList[i].acStatus);
                            if (res.data.result.acGoodsStatusList[i].acStatus == 1) {
                                this.enterable = true;
                                currentTime = parseInt(res.data.result.acGoodsStatusList[i].acCode);
                            }
                        }
                        this.currentTime = currentTime;
                        this.goodsList = res.data.result.dataList;
                        // _vue.orderList = res.data.result.list;
                    } else {
                        _vue.setErrorMessage(res.data.message);
                    }
                })
            },
            mounted() {

            }
    }
</script>
<style lang="less" scoped>
    @import "../../static/style/layout-mixin";
    @bdColor: #ddd;
    @highlightColor: #fd472b;
    .act_detail {
        .header,
        .banner {
            img {
                width: 100%;
            }
        }
        .nav_container {
            width: 100%;
            height: 76px;
            background: #fff;
            div {
                span {
                    color: #66666e;
                    font-family: PingFang-SC-Regular !important;
                }
                span.left_line {
                    position: absolute;
                    height: 17px;
                    border-right: 1px solid #dedede;
                    right: 0px;
                    top: 12px;
                }
                span.left_line.first_line {
                    right: 0px;
                    top: 3px;
                }
                span.yeseterday {
                    font-family: PingFang-SC-Regular !important;
                    font-size: 17px;
                }
                span.period {
                    font-family: PingFang-SC-Medium !important;
                    font-size: 20px;
                    width: 100%;
                    display: block;
                }
                span.status {
                    font-size: 12px;
                    width: 100%;
                    display: block;
                }
                position:relative;
                width: 25%;
                float: left;
                text-align: center;
                margin-top:17px;
            }
            .active span {
                color: #f93b1c!important;
            }
            div:first-child {
                margin-top: 27px;
            }
        }
        .goods_main {
            background: #eee;
            .index_thing {
                position: relative;
                height: 155px;
                background: #fff;
                margin: 12px 15px;
                .mask {
                    display: none;
                }
            }
            .darkness {
                .mask {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.54);
                    text-align: center;
                    z-index: 2;
                    width: 100%;
                    height: 100%;
                    display: block;
                    span {
                        position: relative;
                        margin: 35px auto;
                        width: 70px;
                        display: block;
                        border-radius: 50px;
                        padding-top: 25px;
                        height: 70px;
                        background: rgba(0, 0, 0, 0.71);
                        font-size: 12px;
                        color: #fff;
                    }
                }
            }
            .stuff {
                div {
                    margin-top: 20px;
                    margin-left: 15px;
                    width: 87px;
                    height: 87px;
                    color: #ffea3b;
                    font-size: 40px;
                    text-align: center;
                    padding-top: 10px;
                    text-shadow: 0px 2px 0px rgb(175, 25, 1);
                    background: url("../../static/images/points/activity-ticket.png");
                    background-size: cover;
                }
                @media (max-width: 374px) {
                    div {
                        margin-left: 0px;
                    }
                }
                width:30%;
                float: left;
            }
            .content {
                width: 70%;
                float: left;
                padding-left: 15px;
                position: relative;
                margin-top: 8px;
                .deduct {
                    font-family: PingFang-SC-Regular !important;
                    font-size: 18px;
                    color: #fd472b;
                }
                .price {
                    font-family: PingFang-SC-Regular !important;
                    font-size: 12px;
                    color: rgb(113, 113, 113);
                }
                .header {
                    width: 70%;
                    height: 30px;
                    margin-top: 10px;
                    line-height: 15px!important;
                    font-size: 14px;
                    color: #35353f;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box!important;
                    white-space: inherit!important;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .goods {
                    position: absolute;
                    top: 28px;
                    right: 10px;
                    img {
                        width: 68px;
                        height: 68px;
                    }
                }
                @media (max-width: 374px) {
                    .goods {
                        right: 0px;
                    }
                }
                .points {
                    color: @highlightColor;
                    border: 1px solid @highlightColor;
                    border-radius: 5px;
                    font-size: 10px;
                    padding-left: 5px;
                    max-width: 65px;
                }
            }
            @media (max-width: 374px) {
                .content {
                    padding-left: 0px;
                }
            }
            .case {
                width: 100%;
                float: left;
                padding-left: 15px;
                padding-top: 15px;
                font-size: 10px;
                color: #999;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .return_top {
            position: fixed;
            z-index: 3;
            right: 10px;
            bottom: 20px;
            img {
                width: 45px;
            }
        }
    }
</style>