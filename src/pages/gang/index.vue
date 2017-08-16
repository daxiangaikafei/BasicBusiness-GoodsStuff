<!-- 个人中心页面 -->
<template>
	<div class="profile_main">
		<!--用户信息 start-->
		<div class="index_info">
			<div class="info_logo">
				<img :src="headimgurl" />
			</div>
			<div class="info_name">	
				<p>{{nickname}}</h3>
                <p>ID:{{userId}}</h3>
				<p>有效邀请人数: {{invitationCount}}人</p>
			</div>
		</div>
		<!--用户信息 end-->
		<div class="index_list">
			<div class="list_title">
                <span class="drawcontent">可提现金额:<span style="color:#f81948"> {{ drawAmount }}</span>元</span>
					<!--<router-link :to="'/withdraw'">-->
						<div class="drawlink">   
                        <span class="opt" @click="withdraw">立即提现</span>
                        </div>
					<!--</router-link>-->
			</div>
            <router-link :to="'/partnerRule'">
			<div class="list_item">
				<div class="list_icon icon_order"></div>
				<h3>合伙人规则</h3>
				<span><i class="icon_right"></i></span>
			</div>
            </router-link>
			<div class="list_item" v-on:click='extendsToggle'>
				<div class="list_icon icon_eye"></div>
				<h3>历史累计</h3>
                <span><i :class="!extendMark?'icon_right':'icon_down'"></i></span>
			</div>
            <transition name="router-fade" mode="out-in">
            <div class="extendPanel" v-if="extendMark">
                <div>累计提现: <span>{{ drawTotal }}元</span></div>
                <div>累计邀请收益: <span>{{ invitationProfitTotal }}元</span></div>
                <div>累计平台奖励: <span>{{ giftTotal }}元</span></div>
            </div>
            </transition>
            <div class="incomepanel">
            <div>本月结算收入<p><font style="font-size:17px;font-weight: 400">￥{{currentMonthExpectIncome.toString().split(".")[0]}}.</font>{{currentMonthExpectIncome.toString().split(".")[1]}}</p></div>
            <div>上月结算收入<p><font style="font-size:17px;font-weight: 400">￥{{lastMonthExpectIncome.toString().split(".")[0]}}.</font>{{lastMonthExpectIncome.toString().split(".")[1]}}</p></div>
            </div>
            <div class="period-switch">
                <div :class="period==0?'active':''" @click="changePeriod(0)">今日</div>
                <div :class="period==1?'active':''" @click="changePeriod(1)">昨日</div>
            </div>
            <div class="period-panel">
                <div>下单人数<p>{{period==0?todaySubOrderNum:yesterdaySubOrderNum}}</p></div>
                <div>付款笔数<p>{{period==0?todaySubPaidNum:yesterdaySubPaidNum}}</p></div>
                <div>成交收入<p>￥{{period==0?todayExpectIncome:yesterdayExpectIncome}}</p></div>
            </div>
		</div>
    <error-message v-bind="{pastle: pastle,message: message}"></error-message>
	</div>
	
