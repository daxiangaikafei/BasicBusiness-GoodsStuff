<template>
    <div>
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
      		<div @click="chooseCategory(classify.cname,classify.cid,'product_sales')" class="classify-item">{{ classify.cname }}
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
      <error-message v-bind="{pastle: pastle,message: message}"></error-message>
    </div>

</template>

<script>
var env = 'product';// set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
import getLoginUri from '../../config/loginConfig'
import footGuide from '../../components/footer/footGuide'
import searchModule from '../../components/search'
import goodList from '../../components/goodlist/goodlist'
import errorMessage from '../../components/requestError'
import { mapMutations } from 'vuex';
export default {
	name: 'stuff',
  components: {
    searchModule,
    goodList,
    footGuide,
    errorMessage
  },
  data () {
    return {
      pastle: false,
      message: '',
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
      ]
    }
  },
  methods: {
    ...mapMutations([
      'buryPoint'
    ]),
  	changeClassifyShow: function(){
      //set search module keywords to ''
      this.$refs.searchModule.keywords = '';
  		this.moreClassifyShow = ! this.moreClassifyShow;
  		this.allClassifyIconActive = true;
  		this.newIconActive = false;
  		this.popularityIconActive = false;
  	},
  	//选中分类列表，执行获取分类列表数据请求，同时隐藏分类表格框，修改标签栏文字显示。
  	chooseCategory: function(name,id,sortfield){
      //set search module keywords to ''
      this.$refs.searchModule.keywords = '';
      var sortfieldName = sortfield;
  		this.category = name;
  		this.showTagAll = true;
  		this.moreClassifyShow = ! this.moreClassifyShow;
  		this.page = 1;

  		this.tagTotal = true;
      this.tagTotalDown = true;
      this.tagTotalUp = false;
		  this.tagOnSale = false;
		  this.tagQuan = false;
      var eventId = '好券';
      var label = name;
  		if(id == ''){
  			this.newIconActive = false;
  			if(sortfield == 'product_coupon_etimestamp'){
          label = "最新推荐";
  				this.newIconActive = true;
  				this.moreClassifyShow = false;
  				this.popularityIconActive = false;
  				this.allClassifyIconActive = false;
  				this.showTagAll = false;
  			}
  			if(sortfield == 'product_sales'){
          label = '人气';
  				this.newIconActive = false;
  				this.moreClassifyShow = false;
  				this.popularityIconActive = true;
  				this.allClassifyIconActive = false;
  				this.showTagAll = false;
  			}

  		}else{
  			this.categoryId = id;
  		}
      this.buryPoint({
          eventId,
          label
      });
      var _vue = this;
  		_vue.$ajax.post(ApiControl.getApi(env, "couponList"), {
            // keyword: this.key,
            category: id,
            page: 1,
            sortfield: sortfieldName,
            ad: -1,
            size: 10
  		}).
  		then(res => {
        if(res.data.code == 0){
          _vue.$refs.goodsList.keyword = '';
          _vue.$refs.goodsList.itemList = res.data;
          _vue.$refs.goodsList.loading = false;
          _vue.$refs.goodsList.preventRepeatReuqest = false;
          _vue.$refs.goodsList.page = 1;
          _vue.$refs.goodsList.touchend = false;
          _vue.$refs.goodsList.category = id;
          _vue.$refs.goodsList.categoryName = label;
          _vue.$refs.goodsList.sortfield = sortfieldName;
          _vue.$refs.goodsList.ad = -1;
        }else{
          _vue.setMessage(res.data.message);
        }
        
      })

  	},
  	searchKey: function(keywords) {
        this.page = 1;
        this.key = keywords;
        var _vue = this;
        if(keywords != ''){
          this.newIconActive = false;
          this.moreClassifyShow = false;
          this.popularityIconActive = false;
          this.allClassifyIconActive = false;
          this.showTagAll = false;

          _vue.$ajax.post(ApiControl.getApi(env, "couponList"), {
              keyword: this.key,
              page: 1,
              size: 10
          }).
          then(res => {
            if(res.data.code == 0){
              _vue.$refs.goodsList.keyword = keywords;
              _vue.$refs.goodsList.itemList = res.data;
              _vue.$refs.goodsList.loading = false;
              _vue.$refs.goodsList.categoryName = '';
              _vue.$refs.goodsList.preventRepeatReuqest = false;
              _vue.$refs.goodsList.page = 1;
              _vue.$refs.goodsList.touchend = false;
            }else{
              _vue.setMessage(res.data.message);
            }
          })
        }
        
    },
    tagClickMethod: function(key){
    	var ad = -1;
      var _vue = this;
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

    			_vue.$ajax.post(ApiControl.getApi(env, "couponList"), {
                category: this.categoryId,
                page: 1,
                sortfield: 'product_sales',
                ad: ad,
                size: 10
    			}).
    			then(res => {
            if(res.data.code == 0){
              _vue.$refs.goodsList.keyword = '';
              _vue.$refs.goodsList.itemList = res.data;
              _vue.$refs.goodsList.loading = false;
              _vue.$refs.goodsList.preventRepeatReuqest = false;
              _vue.$refs.goodsList.page = 1;
              _vue.$refs.goodsList.touchend = false;
              _vue.$refs.goodsList.categoryName = _vue.category;
              _vue.$refs.goodsList.category = _vue.categoryId;
              _vue.$refs.goodsList.sortfield = 'product_sales';
              _vue.$refs.goodsList.ad = ad;
            }else{
              _vue.setMessage(res.data.message);
            }
            
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
    			_vue.$ajax.post(ApiControl.getApi(env, "couponList"), {
              category: _vue.categoryId,
              page: 1,
              sortfield: 'product_coupon_price',
              ad: ad,
              size: 10
    			}).
          then(res => {
              if(res.data.code == 0){
                _vue.$refs.goodsList.keyword = '';
                _vue.$refs.goodsList.itemList = res.data;
                _vue.$refs.goodsList.loading = false;
                _vue.$refs.goodsList.preventRepeatReuqest = false;
                _vue.$refs.goodsList.page = 1;
                _vue.$refs.goodsList.touchend = false;
                _vue.$refs.goodsList.category = _vue.categoryId;
                _vue.$refs.goodsList.categoryName = _vue.category;
                _vue.$refs.goodsList.sortfield = 'product_coupon_price';
                _vue.$refs.goodsList.ad = ad;
              }else{
                _vue.setMessage(res.data.message);
              }
              
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
    			_vue.$ajax.post(ApiControl.getApi(env, "couponList"), {
              category: this.categoryId,
              page: 1,
              sortfield: 'product_price_deduct_coupon',
              ad: ad,
              size: 10
    			}).
    			then(res => {
            if(res.data.code == 0){
              _vue.$refs.goodsList.keyword = '';
              _vue.$refs.goodsList.itemList = res.data;
              _vue.$refs.goodsList.loading = false;
              _vue.$refs.goodsList.preventRepeatReuqest = false;
              _vue.$refs.goodsList.page = 1;
              _vue.$refs.goodsList.touchend = false;
              _vue.$refs.goodsList.category = _vue.categoryId;
              _vue.$refs.goodsList.categoryName = _vue.category;
              _vue.$refs.goodsList.sortfield = 'product_price_deduct_coupon';
              _vue.$refs.goodsList.ad = ad;
            }else{
              _vue.setMessage(res.data.message);
            }
    			})
    			return;
    		default:
    			return;
    	}
    },
    setMessage: function(message){
        var _vue = this;
        this.pastle = true;
        this.message = message;
        setTimeout(function(){
                _vue.pastle = false;
                _vue.message = '';
        },2000)
    }
  },
  created() {
    // this.setMessage('好券页测试用');
  	// 获取全部分类所有列表
    var _vue = this;
  	_vue.$ajax.get(ApiControl.getApi(env, "categoryList"), {
  	}).
  	then(res => {
        if(res.data.code == 0){
          _vue.classifyList = res.data.result;
        }else if(res.data.code == 200){
          _vue.setMessage('尝试登录中');
        }else{
          _vue.setMessage(res.data.message);
        }
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
