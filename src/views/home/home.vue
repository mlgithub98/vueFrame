<template lang="pug">
    .homepage
        headerWithSearch
        .home-main
            .left.fl(style="width:230px")
                leftMenu
            .right(style="margin-left:250px;overflow: auto;height: 100%;")
                router-view()
             
</template>

<script>
import headerPage from '@/components/hearderPage/hearderPage.vue'
import headerWithSearch from '@/components/headerWithSearch'
import leftMenu from '@/components/leftMenu/leftMenu.vue'

export default {
    name: 'home',
    components:{
        headerPage,leftMenu,headerWithSearch
    },
    data () {
        return {
            FolderStatus : false,
        }
    },
    mounted(){
        
    },
    methods:{
       

    },
    updated(){

    },
    watch:{
        
    },
}
</script>
<style scoped lang="less">
  .homepage {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction: column;
    box-sizing: border-box;
    .home-main{
        width:100%;
        height:100%;
        margin-top:20px;
    }
  }  
</style>
