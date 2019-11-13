<template>
    <div class="log">
        <div class="loginbox">
            <div class="loginInfoBox">
                <div class="loginInfoTitle">
                    <img src="../../assets/images/logoLogin.png" style="margin-right:10px;line-height: 33px;vertical-align: sub;display:inline-block;width:55px;height:27px;" alt="">
                    德卡智能终端管理系统
                </div>
                <div class="loginInfoDesc">德卡，让生活更便捷</div>
                <form class="loginInput">
                    <div class="loginInputRow">
                        <el-input type="text" placeholder="账户" v-model="ruleForm.uname" clearable class="psinput" @keyup="clearMsgTip()" autocomplete="off"></el-input>
                        <span class="dc-icon_user"></span>
                    </div>
                    <div class="loginInputRow pwd-form-item">
                        <el-input type="text" placeholder="密码" v-model="ruleForm.password" clearable :class="['psinput',pwdHide?'password':'']" @input="clearMsgTip"></el-input>
                        <span class="dc-icon_key"></span>
                        <div class="pwd-eye" @click="pwdHideToggle" v-if="ruleForm.password!==''">
                            <i :class="[pwdHide?'dc-icon_eye_close':'dc-icon_eye']"></i>
                        </div>
                    </div>
                    <div class="loginInputRow" style="height:22px;line-height:22px;">
                        <div class="loginInputRowLeft" @click="changeAutoLoginStatus()">
                            <span :class="[{'dc-icon_double': autoLoginStatus==1},{'el-checkbox__inner': autoLoginStatus==0}]" :style="{'color':checkBoxColor}"></span>
                            自动登录 
                        </div>
                        <div class="loginInputRowRight" v-show="msgtipShow">
                            {{msgtip}}
                        </div>
                    </div>
                </form>
                <div class="loginBtn" @click="login" :class="{'loginbtnconfirm': ruleForm.uname!=''&&ruleForm.password!='' }">登 录</div>
            </div>
        </div>
        <div class="loginBottom">
            copyright &copy; 2019 深圳市德卡科技股份有限公司
        </div>
    </div>

</template>

<script>
import Bus from "@/Bus.js"
import { BASE_URL } from "@/config/IPconfig";
export default {
    data(){
        return{
            ruleForm:{
                uname:"",
                password:"", 
            },
            autoLoginStatus:"",
            msgtipShow:false,
            msgtip:"",
            checkBoxColor:"#0057DD",
            pwdHide:true,
        }
    },
    watch:{
        '$route.name':(val)=>{
            console.log(val)
        }
    },
    methods:{
        pwdHideToggle(){
            this.pwdHide=!this.pwdHide
        },
        // 点击改变自动登录的状态
        changeAutoLoginStatus(){
            if(this.autoLoginStatus==0){
                this.autoLoginStatus=1;
                this.checkBoxColor="#0057DD";
            }else{
                this.autoLoginStatus=0;
                this.checkBoxColor="";
            }
            localStorage.setItem("autoLoginStatus",this.autoLoginStatus);
        },
        // 清除提示
        clearMsgTip(){
            this.msgtipShow=false,
            this.msgtip="";
        },
        //点击登录按钮
        login(){
            if(this.ruleForm.uname==""||this.ruleForm.password==''){
                return false;
            }else{
                this.tologin();
            }
        },

        // 去登陆
        tologin(){
            Bus.$emit("get_heartg",("333","444"))
            //后端请求数据
            let formData = new FormData()
            formData.append('uname', this.ruleForm.uname)
            formData.append('password', this.ruleForm.password)

            var url=`${BASE_URL}/user/login`
            this.axios.post(url,formData).then((res)=>{
                console.log(res)
                if(res.data.code==1){
                    var result=res.data.result
                    //将用户名与密码放置本地
                    localStorage.setItem("AITerminal_token",result.token)
                    localStorage.setItem("password",this.encodeUnicode(this.ruleForm.password))
                    //将用户信息放置本地
                    localStorage.setItem("userInfo",JSON.stringify(result))
                    
                    mercyStore.SETuserInfoEntity(result);

                    //跳转至导航平台页面
                    this.$router.push('/')

                }else if(res.data.code==0){
                    this.msgtipShow=true,
                    this.msgtip=res.data.mes;
                }
            }).catch((res)=>{
               // console.log(res)
                
                this.remindShow=true
                this.serverFail=true
                this.serverSuccess=false
                setTimeout((()=>{
                    this.remindShow=false
                }),2000)
            })
        },
        encodeUnicode(str) {  
            var res = [];  
            for ( var i=0; i<str.length; i++ ) {  
            res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);  
            }  
            return "\\u" + res.join("\\u");  
        } ,
        decodeUnicode(str) {  
            str = str.replace(/\\/g, "%");  
            return unescape(str);  
        } ,
    },
    destroyed(){
        document.onkeydown=null
    },
    mounted(){
        this.ruleForm.password='';
        document.onkeydown =(e)=>{
            e = window.event || e;
            if(e.code=='Enter'||e.code=='enter'||e.keyCode==13){
                //验证在登录界面和按得键是回车键enter
                 this.login();//登录函数
            }
        }
        //获取自动登陆下的本地信息并判断
        if(localStorage.getItem("userInfo")){
            var userInfo=JSON.parse(localStorage.getItem("userInfo"));
            this.ruleForm.uname=userInfo.uname;
        }else{
            this.ruleForm.uname=''
            this.ruleForm.password='';
        }
        this.autoLoginStatus = localStorage.getItem("autoLoginStatus",this.autoLoginStatus)||0;
        if(this.autoLoginStatus==1&&this.ruleForm.uname!==''){
            if(localStorage.getItem("password")!==null){
                this.ruleForm.password=this.decodeUnicode(localStorage.getItem("password"));
                this.tologin();
            }
        }
    },
    
}
</script>

