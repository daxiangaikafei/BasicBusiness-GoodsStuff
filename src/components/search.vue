<template>
    <section id='search_module'>
        <img class="search-icon" src="../static/images/search-icon.png" alt="">
       <input placeholder="请输入搜索词" v-model="keywords"></input>
       <div class="searching" @click="searching">搜索</div>
    </section>
</template>

<script>
    export default {
        data() {
                return {
                    keywords: ''
                }
            },
            created() {
                this.keywords = this.$route.query.keywords;
            },
            methods: {
                searching: function() {
                    if(this.$route.path.indexOf('search') != -1){
                        this.$emit("searching", this.keywords);
                    }else{
                        this.$router.push('/search?keywords=' + this.keywords)
                    }
                }
            },
            mounted() {

            }
    }
</script>

<style lang="less">
    #search_module {
        position: relative;
        height: 48px;
        background: #fff;
        .search-icon {
            width: 15px;
            position: absolute;
            left: 30px;
            top: 17px;
            z-index: 999;
            float: left;
            // padding: 10px 5px 5px 10px;
        }
        input {
            -webkit-appearance: none;
            box-shadow: 0 0 1px #efeff4 inset;
            -moz-box-shadow: 0 0 1px #efeff4 inset;
            /*firefox*/
            -webkit-box-shadow: 0 0 1px #efeff4 inset;
            width: 80%;
            background: #efeff4;
            border: 1px solid #efeff4;
            color: #999;
            margin-left: 15px;
            border-radius: 15px;
            padding-left: 40px;
            font-size: 14px;
            height: 28px;
            margin-top: 10px;
            font-family: PingFang-SC-Regular!important;
            float: left;
            z-index: 10;
        }
        .searching {
            float: left;
            width: 15%;
            height: 38px;
            line-height: 48px;
            text-align: center;
            color: #fd472b;
            font-size: 15px;
            font-family: PingFang-SC-Regular!important;
        }
    }
</style>