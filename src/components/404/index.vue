<template lang="pug">
    .page-404 
        img.img-404(src="@/assets/images/404.png")
        .msg 很抱歉，您访问的页面不存在
            .return 请开启代理服务
                 el-button(type="text" @click="goHome") 首页
</template>
<script>
export default {
    name:'page404',
   data() {
      return {

      }
   },
   mounted() {

   },
   methods: {
        goHome(){
            this.$router.push('/')
        }
   }
}
</script>
<style scoped lang="less">
    .page-404{
        text-align:center;
        padding-top:100px;
    }
    .img-404{width:600px; margin:0 auto 0;}
    .msg{margin-top:50px;font-size: 26px;
    color: #444;
    line-height: 30px;}
    .return{
         color: #777;
    margin: 7px 0 35px;
    font-size: 16px;
    line-height: 20px;
    }
</style>
