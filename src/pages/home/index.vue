<template>
    <div>
      <!-- <dialog-list ></dialog-list> -->
      <!-- <button class="send-button" v-on:click="testClick">发送消息</button> -->
      <search-module></search-module>
      <foot-guide></foot-guide>
      <router-link to="/treasure">跳转至集分宝页面</router-link>
    </div>

</template>

<script>
// import dialogList from '../../components/dialogContainer'
// var env = 'debug';// set env type for debug or product
import footGuide from '../../components/footer/footGuide'
import searchModule from '../../components/search'
export default {
	name: 'home',
  components: {
    // dialogList,
    searchModule,
    footGuide
  },
  data () {
    return {
      pageId: 1
    }
  }
}
</script>

<style lang="less">
   @import '../../static/style/common.less';
</style>
