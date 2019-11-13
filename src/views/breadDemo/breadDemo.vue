<template lang="pug">
    .bredDemo 
        .title 面包屑
        bread(:pathData="pathData")
        .content
            router-view
</template>
<script>
import bread from "@/components/bread/bread"
export default {
    components:{bread},
    data(){
        return{
            pathData:[
                {
                    title:"首页",
                    name:"breadHome",
                },{
                    title:"一级",
                    name:"breadOne",
                },{
                    title:"二级",
                    name:"breadTwo",
                },{
                    title:"三级",
                    name:"breadThree",
                }
            ]
        }
    }
}
</script>
<style scoped lang="less">
.title{
    font-size:22px;
    font-weight:600;
    margin-bottom:32px;
}
.content{
    padding-top:48px;
    font-size:22px;
}
</style>