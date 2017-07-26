<template>
    <section id='foot-guide' v-if="$route.meta.hasMenu">
        <section @click = "gotoAddress({path: '/home'})" class="guide_item">
        <!-- check router path to display correct background img -->
        	<div v-bind:class="[($route.path.indexOf('home') !== -1 || $route.path.indexOf('search') !== -1 ||$route.path=='/') ? 'index_icon_active' : 'index_icon']"><span>首页</span></div>
        </section>
        <section @click = "gotoAddress({path: '/stuff'})" class="guide_item">
        	<div v-bind:class="[$route.path.indexOf('stuff') !== -1 ? 'ticket_icon_active' : 'ticket_icon']"><span>好券</span></div>
        </section>
        <section  class="guide_item" v-on:click='pop'>
        	<div v-bind:class="[$route.path.indexOf('order') !== -1 ? 'menu_icon_active' : 'menu_icon']"><span>清单</span></div>
        </section>
        <section  class="guide_item" v-on:click='pop'>
        	<div v-bind:class="[$route.path.indexOf('goods') !== -1 ? 'stuff_icon_active' : 'stuff_icon']"><span>好物</span></div>
        </section>
        <section @click = "gotoAddress('/profile')" class="guide_item">
            <div v-bind:class="[$route.path.indexOf('profile') !== -1 ? 'profile_icon_active' : 'profile_icon']"><span>我的</span></div>
        </section>

        <error-message v-bind="{pastle, message:'功能正在开发'}"></error-message>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        pastle : false
      }
    },
    created() {
      
    },
    mounted() {

    },
    methods: {
      gotoAddress(path) {
        this.$router.push(path)
      },
      pop:function(){
        this.pastle = true;
        var _vue = this;
        setTimeout(function(){
            _vue.pastle = false;
        },2000)
      }
    }
  }
</script>

<style lang="less">
  #foot-guide {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0, 0, 0, .1);
  }
  
  .guide_item {
    flex: 1;
    display: flex;
    text-align: center;
    padding-top: 8px;
    flex-direction: column;
    align-items: center;
    span {
        font-size: 0.58rem;
        color: #666;
        line-height: 3.8rem;
    }
    div {
        background-position: top;
        background-size: 20px;
        width: 24px;
    }
  }
  
  .index_icon_active {
    background: url('../../static/images/footer/home-active.png') no-repeat;
  }
  
  .index_icon {
    background: url('../../static/images/footer/home-normal.png') no-repeat;
  }
  
  .ticket_icon_active {
    background: url('../../static/images/footer/tickets-active.png') no-repeat;
  }
  
  .ticket_icon {
    background: url('../../static/images/footer/tickets-normal.png') no-repeat;
  }
  
  .menu_icon_active {
    background: url('../../static/images/footer/menu-list-normal.png') no-repeat;
  }
  
  .menu_icon {
    background: url('../../static/images/footer/menu-list-normal.png') no-repeat;
  }
  
  .stuff_icon_active {
    background: url('../../static/images/footer/home-active.png') no-repeat;
  }
  
  .stuff_icon {
    background: url('../../static/images/footer/stuff-normal.png') no-repeat;
  }
  
  .profile_icon_active {
    background: url('../../static/images/footer/profile-active.png') no-repeat;
  }
  
  .profile_icon {
    background: url('../../static/images/footer/profile-normal.png') no-repeat;
  }
</style>