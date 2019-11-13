<template>
    <div class="header-page" ref="headerpage">
        <div class="header-page-part" @click="loginOperateShow=false;" ref="headerPage">
            <div class="header-page-title">
                <div class="header-page-title-logo">
                    <img src="../../assets/images/ic_logo@3x.png" alt="">
                </div>
                <div class="header-page-title-desc">德卡数字识别服务组件</div>
                <div class="Interface-select">
                    <div :class="['Interface-select-main',type_style]" @click="changeInterfaceL"> 
                        {{Interface.label}}
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="Interface-list" v-show="show_Interface_list">
                        <div v-for="(item,index) in Interface_list" :key="index" class="Interface-item" @click="changeInterface(item)">
                            <div> <i class="el-icon-check" v-show="Interface.id == item.id"></i> </div>
                            <div>{{item.label}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
import Bus from "../Bus";
export default {
    name: 'hearderPage',
    components:{
    },
    data () {
        return {
            loginOperateShow: false,
            show_Interface_list:false,
            userName:"",
            Interface:{
                label:"扫描仪",
                id:"1",
            },
            Interface_list:[
                {label:"扫描仪",id:"1"},
                {label:"高拍仪",id:"2",}
            ],
            Interface_status:true,
        }
    },
    methods:{
        openOperetPromp(){
            this.loginOperateShow = !this.loginOperateShow;
        },
        hideOperetPromp(){
            this.loginOperateShow?this.loginOperateShow=false:"";
        },
        loginOut(){
            this.loginOperateShow = false;
            localStorage.clear();
            window.location.href='login.html';
        },
        changeInterface(item){
            this.Interface = item;
            this.show_Interface_list = false;
            Bus.$emit("changeInterface",item)
        },
        changeInterfaceL(){
            if(this.Interface_status=="canInterface"){
                this.show_Interface_list=!this.show_Interface_list
            }
        }
    },
    mounted(){
        let _this = this;
        this.globalClick(this.$refs.headerPage, function() {
            _this.show_Interface_list = false;
        });
        let seInterface = sessionStorage.getItem("changeInterface");
        if(seInterface&&seInterface==1){
            this.Interface={
                label:"扫描仪",
                id:"1",
            };
        }
    },
    computed:{
        type_style(){
            let status = this.$route.path=="/Disconnected"?'cantInterface':'canInterface';
            this.Interface_status = status;
            return status
        }
    }
}
</script>
<style scoped lang="less">
@import '../../assets/style/global.less';
    .header-page{
        color:#fff;
        background: #232C33;
        box-shadow: 0 1px 5px 0 ;
        font-size: 22px;
        text-align:left;
        width: 100%;
        height: 100%;
        .header-page-part{
            height: 100%;
            width: 1280px; 
            padding-left: 95px;
            .header-page-title{
                float: left;
                .header-page-title-logo{
                    float: left;
                    width: 80px;
                    height: 40px;
                    margin-top: 10px;
                    margin-right: 10px;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .header-page-title-desc{
                    float: left;
                }
                .Interface-select{
                    float: left;
                    margin-left: 42px;
                    position: relative;
                    width: 120px;
                    height: 32px;
                    line-height: 32px;
                    margin-top: 13px;
                    .Interface-select-main{
                        font-size: 14px;
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        border-radius: 5px;
                        text-align: center;
                        cursor: pointer;
                        .el-icon-arrow-down{
                            margin-left: 10px;
                        }
                    }
                    .cantInterface{
                        cursor:not-allowed;
                    }
                    .Interface-list{
                        opacity: 1;
                        position: absolute;
                        background: #FFFFFF;
                        font-size: 14px;
                        color: #333333;
                        width: 135px;
                        border: 1px solid #ddd;
                        z-index: 1;
                        .Interface-item{
                            padding: 5px 3px;
                            &>div{
                                display: inline-block;
                            }
                            &>div:nth-child(1){
                                width: 25px;
                                text-align: center;
                                font-size: 20px;
                                vertical-align: bottom;
                                margin-left: 5px;
                                margin-right: 5px;
                            }
                            .el-icon-check{
                                color: #5cb6ff;
                            }
                        }
                        .Interface-item:hover{
                            color: #5cb6ff;
                        }
                    }
                }
            }
            .header-page-loginperson{
                float: right;
                cursor: pointer;
                position: relative;
                span{
                    margin-right:10px;
                }
                .loginOperatePromp{
                    width: 160px;
                    background: #FFFFFF;
                    box-shadow: 0 0 4px 0 rgba(0,0,0,0.30);
                    border-radius: 4px;
                    font-size: 14px;
                    color: #333333;
                    position: absolute;
                    right: -25px;
                    top: 55px;
                    z-index: 2;
                    padding: 8px 0;
                    .loginOperatePromp-row{
                        width: 100%;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                    }
                    .loginOperatePromp-row:hover{
                        background-color: #DDEEFD;
                    }
                }
            }
        }
        
    }
</style>
