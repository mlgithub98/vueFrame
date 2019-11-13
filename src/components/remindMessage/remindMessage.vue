<template>
    <div class="remind" v-if="remindShow">
        <span class="el-icon-circle-check" v-if="fontShow"></span>
        <span>{{remindText}}</span>
    </div>
</template>

<script>
import Bus from "@/Bus"
export default {
    data(){
        return{
            remindShow:false,
            fontShow:"",
            remindText:"",
        }
    },
    mounted(){
        Bus.$on("remindMessage",(value)=>{
            console.log(value)
            this.remindShow=value[0]
            this.fontShow=value[1]
            this.remindText=value[2]
        })  
    },
    watch:{
        remindShow:function(value){
            if(value){
                setTimeout(()=>{
                    this.remindShow=false
                },2000)
            }
        }
    }
}
</script>

<style>
    .remind{
        width:220px;
        height:56px;
        background:rgba(0,0,0,.65);
        border-radius:4px;
        line-height:56px;
        color:#fff;
        font-size: 16px;
        text-align: center;
        position:fixed;
        left:50%;
        margin-left:-110px;
        top:20%;
    }
    .remind span:first-child{
        margin-right:8px;
    }
</style>
