<template>
    <div class="select-component">
        <div :class="status ? 'selected' : 'select'" :style="{'color':title!=defaultTitle ? '#262626' : '#BEBEBE'}" @click="selectClick">{{title}}</div>
        <span></span>
        <div class="c-select-ul" v-if="selectShow">
            <div class="c-select-li" v-for="(item,index) in selectArr" @click="choice(index)">{{item}}</div>
        </div>
    </div>
</template>

<script>
import Bus from "@/Bus.js"
export default {
    data(){
        return{
            selectShow:false,
            status:false,
            defaultTitle:"请选择",
            title:"请选择",
            selectArr:[]
        }
    },
    mounted(){
        this.globalClick(document.getElementsByClassName("c-select-u")[0],this.seleDis)
        Bus.$on("seleArr",(value)=>{
            this.selectArr=value
            console.log(this.selectArr)
        })
    },
    methods:{
        selectClick(e){
            e=e || window.event
            e.stopPropagation()
            this.selectShow=true
            this.status=true
        },
        seleDis(){
            this.selectShow=false
            this.status=false
        },
        choice(index,e){
            e=e || window.event
            e.stopPropagation()
            this.title=this.selectArr[index]
            this.selectShow=false
            this.status=false
        }
    }
}
</script>

<style scoped lang="less">
@import '../../assets/style/global.less';
@height:32px;
.select-component{
    position:relative;
    width:100%;
    height:@height;
}
.select{
    width: 100%;
    height: 100%;
    border-radius: 4px;
    outline: none;
    border: 1px solid #D9D9D9;
    padding-left:12px;
    font-size:14px;
    line-height:@height;
    cursor: pointer;
    position:relative;
}
.select:hover{
    border:1px solid #00B8DA;
}
.selected{
    width: 100%;
    height: 100%;
    border-radius: 4px;
    outline: none;
    border:1px solid #00B8DA;
    padding-left:12px;
    font-size:14px;
    line-height:@height;
    cursor: pointer;
    position:relative;
}
</style>