<style scoped lang="less">
 @deep: ~'>>>';
.log{
    height:100%;
    width:100%;
    min-width: 1000px;
    background: #F0F3F7;
    position: relative;
}
.loginbox{
    width: 931px;
    height: 506px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -270px;
    margin-left: -465px;
    background: url(../../assets/images/sign_bj_011x.png) 100% 100%;
}
.loginInfoBox{
    position: absolute;
    top: 100px;
    left:500px;
    width: 320px;
    height: 310px;
}
.loginInfoTitle{
    font-size: 24px;
    color: #0E1834;
    line-height: 33px;
}
.loginInfoDesc{
    margin-top: 10px;
    margin-bottom: 34px;
    font-size: 12px;
    color: #6C7A8D;
    line-height: 16px;
    text-align: center;
}
.loginInput{
    width:100%;
}
.loginInputRow{
    width:100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 24px;
    position: relative;
}
.loginInputRow{
    @{deep} input{
        width: 320px;
        height: 40px;
        line-height: 40px;
        background: #FAFBFD;
        border-radius: 2px;
        padding-left:36px;
        font-size: 14px;
    }
    
} 
.loginInputRow input:focus{
    border: 1px solid #ABB4E4;
}
.el-input .el-input__clear{
    position: absolute;
    right: 35px;
    top: -11px;
    color: #ADB8C5;
    font-size: 14px;
    z-index: 1;
}
.loginInputRow span{
    position: absolute;
    left: 13px;
    top: 13px;
    color:#ADB8C5;
    font-size: 14px;
}
.loginInputRowLeft{
    font-size: 14px;
    color: rgba(0,0,0,0.65);
    position: absolute;
    top: 0px;
    left: 24px;
    width: 120px;
    height: 22px;
    line-height: 22px;
    cursor: pointer;
}
.loginInputRowLeft span{
    position: absolute;
    top: 3px;
    left: -22px;
    font-size: 16px;
    width:16px;
    height:16px;
    border-radius: 2px;
}
.loginInputRowRight{
    font-size: 12px;
    color: #DA1717;
    text-align: center;
    line-height: 22px;
}
.psinput .el-input__inner{
    width: 320px;
    height: 40px;
    line-height: 40px;
    background: #FAFBFD;
    border-radius: 2px;
    padding-left:36px;
    font-size: 14px;
}
.psinput .el-input__inner:focus{
    border: 1px solid #ABB4E4;
}
.loginBtn{
    width: 320px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    border-radius: 2px;
    color: #FFFFFF;
    background: #D4DCE7;
}
.loginbtnconfirm{
    color: #FFFFFF;
    background: #0064FF;
}
.loginbtnconfirm:hover{
    background: #3277E3;
}
.loginbtnconfirm:active{
    background: #3277E3;
}
.loginBottom{
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    color: rgba(0,0,0,0.45);
    position: absolute;
    bottom: 24px;
    left: calc(50% - 130px);
}

</style>
