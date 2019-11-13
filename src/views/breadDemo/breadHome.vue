<template lang="pug">
    .breadHome 
        .title 首页
        .go-menu
            .click(@click="goOne") 去一级
            .click(@click="goTwo") 去二级
            .click(@click="goThree") 去三级
        .content
            router-view
</template>
<script>
export default {
    methods:{
        goOne(){
            this.$router.push({
                name:"breadOne"
            })
        },
        goTwo(){
            this.$router.push({
                name:"breadTwo"
            })
        },
        goThree(){
            this.$router.push({
                name:"breadThree"
            })
        }
    }
}
</script>
<style scoped lang="less">
.breadHome{
    .title{
        font-size:22px;
        font-weight:600;
    }
    .go-menu{
        overflow: hidden;
        .click{
            cursor:pointer;
            font-size:14px;
            margin:16px 0;
            margin-right:24px;
            float:left;
        }
    }
    .content{
        margin:24px 0;
    }
}
</style>