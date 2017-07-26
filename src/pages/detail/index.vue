<template>
<div class="detail">
   <div class='detail_panel' id='detail_panel'>
       <img :src="detail.productImg" alt="">
       <div class="content">
       <div class="header">{{detail.productTitle}}</div>
       <div class="price">
           <font style="color:#717171;font-size:12px;">券后价:</font>￥{{detail.price[0]}}<font style="color:#fd472b;font-size:13px;">.{{detail.price[1] == undefined ? '00' : detail.price[1]}}</font>
           <i v-if="detail.returnPoints && detail.returnPoints >= 0">返积分{{detail.returnPoints}}</i>
        </div>
       <div class="ticket-panel">
            <div class="header">包邮</div>
            <div class="amount">{{detail.productCouponPrice}}元优惠券</div>
       </div>
       <div class="info">
       <span class="dicount">在售价:{{detail.productPrice}}</span>
       <span class="num">已售:{{detail.productSales}}</span>
       </div>
       <div style="clear:both"></div>
       </div>
   </div>
       <div class="reason">推荐理由: {{detail.productPromoReason}}</div>
    <div class="tip">提示：淘宝天猫下单后，及时到用户中心绑定订单号拿奖励哦，其余电商没有特殊说明自动跟踪</div>
   <div class="opt_panel" v-if="detail.productSource!='jd'">
   <span class="title">长按框内>全选>复制</span>
   <span style="text-align: center;width: 100%;font-size: 13px;margin-top:10px;display: block;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none;
   ">打开「手机淘宝」即可「领取优惠券」并购买</span>
   <span class="tao" id="tao">{{detail.productPromoInfo.taoToken}}</span>
   </div>
   <div class="footer" :class="{unload: isUnload}">
       <a class="link" v-if="detail.productSource!='jd'&&!isWeixin" :href="detail.productPromoInfo.sclick"><span>链接购买</span></a>       
       <button class="btn" v-if="detail.productSource!='jd'&&IosClient" @click="copy" data-clipboard-target="#tao">一键复制</button>
       <button class="btn" v-if="detail.productSource!='jd'&&AndroidClient" @click="copy" v-bind:data-clipboard-text="detail.productPromoInfo.taoToken">一键复制</button>
       <!--<button class="btn" v-if="detail.productSource!='jd'&&" @click="copy" v-bind:data-clipboard-text="detail.productPromoInfo.taoToken">一键复制</button>-->
       <a v-if="detail.productSource=='jd'" :href="detail.productPromoInfo.shortLinkUrl"><span>立即购买</span></a>
       <!--<button class="btn" data-clipboard-text="这里是要复制的内容" aria-label="复制成功！">复制</button> -->
    </div>

    <error-message v-bind="{pastle: pastle,message: message}"></error-message>
</div>
</template>

<script>
    import Clipboard from '../../plugins/clipboard.min.js'
    import '../../plugins/swiper.min.js'
    import ajax from '../../config/ajax'
    import utils from '../../config/utils'
    import ApiControl from '../../config/envConfig.home'
    import getLoginUri from '../../config/loginConfig'
    import { mapMutations } from 'vuex';
    var env = 'product'; // set env type for debug or product
    export default {
        props: ['parseId'],
        data() {
            return {           
                detail: {
                    price: [],
                    productPromoInfo: {}
                },
                pastle: false,
                message: '',
                IosClient: false,
                AndroidClient: false,
                isWeixin: false,
                isUnload: true
            }
        },
        created: function() {
            var eventId = '首页';
            var label = '领券购买';
            this.IosClient = this.isiOS();
            this.AndroidClient = this.isAndroid();
            this.isWeixin = this.isWeixinBrowser()
            this.buryPoint({
                eventId,
                label
            });
            var _vue = this;
            _vue.$ajax.get(ApiControl.getApi(env, "couponDetail") + "/" + this.$route.query.id).
            then(res => {
                if(res.data.code == 0){
                    document.title = res.data.result.productTitle  
                    this.detail = res.data.result             
                    this.detail.price = priceSplit(res.data.result.productPriceDeductCoupon)                   
                    this.isUnload = false
                }else{
                    _vue.setMessage(res.data.message);
                }
            })
        },
        methods: {
            ...mapMutations([
                'buryPoint'
            ]),
            copy: function() {
                var eventId = '商品详情页';
                var label = '一键复制';
                this.buryPoint({
                    eventId,
                    label
                });
                this.setMessage('复制成功');
            },
            setMessage: function(message){
                var _vue = this;
                this.pastle = true;
                this.message = message;
                setTimeout(function(){
                    _vue.pastle = false;
                    _vue.message = '';
                },2000)
            },
            isAndroid: function() {
                if (navigator.userAgent.match(/Android/i)) {
                    return true
                }
                return false;
            },
            isiOS: function() {
                if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                    return true
                }
                return false;
            },
            isWeixinBrowser() { 
                return /micromessenger/i.test(navigator.userAgent)
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
            var _vue = this;
            var clipboard = new Clipboard('.btn');
        }
    }
    function priceSplit(price) {
        let priceArr = (''+price).split('.')
        if (priceArr[1].length < 2) {
            priceArr[1] += '0'
        }
        return priceArr
    }
</script>

<style lang="less">
	@import "../../static/style/layout-mixin";
    @highlightColor:#fd472b;
   .detail {
        min-height: 100%;
        background: #fff;
        padding-bottom: 20px;
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
            i {
                color: @highlightColor;
                border: 1px solid @highlightColor;
                border-radius: 5px;
                font-size: 12px;
                padding: 0 2px;
                margin-left: 5px;
            }
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
            min-width: 60px;
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
        border-top: 1px dashed #dedede;
        border-bottom: 5px solid #eee;
    }
    .tip {
        font-size: 12px;
        padding: 8px 10px;
        background: #FFF5DB;
        text-align: left;
    }
    .opt_panel {
        margin: 20px;
        margin-bottom: 50px;
        line-height: 23px;
        font-family: PingFang-SC-Medium!important;
        color: #fd472b;
        font-size: 14px;
        text-align: center;
        border: 1px solid #dedede;
        background: #fff;
        position: relative;
        span {
            line-height: 13px;
        }
        .title {
            color:#fd472b;
            width: 60%;
            position: absolute;
            text-align: center;
            left: 0px;
            top: -8px;
            background: #fff;
            margin: 0 20%;
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
        .flex;
        & > * {
            text-align: center;
            .flex-item-auto;
        }
        &.unload {
            visibility: hidden;
        }
        span {
            color: #fff;
            display: inline-block;
            font-family: PingFang-SC-Medium!important;
            font-size: 15px;
            margin: 15px 0;
            a {
                color: #fff!important;
            }
        }
        .link {
            text-align: center;
            background: #F98E25;
        }
        button {
            color: #fff;
            background: #fd472b;
            display: inline-block;
            font-family: PingFang-SC-Medium!important;
            font-size: 15px;
            margin: 15px 0;
        }
    }
</style>