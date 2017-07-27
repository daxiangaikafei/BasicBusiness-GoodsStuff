<template>
    <div class="point-topic">
        <div class="bg-top">
            <div class="flex">
                <div>
                    <input type="text" @click="openByDrop($event)" v-model="calendar3.display" readonly>
                </div>
            </div>

            <transition name="fade">
            <div class="calendar-dropdown3" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.show">
                <calendar :zero="calendar3.zero" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select"></calendar>
            </div>
            </transition>
            <div class="flex flex-right">
                <div>
                    <input type="text" @click="openByDropRight($event)" v-model="calendar4.display" readonly>
                </div>
            </div>

            <transition name="fade">
            <div class="calendar-dropdown4" :style="{'left':'70px','top':calendar4.top+'px'}" v-if="calendar4.show">
                <calendar :zero="calendar4.zero" :value="calendar4.value" :begin="calendar4.begin" :end="calendar4.end" @select="calendar4.select"></calendar>
            </div>
            </transition>
            <div class="query" @click="getDetail(calendar3.display,calendar4.display)">
                查询
            </div>
        </div>
        <div id="index_order" v-if="pointList.length == 0">
            <img src="../../static/images/points/no-records.png"/>
        </div>
        <div class="point" v-load-more="loaderMore">
            <div class="point-title" v-if="pointList.length != 0">积分明细</div>
            <div class="point-item" v-for="item in pointList">
                <div class="point-time"><span>变动时间:</span><span>{{ item.createTime }}</span></div>
                <div class="point-content">
                    <div class="point-left">
                        <div class="point-order"><span>流水号:</span><span>{{ item.sn }}</span></div>
                        <div class="point-number"><span>当前可兑换积分:</span><span>{{ item.balance }}</span></div>
                        <div class="point-reason"><span>变动原因:</span><span>{{ item.memo }}</span></div>
                    </div>
                    <div class="point-value" v-bind:class="[item.type == 1 ? 'value-green' : 'value-red']">{{ item.type == 1 ? '+' : '-' }}{{ item.point }}</div>
                </div>
            </div>
        </div>
        <p v-if="loading" class="empty_data">加载中</p>  
        <p v-if="touchend" class="empty_data">没有更多了</p> 
    </div>
</template>
<script>
var env = 'product'; // set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
import calendar from '../../components/baseComponents/calendar/calendar.vue'
import {
    loadMore,
    getImgPath
} from '../../components/mixin'
export default {
    name: 'app',
    components: {
        calendar
    },
    data(){
        return {
            calendar1:{
                value:[2018,2,16], //默认日期
                // lunar:true, //显示农历
                weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                events:{
                    '2018-2-14':'$408','2018-2-15':'$460','2018-2-16':'$500',
                },
                select(value){
                    console.log(value.toString());
                }
            },
            calendar3:{
                display:"选择开始日期",
                show:false,
                zero:true,
                value:[2017,7,24], //默认日期
                lunar:true, //显示农历
                select:(value)=>{
                    this.calendar3.show=false;
                    this.calendar3.value=value;
                    this.calendar3.display=value.join("-");
                }
            },
            calendar4:{
                display:"选择结束日期",
                show:false,
                zero:true,
                value:[2017,7,24], //默认日期
                lunar:true, //显示农历
                select:(value)=>{
                    this.calendar4.show=false;
                    this.calendar4.value=value;
                    this.calendar4.display=value.join("-");
                }
            },
            pointList: [],
            page: 1,
            loading: false,
            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载,
            touchend: false, //没有更多数据
            offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        }
    },
    mixins: [loadMore, getImgPath],
    methods:{
        openByDrop(e){
            this.calendar3.show=true;
            this.calendar3.left=e.target.offsetLeft+19;
            this.calendar3.top=e.target.offsetTop+70;
           
            e.stopPropagation();
            window.setTimeout(()=>{
                document.addEventListener("click",(e)=>{
                    this.calendar3.show=false;
                    document.removeEventListener("click",()=>{},false);
                },false);
            },1000)
        },
        openByDropRight(e){
            this.calendar4.show=true;
            this.calendar4.left=e.target.offsetLeft+19;
            this.calendar4.top=e.target.offsetTop+70;
           
            e.stopPropagation();
            window.setTimeout(()=>{
                document.addEventListener("click",(e)=>{
                    this.calendar4.show=false;
                    document.removeEventListener("click",()=>{},false);
                },false);
            },1000)
        },
        openByDialog(){
            this.calendar4.show=true;
        },
        closeByDialog(){
            this.calendar4.show=false;
        },
        getDetail(start,end){
            var _vue = this;
            if(start != '选择开始日期' && end != '选择结束日期'){
                _vue.$ajax.get(ApiControl.getApi(env, "pointDetail"), {
                        params:{
                            startTime: start,
                            endTime: end,
                            pageNo: 1
                        }
                }).
                then(res => {
                    if(res.data.code == 0){
                        _vue.pointList = res.data.result;
                    }else{
                        // _vue.setErrorMessage(res.data.message);
                    }
                    
                })
            }
            
        },
        getMoreDetail(){
            var start = this.calendar3.display;
            var end = this.calendar4.display
            this.preventRepeatReuqest = true;
            this.page++;
            var _vue = this;
            if(start != '选择开始日期' && end != '选择结束日期'){
                _vue.$ajax.get(ApiControl.getApi(env, "pointDetail"), {
                        params:{
                            startTime: start,
                            endTime: end,
                            pageNo: _vue.page
                        }
                }).
                then(res => {
                    if(res.data.code == 0){
                        // _vue.pointList = res.data.data;
                        for (var i in res.data.data)
                            _vue.pointList.push(res.data.data[i]);
                        setTimeout(function() {
                            _vue.loading = false;
                            _vue.preventRepeatReuqest = false;
                            if (res.data.data.length == 0 || res.data.data.length < 10) {
                                _vue.touchend = true;
                                console.log(_vue.touchend);
                                return
                            }
                        }, 500);
                    }else{
                        // _vue.setErrorMessage(res.data.message);
                    }
                    
                })
            }
        },
        //到达底部加载更多数据
        async loaderMore() {
            //防止重复请求
            if (this.touchend || this.preventRepeatReuqest) {
                return
            }
            this.loading = true;
            this.getMoreDetail();
        }
    }
}
</script>