</template>
<script>
    // import dialogList from '../../components/dialogContainer'
    var env = 'product'; // set env type for debug or product
    // import fetch from '../../config/fetch'
    import ajax from '../../config/ajax'
    import utils from '../../config/utils'
    import ApiControl from '../../config/envConfig.home'
    import {
        mapState,
        mapMutations
    } from 'vuex';
    export default {
        name: 'profile',
        data() {
            return {
                nickname: "",
                headimgurl: "",
                userId: "",
                pastle: false,
                message: '',
                balance: '',
                exchanged: '',
                isPartner: false,
                drawAmount: 0,
                drawTotal: 0,
                invitationProfitTotal: 0,
                giftTotal: 0,
                invitationCount: 0,
                currentMonthExpectIncome: 0,
                lastMonthExpectIncome: 0,
                todaySubOrderNum: 0,
                todaySubPaidNum: 0,
                todayExpectIncome: 0,
                yesterdayExpectIncome: 0,
                yesterdaySubOrderNum: 0,
                yesterdaySubPaidNum: 0,
                isPayBundleBoxWarn: false,
                canPayBundleBoxCommit: false,
                extendMark: false,
                period: 0,
                payBundleBoxWarn: '',
                payBundleForm: {
                    account: '',
                    accountConfirm: ''
                }
            }
        },
        created: function() {
            var _vue = this;
            _vue.$ajax.get(ApiControl.getApi(env, "getAppId"), {

            }).
            then(res => {
                if (res.data.code == 0) {
                    var appId = res.data.result.appid;
                    // _vue.appId = res.data.result.appid;
                    _vue.setAppId({
                        appId
                    });
                }
                //检测用户是否登录
                _vue.$ajax.get(ApiControl.getApi(env, "checkLogin"), {}).
                then(res => {
                    if (res.data.code != 0) {
                        console.log(_vue.appId);
                        //跳转至微信授权页面：https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
                        //参数解释如下：state为重定向后需要添加的参数，redirect_url为重定向地址，我们这边统一为/login
                        // window.location.href = '/login?pageType=stuff';
                        var redirectUri = window.location.origin + window.location.pathname + '#/login?pageType=' + _vue.$route.path.split('/')[1];
                        redirectUri = encodeURIComponent(redirectUri);
                        // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + _vue.appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + _vue.appId + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
                    } else {
                        _vue.$ajax.get(ApiControl.getApi(env, "partner"), {

                            })
                            .then(function(res) {
                                if (res.data.code == 0) {
                                    _vue.nickname = res.data.result.nickname;
                                    _vue.userId = res.data.result.userId;
                                    _vue.headimgurl = res.data.result.headimgurl;
                                    _vue.isPartner = res.data.result.isPartner == 'Y' ? true : false;
                                    _vue.drawAmount = _vue.parseMoney(res.data.result.drawAmount, 2);
                                    _vue.exchanged = res.data.result.drawAmount;
                                    _vue.drawTotal = _vue.parseMoney(res.data.result.drawTotal, 2);
                                    _vue.invitationProfitTotal = _vue.parseMoney(res.data.result.invitationProfitTotal, 2);
                                    _vue.giftTotal = _vue.parseMoney(res.data.result.giftTotal, 2);
                                    _vue.invitationCount = '' + res.data.result.invitationCount;
                                    _vue.lastMonthExpectIncome = _vue.parseMoney(res.data.result.lastMonthExpectIncome, 2);
                                    _vue.currentMonthExpectIncome = _vue.parseMoney(res.data.result.currentMonthExpectIncome, 2);
                                    _vue.todaySubOrderNum = res.data.result.todaySubOrderNum;
                                    _vue.todaySubPaidNum = res.data.result.todaySubPaidNum;
                                    _vue.todayExpectIncome = _vue.parseMoney(res.data.result.todayExpectIncome, 2);
                                    _vue.yesterdaySubOrderNum = res.data.result.yesterdaySubOrderNum;
                                    _vue.yesterdaySubPaidNum = res.data.result.yesterdaySubPaidNum;
                                    _vue.yesterdayExpectIncome = _vue.parseMoney(res.data.result.yesterdayExpectIncome, 2);
                                    // var regx = /(\d)(?=(\d{3})+(?!\d))/g;
                                    // _vue.balance = points.replace(regx, '$1,');
                                } else if (res.data.code == 200) {
                                    _vue.setErrorMessage(res.data.message);
                                } else {
                                    _vue.setErrorMessage(res.data.message);
                                }
                            });
                    }
                })
            })


        },
        methods: {
            ...mapMutations([
                'setAppId'
            ]),
            extendsToggle: function() {
                this.extendMark = !this.extendMark;
            },
            setErrorMessage: function(message) {
                var _vue = this;
                this.pastle = true;
                this.message = message;
                setTimeout(function() {
                    _vue.pastle = false;
                    _vue.message = '';
                }, 2000)
            },
            handleExchange() {
                if (!this.isPayBundle) {
                    this.isPayBundleBoxShow = true
                    return
                } else {
                    this.$router.push('/exchange');
                }
            },
            handlePayBundleBoxClose() {
                this.isPayBundleBoxShow = false
                this.payBundleBoxWarn = ''
                this.payBundleForm.account = ''
                this.payBundleForm.accountConfirm = ''

            },
            withdraw() {
                if (this.invitationCount <= 6) this.setErrorMessage('有效邀请人数超过6才能提现');
                else if (this.exchanged == 0) this.setErrorMessage('您好，金额是0，不能提现。');
                else this.$router.push('/withdraw');
            },
            changePeriod(num) {
                this.period = num;
            },
            parseMoney(s, n) {
                var j = n;
                n = n > 0 && n <= 20 ? n : 2;
                s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                var l = s.split(".")[0].split("").reverse(),
                    r = s.split(".")[1];
                var t = "";
                for (var i = 0; i < l.length; i++) {
                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                }
                return t.split("").reverse().join("") + (j == 0 ? "" : ("." + r));
            }
        },
        mounted() {

        }
    }
