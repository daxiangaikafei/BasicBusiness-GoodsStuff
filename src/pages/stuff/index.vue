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
      		<div @click="chooseCategory(classify.categoryName,classify.categoryId)" class="classify-item">{{ classify.categoryName }}
				<span class="sp1" v-if="index = 3"></span>
				<span class="sp2" v-if="index = 3"></span>
      		</div>
      	</div>	
      </div>
      <div class="tag-container">
		<div class="tag-left">
			<span class="all-classify">全部分类</span>
			<span class="single-classify">美妆</span>
		</div>
		<div class="tag-right">
			<div class="tag-all">
				<div class="tag-context tag-total">销量</div>
				<div class="total-arrow">
					<div class="total-arrow-up">
						<img src="../../static/images/arrow-up-active.png"/>
					</div>
					<div class="total-arrow-down">
						<img src="../../static/images/arrow-down-active.png"/>
					</div>
				</div>
			</div>	
			<div class="tag-all">
				<div class="tag-context tag-onsale">销量</div>
				<div class="total-arrow">
					<div class="total-arrow-up">
						<img src="../../static/images/arrow-up-active.png"/>
					</div>
					<div class="total-arrow-down">
						<img src="../../static/images/arrow-down-active.png"/>
					</div>
				</div>
			</div>
			<div class="tag-all">
				<div class="tag-context tag-quan">销量</div>
				<div class="total-arrow">
					<div class="total-arrow-up">
						<img src="../../static/images/arrow-up-active.png"/>
					</div>
					<div class="total-arrow-down">
						<img src="../../static/images/arrow-down-active.png"/>
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
      iconList: {
      	newNormal: require('../../static/images/stuff/new-normal-icon.png'),
      	newActive: require('../../static/images/stuff/new-icon-active.png'),
      	popularityNormal: require('../../static/images/stuff/popularity-icon-normal.png'),
      	popularityActive: require('../../static/images/stuff/popularity-icon-active.png'),
      	allClassifyNormal: require('../../static/images/stuff/allClassify-icon.png'),
      	allClassifyActive: require('../../static/images/stuff/allClassify-icon-active.png')
      },
      classifyList: [
      	{
      	"categoryId": 1,
      	"categoryName": "女装"
      	},
      	{
      	"categoryId": 9,
      	"categoryName": "男装"
      	},
      	{
      	"categoryId": 10,
      	"categoryName": "内衣"
      	},
      	{
      	"categoryId": 2,
      	"categoryName": "母婴"
      	},
      	{
      	"categoryId": 3,
      	"categoryName": "化妆品"
      	},
      	{
      	"categoryId": 4,
      	"categoryName": "居家"
      	},
      	{
      	"categoryId": 5,
      	"categoryName": "鞋包配饰"
      	},
      	{
      	"categoryId": 6,
      	"categoryName": "美食"
      	},
      	{
      	"categoryId": 7,
      	"categoryName": "文体车品"
      	},
      	{
      	"categoryId": 8,
      	"categoryName": "数码家电"
      	}
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
  		console.log(name);
  		console.log(id);
  		console.log(sortfield);
  		// this.moreClassifyShow = ! this.moreClassifyShow;
  		this.page = 1;
  		if(id == ''){
  			this.newIconActive = false;
  			if(sortfield == 'product_coupon_etimestamp'){
  				console.log('最新推荐选中')
  				this.newIconActive = true;
  				this.moreClassifyShow = false;
  				this.popularityIconActive = false;
  				this.allClassifyIconActive = false;
  			}
  			if(sortfield == 'product_sales'){
  				console.log('人气选中')
  				this.newIconActive = false;
  				this.moreClassifyShow = false;
  				this.popularityIconActive = true;
  				this.allClassifyIconActive = false;
  			}

  		}
  		ajax('GET', ApiControl.getApi(env, "couponList"), {
  		    key: this.key,
  		    category: id,
  		    page: 1,
  		    sortfield: id == '' ? sortfield : '',
  		    size: 10
  		}).
  		then(res => {
  		    this.$refs.goodsList.itemList = res;
  		    this.$refs.goodsList.loading = false;
  		    this.$refs.goodsList.preventRepeatReuqest = false;
  		})

  	},
  	searchKey: function(keywords) {
        this.page = 1;
        this.key = keywords;
        ajax('GET', ApiControl.getApi(env, "couponList"), {
            key: this.key,
            page: 1,
            size: 10
        }).
        then(res => {
            this.$refs.goodsList.itemList = res;
            this.$refs.goodsList.loading = false;
            this.$refs.goodsList.preventRepeatReuqest = false;
        })
    }
  },
  created() {
  	// 获取全部分类所有列表
  	ajax('GET', ApiControl.getApi(env, "categoryList"), {
  	}).
  	then(res => {
  	    this.classifyList = res;
  	})
  }
}
</script>

<style lang="less">
	html,body{
		background: #fff;
	}
	.classify-container{
		display: flex;
		width: 100%;
		height: 110px;
		border-bottom: solid 10px #eee;
		border-top: solid 10px #eee;
		.classify-item{
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
			// border: solid 1px rgb(152,152,152);
		}
		.classify-item-container:nth-of-type(4n) .classify-item {
            border-right: none;
        }
        .classify-item-container:nth-of-type(4) .classify-item{
			// border:1px solid rgb(152,152,152);
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
				width: 64px;
				.tag-context{
					float: left;
				}
				.total-arrow{
					float: left;
					margin-left: 5px;
					.total-arrow-up{
						width: 16px;
						height: 16px;
						margin-top: -5px;
					}
					.total-arrow-down{
						width: 16px;
						height: 16px;
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
