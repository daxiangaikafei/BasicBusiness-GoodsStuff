<template>
    <div class="point-topic">
        <div class="bg-top">
            <div class="total">
                <div class="total-exchange">
                    <div class="exchange-title">积分</div>
                    <div class="exchange-value"> {{ exchange }}</div>
                </div>
            </div>
            <div class="exchange">
                <div class="exchange-button" @click="handleExchange">
                    兑换
                </div>
            </div>
        </div>
        <div class="alipay-area">
            <div class="alipay-acc"><span class="alipay-acc-left">支付宝账号:</span><span class="alipay-acc-right">{{ alipayAccount }}</span></div>
            <div class="update-acc" @click="handlePayBundle">修改</div>
        </div>
        <div class="point" v-load-more="loaderMore">
            <div class="point-title" v-if="pointList.length != 0">兑换明细</div>
            <div class="point-item" v-for="item in pointList">
                <div class="point-content">
                    <div class="point-left">
                        <div class="point-order"><span>兑换单号:</span><span>{{ item.sn }}</span></div>
                        <div class="point-number"><span>兑换账号:</span><span>{{ item.account }}</span></div>
                        <div class="point-reason"><span>{{ item.createTime }}</span></div>
                    </div>
                    <div class="point-right">
                        <div class="point-status" v-bind:class="{'status-green': item.statusText == '待兑换','status-red': item.statusText == '兑换失败'}">{{ item.statusText }}</div>
                        <div class="point-value"><span>兑换:</span>{{ item.point }}</div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="pay-bundle-box-container" v-if="isPayBundleBoxShow">
            <div class="pay-bundle-box">
                <i class="icon icon-close" @click="handlePayBundleBoxClose"></i>                
                <i class="icon icon-alipay"></i>
                <h4>修改支付宝账号</h4>
                <p>只有添加完账号之后才能兑换积分，建议直接打开支付宝，直接复制账号哦</p>
                <input type="text" v-model="payBundleForm.account" ref="accountInput" placeholder="请输入支付宝账号">
                <input type="text" v-model="payBundleForm.accountConfirm" ref="accountConfirmInput" placeholder="再次输入支付宝账号">
                <span class="warning" v-if="isPayBundleBoxWarn">
                    <i class="icon icon-warning"></i>
                    {{payBundleBoxWarn}}
                </span>
                <div class="btns">
                    <div class="btn" @click="handlePayBundleBoxClose">取消</div>
                    <div class="btn" @click="handlePayBundleBoxCommit">确定</div>
                </div>  
            </div>
        </div>
        <div class="exchange-box-container" v-if="isExchangeBoxShow">
            <div class="exchange-box">
                <i class="icon icon-close" @click="handleExchangeBoxClose"></i>                
                <i class="icon icon-alipay"></i>
                <h4>兑换集分宝</h4>
                <p>100积分=100集分宝，积分只能兑换100的整数倍</p>
                <input type="number" v-model="exchangeForm.exchange" ref="exchangeInput">
                <span class="warning" v-if="isExchangeBoxWarn">
                    <i class="icon icon-warning"></i>
                    {{exchangeBoxWarn}}
                </span>
                <div class="btns">
                    <div class="btn" @click="handleExchangeBoxClose">取消</div>
                    <div class="btn" @click="handleExchangeBoxCommit">确定</div>
                </div>  
            </div>
        </div>
        <p v-if="loading" class="empty_data">加载中</p>  
        <p v-if="touchend && !beforeTouch" class="empty_data">没有更多了</p> 
        <error-message v-bind="{pastle: pastle,message: message}"></error-message>
    </div>
