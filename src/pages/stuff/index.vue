<template>
    <div>
      <!-- <dialog-list ></dialog-list> -->
      <!-- <button class="send-button" v-on:click="testClick">发送消息</button> -->

      <search-module @searching="searchKey" ref="searchModule"></search-module>
      <div class="classify-container">
    		<div class="classify-item classify-new" @click="chooseCategory('','','product_coupon_etimestamp')">
    			<div class="classify-item-img">
    				<img :src="newIconActive ? iconList.newActive : iconList.newNormal"/>
    			</div>
    			<div>最新推荐</div>
    		</div>
    		<div class="classify-item classify-popular" @click="chooseCategory('','','product_sales')"> 
    			<div class="classify-item-img">
    				<img :src="popularityIconActive ? iconList.popularityActive : iconList.popularityNormal"/>
    			</div>
    			<div>人气</div>
    		</div>
    		<div class="classify-item classify-allclassify" @click="changeClassifyShow">
    			<div class="classify-item-img">
    				<img :src="allClassifyIconActive ? iconList.allClassifyActive : iconList.allClassifyNormal"/>
    			</div>
    			<div>全部分类</div>
    		</div>
      </div>
      <div class="more-classify" v-if="moreClassifyShow">
      	<div class="classify-item-container" v-for="(classify,index) in classifyList">
      		<div @click="chooseCategory(classify.cname,classify.cid)" class="classify-item">{{ classify.cname }}
      		</div>
      	</div>	
      </div>
      <div class="tag-container" v-if="showTagAll">
    		<div class="tag-left">
    			<span class="all-classify">全部分类</span>
    			<span class="single-classify">{{ category }}</span>
    		</div>
    		<div class="tag-right">
    			<div class="tag-all" @click="tagClickMethod(1)">
    				<div class="tag-context tag-total" :class="{'tag-active': tagTotal}">销量</div>
    				<div class="total-arrow">
    					<div class="total-arrow-up">
    						<img :src="tagTotal&&tagTotalUp ? iconList.tagTotalUpActive : iconList.tagTotalUpNormal"/>
    					</div>
    					<div class="total-arrow-down">
    						<img :src="tagTotal&& tagTotalDown ? iconList.tagTotalDownActive : iconList.tagTotalDownNormal"/>
    					</div>
    				</div>
    			</div>	
    			<div class="tag-all" @click="tagClickMethod(2)">
    				<div class="tag-context tag-onsale" :class="{'tag-active' : tagOnSale}">优惠度</div>
    				<div class="total-arrow">
    					<div class="total-arrow-up">
    						<img :src="tagOnSale&&tagOnSalelUp ? iconList.tagTotalUpActive : iconList.tagTotalUpNormal"/>
    					</div>
    					<div class="total-arrow-down">
    						<img :src="tagOnSale&& tagOnSaleDown ? iconList.tagTotalDownActive : iconList.tagTotalDownNormal"/>
    					</div>
    				</div>
    			</div>
    			<div class="tag-all" @click="tagClickMethod(3)">
    				<div class="tag-context tag-quan" :class="{'tag-active' : tagQuan}">券后价</div>
    				<div class="total-arrow">
    					<div class="total-arrow-up">
    						<img :src="tagQuan&&tagQuanUp ? iconList.tagTotalUpActive : iconList.tagTotalUpNormal"/>
    					</div>
    					<div class="total-arrow-down">
    						<img :src="tagQuan&& tagQuanDown ? iconList.tagTotalDownActive : iconList.tagTotalDownNormal"/>
    					</div>
    				</div>
    			</div>
    		</div>
      </div>
      <good-list ref="goodsList"></good-list>
      <foot-guide></foot-guide>
    </div>

</template>

