<template>
    <section id='foot_guide'>
        <section @click = "gotoAddress({path: '/index'})" class="guide_item">
        <!-- check router path to display correct background img -->
        	<div v-bind:class="[$route.path.indexOf('index') !== -1 ? index_icon_active : index_icon]"></div>
            <span>首页</span>
        </section>
        <section @click = "gotoAddress({path: '/stuff'})" class="guide_item">
        	<div v-bind:class="[$route.path.indexOf('tickets') !== -1 ? ticket_icon_active : ticket_icon]"></div>
            <span>好券</span>
        </section>
        <section @click = "gotoAddress('/menu')" class="guide_item">
        	<div v-bind:class="[$route.path.indexOf('menu') !== -1 ? menu_icon_active : menu_icon]"></div>
            <span>清单</span>
        </section>
        <section @click = "gotoAddress('/stuff')" class="guide_item">
        	<div v-bind:class="[$route.path.indexOf('stuff') !== -1 ? stuff_icon_active : stuff_icon]"></div>
            <span>好物</span>
        </section>
        <section @click = "gotoAddress('/profile')" class="guide_item">
            <div v-bind:class="[$route.path.indexOf('profile') !== -1 ? profile_icon_active : profile_icon]"></div>
            <span>我的</span>
        </section>
    </section>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },

    }

</script>

<style lang="less" scoped>
    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 1.95rem;
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		span{
			font-size: 0.45rem;
            color: #666
		}
    }
    .index_icon_active{
        background: url('') no-repeat;
    }
    .index_icon{
        background: url('') no-repeat;
    }
    .ticket_icon_active{
        background: url('') no-repeat;
    }
    .ticket_icon{
        background: url('') no-repeat;
    }
    .menu_icon_active{
        background: url('') no-repeat;
    }
    .menu_icon{
        background: url('') no-repeat;
    }
    .stuff_icon_active{
        background: url('') no-repeat;
    }
    .stuff_icon{
        background: url('') no-repeat;
    }
    .profile_icon_active{
        background: url('') no-repeat;
    }
    .profile_icon{
        background: url('') no-repeat;
    }
   
</style>
