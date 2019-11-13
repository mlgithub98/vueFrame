<template lang="pug">
    .breadHome 
        .title 二级页面
        .content
            router-view
</template>
<script>
export default {

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