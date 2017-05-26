<template>
	<!-- <div>
    	<router-view></router-view>
    	<dialog-list ></dialog-list>
    </div> -->
    <div>
      <dialog-list ></dialog-list>
      <!-- <button class="send-button" v-on:click="testClick">发送消息</button> -->
    </div>
</template>

<script>
    // import dialogList from './components/dialogContainer'
    export default {
      name: 'App',
      components: {
        // dialogList
      },
      data () {
        return {
          pageId: 1
        }
      }
    }
</script>

<style lang="less">
	@import './static/style/common.less';
</style>
