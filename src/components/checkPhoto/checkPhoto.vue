<template lang="pug">
    .check-photo
        h2 图片预览
        .content
            .son-title 点击图片预览
            .photo-box(v-viewer="")
                img(src="@/assets/images/pic.jpg")
            .son-title 点击文字预览
            .img-text(@click="checkImg") 我是图片，戳我
            .photo-box(v-viewer="" v-show="false")
                img(:src="imgUrl" ref="checkImgDom")
</template>
<script>
export default {
    name:"checkPhoto",
    data(){
        return{
            //点击文字查看图片
            imgUrl:"",
            checkImgShow:false
        }
    },
    methods:{
        //点击文字查看图片
        checkImg(){
            // this.checkImgShow = true
            this.imgUrl = "/static/img/pic.b69ad50.jpg"
            setTimeout(()=>{
                this.$refs.checkImgDom.click()
            },100)
        }
    },
}
</script>
<style scoped lang="less">
.title{
    font-weight:600;
    font-size:16px;
}
.son-title{
    font-weight:600;
    font-size:14px;
    margin-top:24px;
}
.photo-box{
    margin-top:24px;
    cursor:pointer;
    img{
        width:300px;
        height:200px;
    }
}
.img-text{
    margin-top:24px;
    cursor:pointer;
    font-size:24px;
}
</style>