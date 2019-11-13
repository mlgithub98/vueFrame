<template>
    <div class="loading" v-if="loadingShow">
        <img class="loading-img" src="@/assets/images/loading.gif">
    </div>
</template>

<script>
import Bus from "@/Bus"
export default {
    data(){
        return{
            loadingShow:false
        }
    },
    mounted(){
        Bus.$on("loadingShow",(value)=>{
            this.loadingShow=value
        })
    }
}
</script>

<style>
.loading{
    width:72px;
    height:72px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-36px;
    margin-top:-36px;
    background: rgba(0,0,0,1);
    border-radius:4px;
}
.loading-img{
    width:16px;
    height:16px;
    position:absolute;
    top:50%;
    margin-top:-8px;
    left:50%;
    margin-left:-8px;
}
</style>
