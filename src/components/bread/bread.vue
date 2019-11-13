<template lang="pug">
    .bread 
        .bread-lis(v-for="(item,index) in pathLis")
            .name(@click="breadClick(index)") {{item.title}}
            span(class="el-icon-arrow-right" v-if="index<(pathLis.length-1)") 
</template>
<script>
export default {
    props:["pathData"],
    data(){
        return{
            pathLis:[]
        }
    },
    mounted(){
        for(let i in this.pathData){
            if(i <= (this.$route.path.split("/").length-2)){
                this.pathLis.push(this.pathData[i])
            }
        }
    },
    methods:{
        breadClick(index){
            this.$router.push({
                name:this.pathData[index].name
            })
            this.pathLis = []
            for(let i in this.pathData){
                if(i <= index){
                    this.pathLis.push(this.pathData[i])
                }
            }
        }
    },
    watch:{
        $route(to,from){
            this.pathLis = []
            for(let i in this.pathData){
                if(i <= (to.path.split("/").length-2)){
                    this.pathLis.push(this.pathData[i])
                }
            }
        }
    }
}
</script>
<style scoped lang="less">
.bread{
    overflow: hidden;
}
.bread-lis{
    float:left;
    .name{
        cursor:pointer;
        float:left;
    }
    span{
        margin:0 8px;
    }
}
</style>