<style scoped lang="less">
.point-topic{
    background-color: #fff;
}
/*demo*/
.flex{
    box-sizing: border-box;

    display: -webkit-box;
    -webkit-box-pack: start;
    -webkit-box-align: start;

    display: -webkit-flex;
    -webkit-justify-content: space-between;
    -webkit-align-items: top;

    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-flow:row wrap;
    position: absolute;
}
.flex.flex-right{
    box-sizing: border-box;

    display: -webkit-box;
    -webkit-box-pack: start;
    -webkit-box-align: start;

    display: -webkit-flex;
    -webkit-justify-content: space-between;
    -webkit-align-items: top;

    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-flow:row wrap;
    position: absolute;
    right: 0;
}
.flex>div{
    margin:10px;
    width:134px;
    position: relative;
    border-bottom: 1px solid #fff;
}
.flex>div>span{
    position: absolute;
    left:0px;
    top:0px;
    padding:2px 10px;
    font-size:10px;
    border-radius:0 0 2px 0;
    background:#ea6151;
    color:#fff;
}
.flex>div>input{
    box-sizing: border-box;
    width:100%;
    margin-top:20px;
    border-radius: 2px;
    padding:10px;
    font-size: 16px;
    padding-left: 20px;
    color: #fff;
    background: transparent;
}

/*transition*/
.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease-in-out;
}
.fade-enter,.fade-leave-active{
    opacity: 0;
    transform: translateY(-10px);

}

/*下拉框*/
.calendar-dropdown3{
    background: #fff;
    position: absolute;
    left:0;
    top:0;
    border: 1px solid #eee;
    border-radius: 2px;
    width: 250px;
    z-index: 100;
}
.calendar-dropdown3:before {
    position: absolute;
    left:30px;
    top: -10px;
    content: "";
    border:5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #DEDEDE;
}
.calendar-dropdown3:after {
    position: absolute;
    left:30px;
    top: -9px;
    content: "";
    border:5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
}

/*下拉框*/
.calendar-dropdown4{
    background: #fff;
    position: absolute;
    left:0;
    top:0;
    border: 1px solid #eee;
    border-radius: 2px;
    width: 250px;
    z-index: 100;
}
.calendar-dropdown4:before {
    position: absolute;
    left:180px;
    top: -10px;
    content: "";
    border:5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #DEDEDE;
}
.calendar-dropdown4:after {
    position: absolute;
    left:180px;
    top: -9px;
    content: "";
    border:5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
}

/*弹出框*/
.calendar-dialog{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
}

.calendar-dialog-mask{
    background:rgba(255,255,255,.5);
    width:100%;
    height:100%;
}

.calendar-dialog-body{
    background: #fff;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    padding:20px;
    border: 1px solid #eee;
    border-radius: 2px;
}


/* 列表style */
.bg-top{
    background: url('../../static/images/points/bg-detail.png') no-repeat;
    background-size: contain;
    height: 150px;

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
.point{
    .point-title{
        padding: 0 20px 0;
        margin: 20px;
        line-height: 1px;
        border-left: 120px solid #ddd;
        border-right: 120px solid #ddd;
        text-align: center;
    }
    .point-item{
        margin: 0 20px 20px 20px;
        border-bottom: 1px solid #ddd;
        .point-time{
            border-bottom: 1px solid #ddd;
            height: 40px;
            line-height: 40px;
        }
        .point-content{
            overflow: hidden;
            margin-bottom: 20px;
            .point-left{
                float: left;
                .point-order{
                    font-size: 20px;
                    color: #2d3c49;
                    line-height: 28px;
                    height: 28px;
                    margin-top: 10px
                }
                .point-number{
                    line-height: 20px;
                    margin-top: 5px;
                }
                .point-reason{
                    color: #eee;
                    line-height: 20px;
                    margin-top: 5px;
                }
            }
            .point-value{
                line-height: 88px;
                float: right;
                vertical-align: middle;
            }
            .point-value.value-green{
                color: green;
            }
            .point-value.value-red{
                color: red;
            }
        }
    }
}

#index_order{
    float:left;
    width:100%;
    text-align:center;
    margin:5px auto 0;
    img{
        width: 150px;
        height: 180px;
        margin: 80px 0px 20px;
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
</style>