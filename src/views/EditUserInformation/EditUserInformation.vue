<template lang="pug">
    .EditUserInformation
        .page-title
            el-button(size="small", @click="go_edit()") 编辑个人信息
            .title 系统主页
            el-button(size="small", @click="logout()") 退出系统
        .page-body
            el-row(:span="24")
                el-col(:span="24") 登录信息
            el-row(:span="24")
                el-col(:span="12") 
                    el-col(:span="9") 登录系统：
                    el-col(:span="15") {{Userinformation.sysinfo.systemName}}
                el-col.t-right(:span="12")
                    el-col(:span="9") 操作设备
                    el-col(:span="15") {{Userinformation.webinfo.BrowserKernel}}
            el-row(:span="24")
                el-col(:span="6") 登录方式
                el-col.t-right(:span="18") {{Userinformation.webinfo.loginType==1?"短信验证码登录":Userinformation.webinfo.loginType==2?"账号密码登录":""}}
            el-row(:span="24")
                el-col(:span="12") 
                    el-col(:span="9") 登录手机号：
                    el-col(:span="15") {{Userinformation.userInfoEntity.mobile}}
                el-col.t-right(:span="12")
                    el-col(:span="9") 密码
                    el-col(:span="15") ******
            el-row(:span="24")
                el-col(:span="6") 所属系统角色
                el-col.t-right(:span="18")
                    //- Role_list      item.outName
                    span(v-for="(item,index) in Userinformation.userSystemRoleEntityList") {{item.outRoleEntity.outName}}
                        span(v-show="item.accountStatus==0") (停)
                        span(v-show="index<Userinformation.userSystemRoleEntityList.length-1") ，
            el-row(:span="24")
                el-col(:span="6") 注册时间：
                el-col.t-right(:span="18") {{Userinformation.userInfoEntity.updateTime}}
            el-row(:span="24")
                el-col(:span="6") 登录时间：
                el-col.t-right(:span="18") {{Userinformation.loginTime}}
            el-row(:span="24")
                el-col(:span="6") 账号状态：
                el-col.t-right(:span="18") {{Userinformation.userInfoEntity.outStatus==-1?"删除":Userinformation.userInfoEntity.outStatus==0?"停用":Userinformation.userInfoEntity.outStatus==1?"启用":""}}
        //.page-tool
            .el-form-item(label='认证名称',)
                label认证名称
                el-select(v-model="business", placeholder="请选择")
                    el-option(v-for="(item,index) in business_list", :label="item.outName", :value="item.uuid", :key="index")
            .el-form-item(label='认证类型',)
                label 认证类型
                el-select(v-model="authType", placeholder="请选择")
                    el-option(v-for="(item,index) in getauthTypeList", :label="item.label", :value="item.value", :key="index")
        //el-button(type="info", @click="goAuthentication()") 申请认证
</template>

<script>
import {BASE_URL} from '@/config/IPconfig'
import Bus from "../../Bus"
export default {
    name: 'EditUserInformation',
    components:{
    },
    data () {
        return {
            business: '',
            business_list:[],
            authType:"",
            getauthTypeList:mercyStore.getauthTypeList(),
            Userinformation:mercyStore.GETuserInfoEntity(),
            Role_list:[],
        }
    },
    mounted(){
        this.get_Bussiness();
        this.get_OutRoleList();
    },
    methods:{
        logout(){
            console.log(this.Userinformation.token)
            $.ajax({
                url: BASE_URL + "/api/logout",
                type: 'POST',
                async: false,
                data:JSON.stringify({
                    activeLogUuid:this.Userinformation.userInfoEntity.activeLogUuid
                }),
                headers: {
                    "Content-Type":"application/json",
                    "token":this.Userinformation.token
                },
                success:(res)=>{
                    console.log(res)
                    if(res.code=="0"){
                        mercyStore.CLEARuserInfoEntity();
                        Bus.$emit("stopInterval","stop")
                        mercyStore.removeToken("TokenKey","");
                        this.$router.push({name:"UserLogin"});
                    }
                }
            })
        },
        go_edit(){
            this.$router.push({
                name:'EditUseri',
                params:{userInfoEntity:this.Userinformation},
            })
        },
        //  前往认证
        goAuthentication(){
            // this.authType?
            this.$router.push({
                name:'ApplicationCertification',
                // params:{authType:this.authType},
            })
            // :this.$message.error("请选择认证类型");
        },
        // 获认证列表
        get_Bussiness(){
            let that = this;
            $.ajax({
                url: BASE_URL + `api/outBussiness/getBussinessBySystemId/${this.Userinformation.sysinfo.uuid}`,
                type: 'POST',
                async: false,
                headers: {
                },
                success: function (result) {
                    if (result.code == 0) {
                        that.business_list = result.businessList;
                    }
                },
                error: function (result) {
                    that.$message.error(result.msg);
                }
            })
        },
        // 获取系统角色
        get_OutRoleList(){
            let that = this;
            $.ajax({
                url: BASE_URL + `api/outRole/getOutRoleListByOutSystemId/${this.Userinformation.sysinfo.uuid}`,
                type: 'POST',
                async: false,
                dataType: "json",
                headers: {
                    'Content-Type':'application/json',
                },
                data:JSON.stringify({
                    outRoleType:"2"
                }),
                success: function (result) {
                    if (result.code == 0) {
                        that.Role_list = result.outRoleEntityList;
                    }
                },
                error: function (result) {
                    that.$message.error(result.msg?result.msg:"获取角色失败");
                }
            })
        },
    }
}
</script>
<style scoped lang="less">
@import '../../assets/style/global.less';
    .EditUserInformation{
        color:@c-blue3;
        // width: 100%;
        width: 450px;
        height: 100%;
        .page-title{
            .el-button,.title{
                display: inline-block;
            }
            .el-button:nth-child(1){
                margin-right:105px;
            }
            .title{
                margin-right:105px;
            }
        }
        .page-body{
            padding: 10px;
            background: #eee;
            margin:10px 0;
            line-height: 25px;
        }
        .page-tool{
            .el-form-item{
                label{
                    display: inline;
                }
                .el-select{
                    margin-left: 50px;
                    width: 350px;
                }
            }
        }
    }
</style>