<script>
// import dialogList from '../../components/dialogContainer'
var env = 'product';// set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
import getLoginUri from '../../config/loginConfig'
import footGuide from '../../components/footer/footGuide'
import searchModule from '../../components/search'
import goodList from '../../components/goodlist/goodlist'
export default {
	name: 'stuff',
  components: {
    searchModule,
    goodList,
    footGuide
  },
  data () {
    return {
      pageId: 1,
      moreClassifyShow: false,
      newIconActive: true,
      popularityIconActive: false,
      allClassifyIconActive: false,
      showTagAll: false,
      category: '',
      categoryId: 0,
      iconList: {
      	newNormal: require('../../static/images/stuff/new-normal-icon.png'),
      	newActive: require('../../static/images/stuff/new-icon-active.png'),
      	popularityNormal: require('../../static/images/stuff/popularity-icon-normal.png'),
      	popularityActive: require('../../static/images/stuff/popularity-icon-active.png'),
      	allClassifyNormal: require('../../static/images/stuff/allClassify-icon.png'),
      	allClassifyActive: require('../../static/images/stuff/allClassify-icon-active.png'),
      	tagTotalDownNormal: require('../../static/images/arrow-down.png'),
      	tagTotalDownActive: require('../../static/images/arrow-down-active.png'),
      	tagTotalUpNormal: require('../../static/images/arrow-up.png'),
      	tagTotalUpActive: require('../../static/images/arrow-up-active.png'),
      },
      tagTotal: true,
      tagTotalUp: false,
      tagTotalDown: true,
      tagOnSale: false,
      tagOnSaleUp: false,
      tagOnSaleDown: false,
      tagQuan: false,
      tagQuanUp: false,
      tagQuanDown: false,
      classifyList: [
      	// {
      	// "categoryId": 1,
      	// "categoryName": "女装"
      	// },
      	// {
      	// "categoryId": 9,
      	// "categoryName": "男装"
      	// },
      	// {
      	// "categoryId": 10,
      	// "categoryName": "内衣"
      	// },
      	// {
      	// "categoryId": 2,
      	// "categoryName": "母婴"
      	// },
      	// {
      	// "categoryId": 3,
      	// "categoryName": "化妆品"
      	// },
      	// {
      	// "categoryId": 4,
      	// "categoryName": "居家"
      	// },
      	// {
      	// "categoryId": 5,
      	// "categoryName": "鞋包配饰鞋包配饰鞋包配饰"
      	// },
      	// {
      	// "categoryId": 6,
      	// "categoryName": "美食"
      	// },
      	// {
      	// "categoryId": 7,
      	// "categoryName": "文体车品"
      	// },
      	// {
      	// "categoryId": 8,
      	// "categoryName": "数码家电"
      	// }
      ]
    }
  },
  methods: {
  	changeClassifyShow: function(){
  		this.moreClassifyShow = ! this.moreClassifyShow;
  		this.allClassifyIconActive = ! this.allClassifyIconActive;
  		this.newIconActive = false;
  		this.popularityIconActive = false;
  	},
  	//选中分类列表，执行获取分类列表数据请求，同时隐藏分类表格框，修改标签栏文字显示。
  	chooseCategory: function(name,id,sortfield){
      var sortfieldName = sortfield;
  		this.category = name;
  		this.showTagAll = true;
  		this.moreClassifyShow = ! this.moreClassifyShow;
  		this.page = 1;

  		this.tagTotal = true;
		  this.tagOnSale = false;
		  this.tagQuan = false;

  		if(id == ''){
  			this.newIconActive = false;
  			if(sortfield == 'product_coupon_etimestamp'){
  				this.newIconActive = true;
  				this.moreClassifyShow = false;
  				this.popularityIconActive = false;
  				this.allClassifyIconActive = false;
  				this.showTagAll = false;
  			}
  			if(sortfield == 'product_sales'){
  				this.newIconActive = false;
  				this.moreClassifyShow = false;
  				this.popularityIconActive = true;
  				this.allClassifyIconActive = false;
  				this.showTagAll = false;
  			}

  		}else{
  			this.categoryId = id;
  		}
  		ajax('POST', ApiControl.getApi(env, "couponList"), {
  		    keyword: this.key,
  		    category: id,
  		    page: 1,
  		    sortfield: sortfieldName,
  		    ad: -1,
  		    size: 10
  		}).
  		then(res => {
        this.$refs.goodsList.keyword = '';
        this.$refs.goodsList.itemList = res;
        this.$refs.goodsList.loading = false;
        this.$refs.goodsList.preventRepeatReuqest = false;
        this.$refs.goodsList.page = 1;
        this.$refs.goodsList.touchend = false;
      })

  	},
  	searchKey: function(keywords) {
        this.page = 1;
        this.key = keywords;
        ajax('POST', ApiControl.getApi(env, "couponList"), {
            keyword: this.key,
            page: 1,
            size: 10
        }).
        then(res => {
                    this.$refs.goodsList.keyword = keywords;
                    this.$refs.goodsList.itemList = res;
                    this.$refs.goodsList.loading = false;
                    this.$refs.goodsList.preventRepeatReuqest = false;
                    this.$refs.goodsList.page = 1;
                    this.$refs.goodsList.touchend = false;
        })
    },
    tagClickMethod: function(key){
    	var ad = -1;
    	switch(key){
    		case 1:
    			this.tagTotal = true;
    			this.tagOnSale = false;
    			this.tagQuan = false;
    			if(this.tagTotalDown){
    				this.tagTotalDown = false;
    				this.tagTotalUp = true;
            ad = 1;
    			}else{
    				this.tagTotalDown = true;
    				this.tagTotalUp = false;
    				ad = -1;
    			}

    			ajax('POST', ApiControl.getApi(env, "couponList"), {
    			    category: this.categoryId,
    			    page: 1,
    			    sortfield: 'product_sales',
    			    ad: ad,
    			    size: 10
    			}).
    			then(res => {
            this.$refs.goodsList.keyword = '';
            this.$refs.goodsList.itemList = res;
            this.$refs.goodsList.loading = false;
            this.$refs.goodsList.preventRepeatReuqest = false;
            this.$refs.goodsList.page = 1;
            this.$refs.goodsList.touchend = false;
    			})

    			return;
    		case 2:
    			this.tagTotal = false;
    			this.tagOnSale = true;
    			this.tagQuan = false;

    			if(this.tagOnSaleDown){
    				this.tagOnSaleDown = false;
    				this.tagOnSalelUp = true;
            ad = 1;
    			}else{
    				this.tagOnSaleDown = true;
    				this.tagOnSalelUp = false;
    				ad = -1;
    			}
    			ajax('POST', ApiControl.getApi(env, "couponList"), {
    			    category: this.categoryId,
    			    page: 1,
    			    sortfield: 'product_coupon_price',
    			    ad: ad,
    			    size: 10
    			}).
          then(res => {
              this.$refs.goodsList.keyword = '';
              this.$refs.goodsList.itemList = res;
              this.$refs.goodsList.loading = false;
              this.$refs.goodsList.preventRepeatReuqest = false;
              this.$refs.goodsList.page = 1;
              this.$refs.goodsList.touchend = false;
    			})

    			return;
    		case 3:
    			this.tagTotal = false;
    			this.tagOnSale = false;
    			this.tagQuan = true;
    			if(this.tagQuanDown){
    				this.tagQuanDown = false;
    				this.tagQuanUp = true;
            ad = 1;
    			}else{
    				this.tagQuanDown = true;
    				this.tagQuanUp = false;
    				ad = -1;
    			}
    			ajax('POST', ApiControl.getApi(env, "couponList"), {
    			    category: this.categoryId,
    			    page: 1,
    			    sortfield: 'product_price_deduct_coupon',
    			    ad: ad,
    			    size: 10
    			}).
    			then(res => {
            this.$refs.goodsList.keyword = '';
            this.$refs.goodsList.itemList = res;
            this.$refs.goodsList.loading = false;
            this.$refs.goodsList.preventRepeatReuqest = false;
            this.$refs.goodsList.page = 1;
            this.$refs.goodsList.touchend = false;
    			})
    			return;
    		default:
    			return;
    	}
    }
  },
  created() {
  	//检测用户是否登录
  	// ajax('GET', ApiControl.getApi(env, "checkLogin"), {
  	// }).
  	// then(res => {
  	//     if(res.code != 200){
  	//     	//跳转至微信授权页面：https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
  	//     	//参数解释如下：state为重定向后需要添加的参数，redirect_url为重定向地址，我们这边统一为/login
  	//     	// window.location.href = '/login?pageType=stuff';
  	//     	var redirectUri = getLoginUri.getLoginUri(env,'baseUri') + 'stuff';
  	//     	var appId = getLoginUri.getAppId();
  	//     	// window.location.href = 'ttps://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect';

  	//     	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
  	//     }
  	// })

  	// 获取全部分类所有列表
  	ajax('GET', ApiControl.getApi(env, "categoryList"), {
  	}).
  	then(res => {
  	    this.classifyList = res.result;
  	})
  }
}
</script>

