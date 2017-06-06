<template>
    <div>
      <dialog-list ></dialog-list>
      <!-- <button class="send-button" v-on:click="testClick">发送消息</button> -->
      <foot-guide></foot-guide>
    </div>

</template>

<script>
// import dialogList from '../../components/dialogContainer'
// var env = 'debug';// set env type for debug or product
import footGuide from 'src/components/footer/footGuide'
export default {
	name: 'home',
  components: {
    // dialogList
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

</style>
