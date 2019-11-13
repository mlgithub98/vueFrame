<template lang="pug">
    <div class="box">
        <h2 style="margin:20px 0">全局过滤器案例</h2>
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>formatCount</h4>
                    <p>数字三位分割</p>
                    <div>100000.56 ——&gt; {{100000.56 | formatCount}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>formatFileName</h4>  
                    <p>文件名超过20中间... </p>  
                    <div>01234567890123456789.zip ——&gt; {{'01234567890123456789.zip' | formatFileName}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>formatFileSize</h4>  
                    <p>文件大小，初始单位byte</p>  
                    <div>1024 ——&gt; {{'1024' | formatFileSize}}</div>
                    <div>1048576 ——&gt; {{'1048576' | formatFileSize}}</div>
                    <div>1073741824 ——&gt; {{'1073741824' | formatFileSize}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>numberFormatter</h4>  
                    <p>数字格式</p>  
                    <div>1000 ——&gt; {{'1000' | numberFormatter}}</div>
                    <div>10000 ——&gt; {{'10000' | numberFormatter}}</div>
                    <div>100000000 ——&gt; {{'100000000' | numberFormatter}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>uppercaseFirst</h4>  
                    <p>首字母大写</p>  
                    <div>world ——&gt; {{'world' | uppercaseFirst}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>formatRMBPrice2</h4>  
                    <p>价格，￥，保留到小数点后两位 </p>  
                    <div>100.567 ——&gt; {{'100.567' | formatRMBPrice2}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>时间戳</h4>  
                    <p>datetime </p>  
                    <div>1566305040000 ——&gt; {{'1566305040000' | datetime}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>时间戳</h4>  
                    <p>date </p>  
                    <div>1566305040000 ——&gt; {{'1566305040000' | date}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>时间戳</h4>  
                    <p>time </p>  
                    <div>1566305040000 ——&gt; {{'1566305040000' | time}}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h4>四位分隔</h4>  
                    <p>四位分隔 </p>  
                    <div>1566305040000 ——&gt; {{'1566305040000' | cardSpace4}}</div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
   data() {
      return {

      }
   },
   mounted() {

   },
   methods: {

   }
}
</script>
<style scoped lang="less">
    .box{
        padding:20px
    }
</style>