</template>
<script>
var env = 'product'; // set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
import {
    loadMore,
    getImgPath
} from '../../components/mixin'
export default {
    name: 'app',
    components: {
        
    },
    data(){
        return {
            pastle:false,
            message: '',
            exchange: 0,
            alipayAccount: '',
            pastle: false,
            message: '',
            isPayBundleBoxShow: false,
            isPayBundleBoxWarn: false,
            canPayBundleBoxCommit: false,               
            payBundleBoxWarn: '',
            payBundleForm: {
                account: '',
                accountConfirm: ''
            },
            pointList: [

            ],
            page: 1,
            loading: false,
            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载,
            touchend: false, //没有更多数据
            offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
            beforeTouch: true,
            isExchangeBoxShow: false,
            isExchangeBoxWarn: false,
            canExchangeBoxCommit: false,               
            exchangeBoxWarn: '',
            exchangeForm: {
                exchange: '',
            },
        }
    },
    mixins: [loadMore, getImgPath],
    methods:{
        setMessage(message){
            var _vue = this;
            this.pastle = true;
            this.message = message;
            setTimeout(function(){
                _vue.pastle = false;
                _vue.message = '';
            },2000)
        },
        getMoreExchangeList(){
            var _vue = this;
            this.preventRepeatReuqest = true;
            this.page++;
            _vue.$ajax.get(ApiControl.getApi(env, "exchangeList"), {
                params:{
                    pageNo: _vue.page
                }
            }).
            then(res => {
                if(res.data.code == 0){
                    // _vue.pointList = res.data.data;
                    for (var i in res.data.result)
                        _vue.pointList.push(res.data.result[i]);
                    setTimeout(function() {
                        _vue.loading = false;
                        _vue.preventRepeatReuqest = false;
                        if (res.data.result.length == 0 || res.data.result.length < 10) {
                            _vue.touchend = true;
                            return
                        }
                    }, 500);
                }else{
                    // _vue.setErrorMessage(res.data.message);
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
            this.beforeTouch = false;
            this.getMoreExchangeList();
        },
        handlePayBundle() {
            this.isPayBundleBoxShow = true
        },
        handlePayBundleBoxClose() {
            this.isPayBundleBoxShow = false
            this.payBundleBoxWarn = ''
            this.payBundleForm.account = ''
            this.payBundleForm.accountConfirm = ''
            
        },
        handlePayBundleBoxCommit() {
            if(!this.payBundleForm.account || this.payBundleForm.account == '') {
                this.payBundleBoxWarn = '请输入账号'
                this.$refs.accountInput.focus()
                this.isPayBundleBoxWarn = true
            } else if(!this.payBundleForm.accountConfirm || this.payBundleForm.accountConfirm == '') {
                this.payBundleBoxWarn = '请再次输入账号'
                this.$refs.accountConfirmInput.focus()                  
                this.isPayBundleBoxWarn = true
            } else if(this.payBundleForm.account !== this.payBundleForm.accountConfirm) {
                this.payBundleBoxWarn = '两次账号输入不一致'
                this.$refs.accountConfirmInput.focus()
                this.isPayBundleBoxWarn = true
            } else {
                this.payBundleBoxWarn = ''
                this.isPayBundleBoxWarn = false
                var _vue = this;
                _vue.$ajax.post(ApiControl.getApi(env, "setAlipay"), {
                    alipay: _vue.payBundleForm.account
                }).
                then(res => {
                    if(res.data.code == 0){
                        _vue.isPayBundleBoxShow = false;
                        _vue.setMessage('修改成功');
                        setTimeout(function(){
                            window.location.reload()
                        },1000);  
                    }else{
                            _vue.isPayBundleBoxShow = false;
                            // _vue.setMessage('呃，出错了，请稍后重试');
                            _vue.setMessage(res.data.message);
                        // _vue.setErrorMessage(res.data.message);
                    }
                    
                })
            }
        },
        handleExchange() {
            this.isExchangeBoxShow = true
        },
        handleExchangeBoxClose() {
            this.isExchangeBoxShow = false;
            this.isExchangeBoxWarn = false;
            this.exchangeBoxWarn = ''
            this.exchangeForm.account = ''
            this.exchangeForm.accountConfirm = ''
            
        },
        handleExchangeBoxCommit() {
            if(this.exchangeForm.exchange == '') {
                this.exchangeBoxWarn = '请输入要兑换的数字积分'
                this.$refs.exchangeInput.focus()
                this.isExchangeBoxWarn = true
            }else {
                if(! /^[1-9]\d*00$/g.test(this.exchangeForm.exchange)){
                    this.exchangeBoxWarn = '请输入100的整数倍积分'
                    this.$refs.exchangeInput.focus()
                    this.isExchangeBoxWarn = true
                }else if(this.exchangeForm.exchange > this.exchange){
                    this.exchangeBoxWarn = '输入金额只能不大于可兑换积分'
                    this.$refs.exchangeInput.focus()
                    this.isExchangeBoxWarn = true
                }else{
                    this.exchangeBoxWarn = ''
                    this.isExchangeBoxWarn = false
                    var _vue = this;
                    _vue.$ajax.post(ApiControl.getApi(env, "exchangeSubmit"), {
                        point: parseInt(_vue.exchangeForm.exchange)
                    }).
                    then(res => {
                        if(res.data.code == 0){
                            _vue.isExchangeBoxShow = false;
                            _vue.setMessage('您已成功提交申请，我们会在3~5个工作日核实并发放');
                            
                            setTimeout(function(){
                                window.location.reload();
                            },3000)                            
                            // after reset success, refresh user info interface
                            // _vue.$ajax.get(ApiControl.getApi(env, "getUserInfo"), {
                            // }).
                            // then(res => {
                            //     if(res.data.code == 0){
                            //         _vue.alipayAccount = res.data.result.alipay;
                            //         _vue.exchange = res.data.result.balance;
                            //     }else{
                            //         _vue.setMessage(res.data.message);
                            //     }
                            // })
                        }else{
                            _vue.isExchangeBoxShow = false;
                            _vue.setMessage(res.data.message);
                        }
                    })
                }
            }
        }
    },
    created(){
        var _vue = this;
        _vue.$ajax.get(ApiControl.getApi(env, "getUserInfo"), {
        }).
        then(res => {
            if(res.data.code == 0){
                _vue.alipayAccount = res.data.result.alipay;
                _vue.exchange = res.data.result.balance;
            }else{
                _vue.setMessage(res.data.message);
            }
            
        })

        _vue.$ajax.get(ApiControl.getApi(env, "exchangeList"), {
        }).
        then(res => {
            if(res.data.code == 0){
                _vue.pointList = res.data.result;
                if (res.data.result.length == 0 || res.data.result.length < 10) {
                    _vue.touchend = true;
                    _vue.beforeTouch = true;
                }
            }else{
                // _vue.setErrorMessage(res.data.message);
            }
            
        })
    }
}
</script>

<style scoped lang="less">
@import "../../static/style/layout-mixin";
@btnColor: #fc3f5a;
.point-topic{
    background-color: #fff;
}

/* 列表style */
.bg-top{
    height: 160px;
    .total{
        height: 120px;
        background: #fff;
        padding-top: 15px;
        .total-exchange{
            width: 97.5px;
            height: 97.5px;
            border-radius: 97.5px;
            margin: 0 auto;
            background: url('../../static/images/points/exchange-circle.png') no-repeat center;
            background-size: contain;
            text-align: center;
            .exchange-title{
                padding-top:20px;
                font-size: 14px;
                color: #ffebeb;
            }
            .exchange-value{
                font-size: 20px;
                color: #ffffff;
            }
        }
    }
    .exchange{
        height: 40px;
        background: url('../../static/images/points/bg-exchange.png') no-repeat center center;
        background-size: contain;
        .exchange-button{
            height: 27px;
            width: 55px;
            line-height: 25px;
            font-size: 14px;
            color: #ff5a00;
            border: 1px solid #ff5a00;
            border-radius: 8px;
            margin: 0 auto;
            text-align: center;
        }
    }
    .query{
        text-align: center;
        width: 67px;
        height: 67px;
        position: absolute;
        left: 50%;
        margin-left: -34px;
        color: #fff;
        top: 70px;
        line-height: 67px;
        background: rgb(38,157,252);
        border-radius: 67px;
        font-size: 20px;
    }
}
.alipay-area{
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    .alipay-acc{
        float: left;
        line-height: 45px;
        .alipay-acc-left{
            float: left;
        }
        .alipay-acc-right{
            overflow: hidden;
            display: block;
            float: left;
            max-width: 150px;
            text-overflow: ellipsis;
            max-height: 45px;
            line-height: 45px;
        }
    }
    .update-acc{
        float: right;
        width: 55px;
        border: 1px solid #eee;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        text-align: center;
        border-radius: 5px;
        margin-top: 3px;
    }
}
.point{
    .point-title{
        padding: 0 20px 0;
        margin: 20px;
        line-height: 1px;
        border-left: 100px solid #ddd;
        border-right: 100px solid #ddd;
        text-align: center;
        color: #b3bac1;
    }
    .point-item{
        padding: 0 20px 20px 20px;
        border-bottom: 1px solid #ddd;
        .point-time{
            border-bottom: 1px solid #ddd;
            height: 40px;
            line-height: 40px;
        }
        .point-content{
            overflow: hidden;
            // margin-bottom: 20px;
            .point-left{
                float: left;
                .point-order{
                    font-size: 12px;
                    color: #2d3c49;
                    line-height: 28px;
                    height: 28px;
                    margin-top: 10px
                }
                .point-number{
                    line-height: 20px;
                    margin-top: 5px;
                    font-size: 12px;
                }
                .point-reason{
                    color: #eee;
                    line-height: 20px;
                    margin-top: 5px;
                    font-size: 12px;
                }
            }
            .point-right{
                float: right;
                padding-top: 20px;
                text-align: right;
                font-size: 12px;
                color: #2d3c49;
                .point-value{
                    line-height: 40px;
                    float: right;
                    vertical-align: middle;
                }
                .status-green{
                    color: green;
                }
                .status-red{
                    color: red;
                }
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
        background: url("../../static/images/icon-alipay.png") no-repeat ;
        background-size: contain;
    }
    .icon.icon-close {
        width: 25px;
        height: 25px;
        background: url("../../static/images/icon-close.png") no-repeat ;
        background-size: contain;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .icon.icon-warning {
        width: 12px;
        height: 12px;
        background: url("../../static/images/icon-warning.png") no-repeat ;
        background-size: contain;
    }
}

.exchange-box-container {
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
    .exchange-box {
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
        input[type=number] {
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
        background: url("../../static/images/points/icon-exchange.png") no-repeat ;
        background-size: contain;
    }
    .icon.icon-close {
        width: 25px;
        height: 25px;
        background: url("../../static/images/icon-close.png") no-repeat ;
        background-size: contain;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .icon.icon-warning {
        width: 12px;
        height: 12px;
        background: url("../../static/images/icon-warning.png") no-repeat ;
        background-size: contain;
    }
}
.empty_data {
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    color: #666;
    font-family: PingFang-SC-Regular!important;
    padding-bottom: 3.5rem;
    padding-top: 1rem;
}
</style>