</script>
<style lang="less" scoped>
    @import "../../static/style/layout-mixin";
    @btnColor: #fc3f5a;
    body {
        height: 100%;
        font-family: 'PingFangSC-Regular';
        .profile_main {
            div,
            span,
            header,
            footer,
            nav,
            section,
            aside,
            article,
            ul,
            dl,
            dt,
            dd,
            li,
            a,
            p,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            i,
            b,
            textarea,
            button,
            input,
            select,
            figure,
            figcaption {
                font-family: 'PingFangSC-Regular';
            }
            height: 100%;
            line-height: 100%;
            background: #ececec;
            width: 100%;
            float: left;
            .index_info {
                width: 100%;
                height: 123px;
                color: #fff;
                background: #fe5668;
                background-size: cover;
                .flex;
                .flex-wrap;
                & * {
                    color: #fff;
                }
                .info_logo {
                    padding: 0px 15px;
                    img {
                        width: 50px;
                        height: 50px;
                        display: inline-block;
                        border-radius: 50%;
                        -webkit-border-radius: 50%;
                        background-color: #ccc;
                        margin: 20px 0 0;
                        box-shadow: 0 0 0 2px rgba(255, 255, 255, .6);
                        box-sizing: border-box;
                    }
                }
                .info_name {
                    margin: 20px 0 0;
                    h3 {
                        font-size: 15px;
                        line-height: 1.8;
                    }
                    p {
                        font-size: 13px;
                        line-height: 1.8;
                    }
                    p:first-child {
                        font-size: 15px;
                        line-height: 1.8;
                    }
                    p:last-child {
                        margin-top: 5px;
                    }
                }
                .info-integral {
                    width: 100%;
                    .flex;
                    .flex-justify;
                    padding: 0 15px;
                    .integral-total {
                        font-size: 13px;
                    }
                    .integral-exchange {
                        font-size: 12px;
                        span {
                            padding-right: 6px;
                        }
                        & * + * {
                            border-left: 1px solid #fff;
                            padding-left: 10px;
                        }
                    }
                }
            }
            .index_list {
                float: left;
                width: 100%;
                background: #fff;
                h3 {
                    font-weight: 400;
                }
                .list_title {
                    height: 60px;
                    line-height: 54px;
                    vertical-align: middle;
                    padding: 0px 15px;
                    border-bottom: 5px solid #ececec;
                    h3 {
                        color: #35353f;
                        font-size: 15px;
                        float: left;
                    }
                    a {
                        float: right;
                        font-size: 13px;
                        color: #666666;
                        height: 57px;
                    }
                    .drawlink {
                        float: right;
                        font-size: 13px;
                        color: #666666;
                        height: 57px;
                    }
                    span.drawcontent {
                        max-width: 205px;
                        display: inline-block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    span.opt {
                        padding: 5px 13px;
                        border: 1px solid #f71c4a;
                        color: #f71c4a;
                        font-size: 14px;
                        border-radius: 5px;
                    }
                    .icon_right {
                        width: 8px;
                        height: 14px;
                        line-height: 14px;
                        vertical-align: middle;
                        background-image: url(../../static/images/icon_rt.jpg);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        margin-left: 8px;
                        margin-top: -3px;
                        display: inline-block;
                    }
                }
                .list_item {
                    height: 49px;
                    line-height: 49px;
                    vertical-align: middle;
                    border-bottom: 1px solid #ececec;
                    padding: 0px 15px;
                    .list_icon {
                        width: 19px;
                        height: 19px;
                        display: inline-block;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        margin-top: 15px;
                        margin-bottom: 10px;
                        float: left;
                    }
                    .icon_order {
                        background-image: url(../../static/images/partner/partner-rules-icon.png);
                    }
                    .icon_eye {
                        background-image: url(../../static/images/partner/history.png);
                    }
                    .icon_invite {
                        background-image: url(../../static/images/icon-partner.png);
                    }
                    .icon_member {
                        background-image: url(../../static/images/icon_member.png);
                    }
                    .icon_right {
                        width: 8px;
                        height: 14px;
                        line-height: 14px;
                        vertical-align: middle;
                        display: inline-block;
                        background-image: url(../../static/images/icon_rt.jpg);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        margin-left: 8px;
                        margin-top: -3px;
                        -webkit-transition-duration: 0.3s;
                        -webkit-transition-timing-function: ease;
                    }
                    .icon_down {
                        width: 8px;
                        height: 14px;
                        line-height: 14px;
                        vertical-align: middle;
                        background-image: url(../../static/images/icon_rt.jpg);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        margin-left: 8px;
                        margin-top: -3px;
                        display: inline-block;
                        -webkit-transition-duration: 0.3s;
                        -webkit-transition-timing-function: ease;
                        transform: rotate(90deg);
                        -ms-transform: rotate(90deg);
                        /* Internet Explorer */
                        -moz-transform: rotate(90deg);
                        /* Firefox */
                        -webkit-transform: rotate(90deg);
                        /* Safari 和 Chrome */
                        -o-transform: rotate(90deg);
                    }
                    span {
                        color: #666;
                        font-size: 13px;
                        float: right;
                    }
                    h3 {
                        color: #35353f;
                        font-size: 14px;
                        float: left;
                        margin-left: 10px;
                    }
                    .partner {
                        color: #FA4935;
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
                left: 25%;
                border-radius: 5px;
            }
            .extendPanel {
                padding: 10px 20px;
                transition: all .3s ease;
                div {
                    font-size: 13px;
                    margin-left: 30px;
                    padding-top: 10px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #ececec;
                }
                span {
                    color: #f71c4a;
                }
            }
            .incomepanel {
                display: flex;
                border-bottom: 1px solid #ececec;
                div {
                    font-size: 14px;
                    color: #4f4345;
                    padding: 15px;
                    flex-grow: 1;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    p {
                        font-family: PingFangSC-Medium;
                        margin-top: 10px;
                        color: #FA4935;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
            .period-switch {
                display: flex;
                div {
                    font-size: 13px;
                    font-family: 'PingFangSC-Regular';
                    margin: 13px;
                    text-align: center;
                    flex-grow: 1;
                    width: 0;
                    color: #4f4345;
                    p {
                        margin-top: 10px;
                        color: #FA4935;
                    }
                }
                div:first-child {
                    border-right: 1px solid #e1dedf;
                }
                div.active {
                    font-size: 15px;
                    color: #f71c4a;
                }
            }
            .period-panel {
                display: flex;
                font-family: 'PingFangSC-Regular';
                div {
                    flex-grow: 1;
                    width: 0;
                    padding: 15px;
                    font-size: 13px;
                    color: #4f4345;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    p {
                        margin-top: 10px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .pay-bundle-box-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .6);
            z-index: 100;
            .flex;
            .flex-center;
            .flex-align-center;
            .pay-bundle-box {
                background: #fff;
                width: 80%;
                padding: 15px 5%;
                text-align: center;
                border-radius: 10px;
                position: relative;
                h4 {
                    font-size: 15px;
                    margin: 10px 0 5px;
                    font-weight: 400;
                }
                p {
                    font-size: 12px;
                    color: #8a8dad;
                    text-align: left;
                }
                input[type=text] {
                    width: 100%;
                    display: block;
                    border: 1px solid #babac5;
                    border-radius: 5px;
                    margin: 12px 0;
                    font-size: 13px;
                    line-height: 35px;
                    box-sizing: border-box;
                    padding: 0 10px;
                    &::-webkit-input-placeholder {
                        color: #b3bac1;
                    }
                    &:focus {
                        border-color: #18a3ff;
                    }
                }
                .warning {
                    font-size: 12px;
                    color: #f62f42;
                    .flex;
                    .flex-align-center;
                    .icon {
                        margin-right: 2px;
                    }
                    & + .btns {
                        margin-top: 12px;
                    }
                }
                .btns {
                    margin-top: 25px;
                    .flex;
                    .flex-justify;
                    .btn {
                        color: @btnColor;
                        border: 1px solid @btnColor;
                        border-radius: 5px;
                        width: 45%;
                        font-size: 13px;
                        line-height: 40px;
                        &:last-child {
                            background: @btnColor;
                            color: #fff;
                        }
                    }
                }
            }
            .icon {
                display: inline-block;
            }
            .icon.icon-alipay {
                width: 60px;
                height: 60px;
                background: url("../../static/images/icon-alipay.png") no-repeat;
                background-size: contain;
            }
            .icon.icon-close {
                width: 25px;
                height: 25px;
                background: url("../../static/images/icon-close.png") no-repeat;
                background-size: contain;
                position: absolute;
                top: 5px;
                right: 5px;
            }
            .icon.icon-warning {
                width: 12px;
                height: 12px;
                background: url("../../static/images/icon-warning.png") no-repeat;
                background-size: contain;
            }
        }
    }
</style>