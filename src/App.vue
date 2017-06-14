<template>
  <div>
    <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import utils from './config/utils'
    export default {
      name: 'goodStuff',
      data() {
        device: ''
      },
      created() {
        this.device = utils.getDevice();
        // if not mobile ,set empty document
        if(this.device == 3) document.body.innerHTML = '';
      }
    }

</script>

<style lang="less">
    @import './static/style/common.less';
  .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
  }
</style>