<style lang="less">
    html,
    body {
        /*background: #fff;*/
    }
    
    .classify-container {
        background: #fff;
        display: flex;
		width: 100%;
		height: 110px;
        // border-bottom: solid 10px #eee;
        border-top: solid 5px #eee;
        .classify-item {
			// display: flex;
			text-align: center;
			flex-grow: 1;
			.classify-item-img{
				width: 100%;
				text-align: center;
				padding: 15px 0 5px 0;
				img{
					height: 25px;
				}
			}
		}
	}
	.more-classify{
		width: 100%;
		float: left;
		position: absolute;
		top: 130px;
		background: #fff;
		z-index: 99;
		border-top: solid 1px rgb(152,152,152);
		margin: 20px 0;
		// border-left: solid 1px rgb(152,152,152);
		.classify-item{
			width: 25%;
			height: 35px;
			cursor: pointer;
			line-height: 35px;
			text-align: center;
			font-size: 13px;
			color: #333333;
			float: left;
			border-right: solid 1px rgb(152,152,152);
			// border-top: solid 1px rgb(152,152,152);
			border-bottom: solid 1px rgb(152,152,152);
			position: relative;
			overflow: hidden;
			text-overflow:ellipsis;
			// border: solid 1px rgb(152,152,152);
		}
		.classify-item-container:nth-of-type(4n) .classify-item {
            border-right: none;
            overflow: visible;
        }
        .classify-item-container:nth-of-type(4) .classify-item:before,
        .classify-item-container:nth-of-type(4) .classify-item:after {
			// border:1px solid rgb(152,152,152);
			width:0px;
			height:0px;
			border:transparent solid;
			position:absolute;
			left:100%;
			content:""
        }
        .classify-item-container:nth-of-type(4) .classify-item:before{
        	border-width: 20px;
        	border-bottom-color: #989898;
        	top: -40px;
        	left: 10px;
        }
        .classify-item-container:nth-of-type(4) .classify-item:after{
        	border-width: 19px;
        	border-bottom-color: #fff;
        	left: 11px;
        	top: -37px;
        }

	}
	.tag-container{
		margin: 0 10px;
		height: 40px;
		border-bottom: solid 1px #eee;
		line-height: 40px;
		.tag-left{
			float: left;
			.all-classify{
				color: rgb(152,152,152);
			}
		}
		.tag-right{
			float: right;
			.tag-all{
				float: left;
				margin-right: 10px;
				.tag-context{
					float: left;
				}
				.tag-context.tag-active{
					color: red;
				}
				.total-arrow{
					float: left;
					margin-left: 5px;
					.total-arrow-up{
						width: 14px;
						height: 14px;
						margin-top: -5px;
						img{
							width: 100%;
						}
					}
					.total-arrow-down{
						width: 14px;
						height: 14px;
						img{
							width: 100%;
						}
					}
				}
			}

			span{
				color: rgb(152,152,152);
			}
			.action-icon{
		        width: 10px;
		        height: 10px;
		        display: inline-block;
		        border-bottom: solid 1px #CDC9C9;
		        border-left: solid 1px #CDC9C9;
		        margin-left: 10px;
		        transform: rotate(135deg);
		        -webkit-transform: rotate(135deg);
		        -moz-transform: rotate(135deg);
		        margin-bottom: 0;
		        vertical-align: middle;
      		}			
		}
	}
</style>
