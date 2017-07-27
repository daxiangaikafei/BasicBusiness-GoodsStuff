<template>
    <div id="search-module">
      <search-module @searching="searchKey" ref="searchModule"></search-module>
      <div class="tag-container">
    		<!-- <div class="tag-left">
    			<span class="all-classify">全部分类</span>
    			<span class="single-classify">{{ category }}</span>
    		</div> -->
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
      <good-list-search ref="goodListSearch"></good-list-search>
      <error-message v-bind="{pastle: pastle,message: message}"></error-message>
    </div>

</template>

<script>
var env = 'product';// set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
import getLoginUri from '../../config/loginConfig'
import searchModule from '../../components/search'
import goodListSearch from '../../components/goodlist/goodListForSearch'
import { mapState,mapMutations } from 'vuex';
export default {
	name: 'stuff',
  components: {
    searchModule,
    goodListSearch
  },
  data () {
    return {
      pastle: false,
      message: '',
      pageId: 1,
      keywords:'',
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
  computed: {
      ...mapState([
          'pageY','goodsList'
      ])
  },
  methods: {
    ...mapMutations([
      'buryPoint','resetGoodsList','updateGoodsList'
    ]),
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
          _vue.$refs.goodListSearch.keyword = '';
          _vue.$refs.goodListSearch.itemList = res.data;
          _vue.$refs.goodListSearch.loading = false;
          _vue.$refs.goodListSearch.preventRepeatReuqest = false;
          _vue.$refs.goodListSearch.page = 1;
          _vue.$refs.goodListSearch.touchend = false;
          _vue.$refs.goodListSearch.category = id;
          _vue.$refs.goodListSearch.categoryName = label;
          _vue.$refs.goodListSearch.sortfield = sortfieldName;
          _vue.$refs.goodListSearch.ad = -1;
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

          _vue.$ajax.get(ApiControl.getApi(env, "couponList"), {
              params:{
                keyword: this.key,
                page: 1,
                size: 10
              }
              
          }).
          then(res => {
            if(res.data.code == 0){
              _vue.$refs.goodListSearch.keyword = keywords;
              _vue.$refs.goodListSearch.itemList = res.data;
              _vue.$refs.goodListSearch.loading = false;
              _vue.$refs.goodListSearch.categoryName = '';
              _vue.$refs.goodListSearch.preventRepeatReuqest = false;
              _vue.$refs.goodListSearch.page = 1;
              _vue.$refs.goodListSearch.touchend = false;
              var list = res.data.result;
              _vue.resetGoodsList(list);   
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
  computed(){

  },
  created() {
    this.page = 1;
    var _vue = this;
    var keywords = this.$route.query.keywords;
    this.keywords = keywords;
    if(keywords != ''){
      this.newIconActive = false;
      this.moreClassifyShow = false;
      this.popularityIconActive = false;
      this.allClassifyIconActive = false;
      this.showTagAll = false;

      _vue.$ajax.get(ApiControl.getApi(env, "couponList"), {
          params:{
            keyword: this.keywords,
            page: 1,
            size: 10
          }
          
      }).
      then(res => {
        if(res.data.code == 0){
          _vue.$refs.goodListSearch.keyword = keywords;
          _vue.$refs.goodListSearch.itemList = res.data;
          _vue.$refs.goodListSearch.loading = false;
          _vue.$refs.goodListSearch.categoryName = '';
          _vue.$refs.goodListSearch.preventRepeatReuqest = false;
          _vue.$refs.goodListSearch.page = 1;
          _vue.$refs.goodListSearch.touchend = false;
          var list = res.data.result;
          _vue.resetGoodsList(list);   
        }else{
          _vue.setMessage(res.data.message);
        }
      })
    }
  }
}
</script>
<style lang="less">
	@import "../../static/style/layout-mixin";
	@bdColor: #DDD;
	html,
	body {
			/*background: #fff;*/
	}
	
	.classify-container {
		background: #fff;
		display: flex;
		width: 100%;
		height: 95px;
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
		.classify-new.active>div {
			color: #3090FF;
		}
		.classify-popular.active>div {
			color: #FE4F18;
		}
		.classify-allclassify.active>div {
			color: #38C774;
		}
	}
	
	.classify-allclassify.alive{
		position: relative;
		&:before, &:after {
			width:0px;
			height:0px;
			border:transparent solid;
			position:absolute;
			content:"";
			z-index: 102;
			left: 0;
			right: 0;
			margin: 0 auto;
		}
		&:before{
			border-width: 10px;
			border-bottom-color: @bdColor;
			bottom: 2px;

		}
		&:after{
			border-width: 10px;
			border-bottom-color: #fff;
			bottom: 1px;
		}
		&.gray:after {
			border-bottom-color: transparent;
		}
	}
	.more-classify{
		width: 100%;
		position: absolute;
		top: 130px;
		bottom: 0;
    background: rgba(0, 0, 0, 0.5);
		z-index: 101;
		border-top: solid 1px @bdColor;
		margin-top: 10px;
		.classify-bg {
			background: #fff url("../../static/images/stuff/pull-tap.png") no-repeat;
			background-size: 20px;
			background-position: center bottom 8px;
			padding-bottom: 26px;
			.classify-inner {
				box-shadow: inset 0 -1px @bdColor;		
				.flex;
				.flex-wrap;
				& * + * {
					border-left: solid 1px @bdColor;
				}		
			}
		}
		
		.classify-item{
			width: 25%;
			height: 35px;
			cursor: pointer;
			line-height: 35px;
			text-align: center;
			font-size: 13px;
			color: #333333;
			border-bottom: solid 1px @bdColor;
			position: relative;
			overflow: hidden;
			text-overflow:ellipsis;
			box-sizing: border-box;
			&:last-child:not(:nth-child(4n)) {
				box-shadow: 1px 0 @bdColor;
			}
			&.active {
				background: @bdColor;
			}
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
		margin-top: 1px;
    height: 40px;
    border-bottom: solid 1px #fff;
    border-top: solid 1px #fff;
    line-height: 40px;
    background: #fff;
    font-size: 14px;
		& + * {
			margin-top: 0!important;
		}
		// .tag-left{
		// 	float: left;
		// 	.all-classify{
		// 		color: rgb(152,152,152);
		// 	}
		// }
		.tag-right{
			// float: right;
			.flex;
			&>div {
				.flex-item-auto;
				.flex;
				.flex-center;
			}
			.tag-all{
				// float: left;
				// margin-right: 10px;
				.tag-context{
					// float: left;
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
