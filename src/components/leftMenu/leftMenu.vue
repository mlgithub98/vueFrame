<template lang="pug">
    .header-page
        el-collapse(accordion,v-model = "activeName" , @change = "handleChange")
            div(v-for = "(navitem,index) in left_title")
                router-link(:to ="navitem.pathName", :key="index")
                    el-collapse-item(:name = "navitem.name")
                        template(slot = "title")
                            span.left-nav-leberf {{navitem.title}}
                        .left-nav-sub(v-if = "navitem.children")
                            router-link.left-nav-subitem(:to = " subnavitem.pathName ", v-for = "(subnavitem,childIndex) in navitem.children" , :key="childIndex", active-class = "left-nav-subitemActive")
                                span(class="style-p") {{subnavitem.title}}
            
            //div(@click="goClosedTest")
             | 去到另一个不为人知的地方
</template>

<script>
export default {
    name: 'hearderPage',
    components:{
    },
    data () {
        return {
            activeName:"1",
            left_title: [{
                name: "1",
                title: "系统",
                pathName:"/",
                children: [
                    {
                        name: "",
                        title: "登录页",
                        pathName: "/login"        
                    },
                    {
                        name: "",
                        title: "404",
                        pathName: "/404"        
                    },
                    {
                        name: "",  
                        title: "filters示例",
                        pathName: "/filtersExample"        
                    },
                    {
                        name: "",  
                        title: "表格示例",
                        pathName: "/tabledemo"        
                    },{
                        name: "",  
                        title: "表单示例",
                        pathName: "/formModel"        
                    },{
                        name: "",  
                        title: "编辑器",
                        pathName: "/ClosedTest"        
                    },{
                        name: "",
                        title: "查看图片示例",
                        pathName: "/checkPhoto"
                    },{
                        name: "",
                        title: "绘图DEMO",
                        pathName: "/chartDemoM"
                    },{
                        name:"",
                        title:"面包屑",
                        pathName:"/breadDemo"
                    }
                ]
            }]
        }
    },
    methods: {
        handleChange(v){
            console.log(v)
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        goClosedTest(){
            this.$router.push("/ClosedTest")
        }
    },
}
</script>
<style scoped lang="less">
@import '../../assets/style/global.less';
    .header-page{
        color:@c-blue2;
        font-size: 18px;
        text-align:left;
        padding-left:10px;
        height: 100%;
        width: 100%;
        .el-collapse{
            height: 100%;
            width: 100%; 
            .left-nav-leberf{
                font-size: 17px;
            }
            .left-nav-sub{
                font-size: 16px;
                a:hover{
                    .style-p{
                        background: #c3adc3;
                    }
                }
                span{
                    padding-left: 20px;
                    line-height: 30px;
                    border-bottom:1px solid #ddd;
                }
                .left-nav-subitemActive{
                    color:@c-black;
                }
                .style-p{
                    display: inline-block;
                    width: 100%;
                }
            }

        }

    }

</style>
