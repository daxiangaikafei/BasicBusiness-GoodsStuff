<template>
	<transition name="router-fade" mode="out-in">
		<div class="modal" v-if="pastle" >{{ message }}</div>
	</transition>
</template>
<script>
    export default {
        props: ['pastle','message'],
        data() {
            return {
            	
            }
        }
    }
</script>
<style lang="less" scoped>
	.modal {
        font-size: 15px;
        position: fixed;
        top: 45%;
        width: 50%;
        height: 75px;
        text-align: center;
        background: rgba(0, 0, 0, 0.53);
        color: #fff;
        padding: 30px;
        left: 25%;
        border-radius: 5px;
    }
</style>