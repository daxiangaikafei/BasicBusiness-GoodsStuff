<template>
<div class="detail">
   <div class='detail_panel' id='detail_panel'>
       <img :src="pic" alt="">
       <div class="content">
       <div class="header">{{name}}</div>
       <div class="price"><font style="color:#717171;font-size:12px;">券后价:</font>￥{{price[0]}}<font style="color:#fd472b;font-size:13px;">.{{price[1]}}</font></div>
       <div class="ticket-panel">
            <div class="header">包邮</div>
            <div class="amount">{{CouponPrice}}元优惠券</div>
       </div>
       <div class="info">
       <span class="dicount">在售价:{{discount}}</span>
       <span class="num">已售:{{num}}</span>
       </div>
       <div style="clear:both"></div>
       </div>
   </div>
       <div class="reason">推荐理由: {{reason}}</div>
   <div class="opt_panel" v-if="source!='jd'">
   长按框内>框内>复制
   <span style="text-align: center;width: 100%;font-size: 13px;margin-top:10px;display: block;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none;
   ">打开【手机淘宝】即可领取优惠券并购买</span>
   <span class="tao" id="tao">{{taoCode}}</span>
   </div>
   <transition name="router-fade" mode="out-in">
    <div class="modal" v-if="pastle">复制成功!</div>
    </transition>
   <div class="footer">
       <button class="btn" v-if="source!='jd'" @click="copy" data-clipboard-target="#tao">一键复制</button>
       <a v-else :href="url"><span>立即购买</span></a>
       <!--<button class="btn" data-clipboard-text="这里是要复制的内容" aria-label="复制成功！">复制</button> -->
    </div>
</div>
</template>

<script>
    import Clipboard from '../../plugins/clipboard.min.js'
    import '../../plugins/swiper.min.js'
    import ajax from '../../config/ajax'
    import utils from '../../config/utils'
    import ApiControl from '../../config/envConfig.home'
    import getLoginUri from '../../config/loginConfig'
    var env = 'product'; // set env type for debug or product
    export default {
        props: ['parseId'],
        data() {
            return {
                name: "",
                price: "",
                num: "",
                discount: "",
                source: "",
                reason: "",
                pic: "",
                url: "",
                taoCode: "",
                pastle: false,
                CouponPrice: ""
            }
        },
        created: function() {
            ajax('GET', ApiControl.getApi(env, "couponDetail") + "/" + this.$route.query.id).
            then(res => {
                this.name = res.result.productTitle;
                document.title = res.result.productTitle;
                this.price = (res.result.productPrice + "").split(".");
                this.num = res.result.productSales;
                this.discount = res.result.productCouponPrice;
                this.source = res.result.productSource;
                this.pic = res.result.productImg;
                this.url = res.result.productPromoInfo.shortLinkUrl;
                this.reason = res.result.productPromoReason;
                this.CouponPrice = res.result.productCouponPrice
                this.taoCode = res.result.productPromoInfo.taoToken
            })
        },
        methods: {
            copy: function() {
                this.pastle = true;
                var _vue = this;
                setTimeout(function() {
                    _vue.pastle = false;
                }, 2000)
            }
        },
        mounted: function() {
            new Swiper('.content', {
                spaceBetween: 15,
                freeMode: true,
                slidesPerView: 4,
                initialSlide: this.curr_indx,
                // centeredSlides: true,
                onClick: function(swiper) {
                    // var indx = swiper.clickedIndex;
                }
            });
            var clipboard = new Clipboard('.btn');
        }
    }
</script>

<style lang="less">
    .detail {
        height: 100%;
        background: #fff;
    }
    
    #detail_panel.detail_panel {
        padding: 15px;
        background: #fff;
        color: #35353f;
        font-size: 13px;
        line-height: 25px;
        img {
            width: 100%;
        }
        .content {
            position: relative;
            .info {
                float: left;
            }
        }
        .header {
            font-family: PingFang-SC-Regular!important;
            color: #35353f;
            font-size: 15px;
        }
        .price {
            font-family: PingFang-SC-Medium!important;
            font-size: 18px;
            color: #fd472b;
            width: 60%;
            float: left;
        }
        .dicount {
            font-size: 11px;
            color: #90909b;
        }
        .num {
            font-size: 11px;
            color: #90909b;
            margin-left: 22px;
        }
        .ticket-panel {
            float: right;
            width: 60px;
            line-height: 15px;
            height: 39px;
            text-align: center;
            .amount {
                font-family: PingFang-SC-Regular!important;
                font-size: 10px;
                border: 2px solid #fb8e00;
                border-radius: 0px 0px 5px 5px;
                background: #fb8e00;
                color: #fff;
            }
            .header {
                color: #fb8e00;
                font-family: PingFang-SC-Regular!important;
                font-size: 10px;
                border: 2px solid #fb8e00;
                border-radius: 5px 5px 0px 0px;
            }
        }
    }
    
    .modal {
        font-size: 15px;
        position: fixed;
        top: 45%;
        width: 50%;
        height: 75px;
        text-align: center;
        background: rgba(0, 0, 0, 0.53);
        color: #fff;
        padding: 30px;
        /* margin: 0 20%; */
        left: 25%;
        border-radius: 5px;
    }
    
    .reason {
        font-family: PingFang-SC-Regular;
        padding: 10px 15px;
        background: #fff;
        color: #90909b;
        font-size: 10px;
        width: 100%;
        float: left;
        border-top: 1px dashed #dedede;
    }
    
    .opt_panel {
        margin-bottom: 50px;
        line-height: 23px;
        font-family: PingFang-SC-Medium!important;
        color: #fd472b;
        font-size: 14px;
        margin-top: 35px;
        border-top: 5px solid #eee;
        padding: 20px;
        text-align: center;
        background: #fff;
        span {
            line-height: 13px;
        }
    }
    
    .tao {
        font-size: 13px;
        color: #333;
    }
    
    .footer {
        position: fixed;
        background: #fd472b;
        bottom: 0px;
        width: 100%;
        span {
            color: #fff;
            width: 100%;
            text-align: center;
            display: inline-block;
            font-family: PingFang-SC-Medium!important;
            font-size: 15px;
            margin: 15px 0;
            a {
                color: #fff!important;
            }
        }
        button {
            color: #fff;
            background: #fd472b;
            width: 100%;
            text-align: center;
            display: inline-block;
            font-family: PingFang-SC-Medium!important;
            font-size: 15px;
            margin: 15px 0;
        }
    }
</style>