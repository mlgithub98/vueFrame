<template lang="pug">
    .header-box
        .header-middle.clear-fix
            .header-logo(@click="goHome")
                .logo-box
                    img.logo(src="@/assets/images/logo.png")
                .logo-text 系统名
            .header-data.clear-fix
                .user-name-box(@click="toggleUserBox")
                    .dc-icon_people
                    .login-name {{userInfo.uname}}
                    .user-list(v-if="userBoxShow",ref="userBoxRef")
                        .user-item(@click="editPwd") 
                            .dc-icon_key(style="font-size: 15px;")
                            | 修改密码
                        .user-item(@click="logOut") 
                            .dc-icon_logout
                            | 退出登录
                .login-organ {{userInfo.company_name}}
                //- .lang-box
                //-     .lang-item(:class="$i18n.locale=='zh'?'cur':''" @click="change_language('zh')") 中文
                //-     .lang-item(:class="$i18n.locale=='en'?'cur':''" @click="change_language('en')") EN
            .header-search(v-if="pathname!=='home'")
                el-input(placeholder="搜索", v-model="searchContext" @keyup.enter.native="search" clearable)
                .search-icon-box(:class="searchIconCur?'cur':''", @click="search")
                    <i class="dc-icon_search"></i>
        .mask(v-if="maskShow")
                .login-out
                    .login-out-header
                        .login-out-header-title 退出登录
                        span.el-icon-close(@click="logOutClose")
                    .login-out-content
                        .content-text 确定退出当前帐号？
                        .log-out-footer
                            .c-confirm(@click="outConfirm") 确定
                            .c-cancle(@click="logOutClose") 取消
        
</template>

<script>
// import Bus from "@/Bus.js"

export default {
    name: 'hearderWithSearch',
    components:{
    },
    data () {
        return {
            searchContext:'',
            searchIconCur:false,
            userInfo:{uname:'2222222',company_name:''},
            userBoxShow:false,
            maskShow:false
        }
    },
    props: ['pathname'],
    watch: {
        searchContext(val){
           if(val!==''){
               this.searchIconCur=true
           }else{
               this.searchIconCur=false
           }
       },
        pathname: function(newVal,oldVal){
            if(newVal!=='globalSearchResult'){
                this.searchContext=''
            }else{
                this.searchContext=localStorage.getItem("searchContextGlobal")
            }
        }
    },
    mounted(){
        if(this.pathname!=='globalSearchResult'){
            this.searchContext=''
        }else{
            this.searchContext=localStorage.getItem("searchContextGlobal")
        }
        this.globalClick(this.$refs.userBoxRef,this.HideUserBox);
        window.addEventListener('setLang', ()=> {
            // 监听语言切换方法
            //console.log("切换语言")
        })
        if(localStorage.getItem("userInfo")){
            this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
        }
    },
    methods:{
        change_language(type){
            this.$i18n.locale = type;
            this.resetSetLanguage('lang',type);
        },
        search(){
            if(this.searchIconCur){
                localStorage.setItem("searchContextGlobal",this.searchContext)
                Bus.$emit("startGlobalSearch",{searchContext:this.searchContext})
             
                //跳转搜索结果页
                this.$router.push({
                    name:"globalSearchResult",
                    query: { sn: this.searchContext }
                })
            }
        },
        toggleUserBox(e){
            e=e || window.event
            e.stopPropagation()
            this.userBoxShow=!this.userBoxShow
        },
        HideUserBox(){
            this.userBoxShow=false
        },
        editPwd(){ //传递消息，打开修改密码弹窗
            Bus.$emit("editPwdShow",true)
        },
        logOut(){
            //使用element
            // this.$confirm('确定退出登录吗？', '', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: '',
            //     showClose: false,
            //     closeOnClickModal: false,
            //     closeOnPressEscape:false,
            //     center:true,
            //     customClass:'dc-confirm-popup'
            // }).then(() => {
            //     //let arr =['AITerminal_token','userInfo','password','autoLoginStatus']
            //     let arr =['AITerminal_token','password']
            //     arr.forEach(item=>{
            //         localStorage.removeItem(item);
            //     })
            //     Bus.$emit("stopInterval","stop")
            //     this.$router.push({
            //         name:"login"
            //     })
            // }).catch(() => {
                       
            // });
            //使用自定义方法
            this.maskShow = true
        },
        goHome(){
            if(this.$route.name==='home'){
                this.$router.replace({
                    path: '/refresh',
                })
            }else{
                this.$router.push('/')
            }
            
        },
        // 确定退出
        outConfirm(){
            this.bus.$emit("stopInterval","stop")
            this.maskShow = false
            this.$router.push({
                name:"login"
            })
        },
        // 取消退出
        logOutClose(){
            this.maskShow = false
        },
    },
}
</script>
<style scoped lang="less">
//@import '../../../../assets/style/global.less';
@deep: ~'>>>';
    .header-box{
        line-height: 64px;
        color:#fff;
        font-size: 14px;
        text-align:left;
        background:#0048B7;
        .header-middle{
            width: 83%;
            margin:0 auto;
            .header-logo{
                float:left;
                .logo-box{
                    float: left;
                    margin-right:13px;
                    height: 64px;
                    cursor: pointer;
                    &:hover{
                        background: #005DEB
                    }
                }
                .logo{margin-top:19px;width:55px;height:27px;}
                .logo-text{float: left;cursor: pointer; font-size: 18px;}
            }
            .header-search{
                float:right;
                width:320px;
                position: relative;
                .search-icon-box{position: absolute;right:0;top:17px;line-height:32px;font-size:16px;font-weight:bold;cursor: pointer;padding:0 14px;
                    color:rgba(255,255,255,.5);
                    &.cur{color:#fff}
                }
                .el-input{
                    vertical-align: top;
                    line-height:32px;
                    margin-top:16px;
                    @{deep} .el-input__suffix{right: 38px;}  
                    @{deep} .el-input__inner{
                        background:#003990;
                        height:32px;line-height:32px;border-radius: 16px;border:none;
                        color:#fff;
                        padding:0 65px 0 18px;
                    }
                    @{deep} input::-webkit-input-placeholder{
                        color:rgba(255,255,255,.5);
                    }
                    @{deep} input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                        color:rgba(255,255,255,.5);
                    }
                    @{deep} input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                        color:rgba(255,255,255,.5);
                    }
                    @{deep} input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
                        color:rgba(255,255,255,.5);
                    }
                }

            }
            .header-data{
                float: right;
                margin-left:22px;
                .user-name-box{
                    float:left;
                    margin-right: 12px;
                    position: relative;
                    cursor: pointer;
                    .dc-icon_people{float: left;margin-right:8px;line-height: inherit}
                    .login-name{float: left;}
                    .user-list{
                        width:139px;
                        background:#fff;
                        position:absolute;
                        left:50%;
                        top:49px;
                        margin-left:-69px;
                        z-index: 10;
                        border: 1px solid #D8DDE1;
                        box-shadow: 0 5px 10px 0 rgba(17,28,34,0.02);
                        border-radius: 1px;
                        padding:8px 0;
                        .user-item{
                            width:100%;
                            height:40px;
                            line-height:40px;
                            text-align:center;
                            color: #11151A;
                            font-size:14px;
                            cursor: pointer;
                            &:hover{
                                background:#E6ECF4;
                            }
                            [class*="icon"]{
                                color:#231916;
                                margin-right:12px;
                            }
                        }
                    }
                }
                .login-organ{float: left;color: #fff}
                .lang-box{float:left;margin-left:24px;
                    .lang-item{float:left;
                        position: relative;
                        cursor: pointer;
                        color:rgba(255,255,255,0.5);
                        &.cur{color:#fff;}
                        +.lang-item{
                            padding-left:9px;
                            margin-left:8px;
                            &:before{content:"";position:absolute;width:1px;height:13px;top:50%;left:0;margin-top:-7px;background: #fff;}
                        }
                    }
                    
                }
            }
        }
        .mask{
            width:100%;
            height:100%;
            position:fixed;
            left:0;
            top:0;
            background:rgba(0,0,0,.5);
            z-index:50;
        }
        .login-out{
            width:424px;
            height:230px;
            border-radius:4px;
            position:absolute;
            left:50%;
            top:50%;
            margin-left:-212px;
            margin-top:-115px;
            overflow: hidden;
        }
        .login-out-header{
            width:100%;
            height:48px;
            overflow: hidden;
            padding:0 24px;
            background: #F0F4F6;
            span{
                float:right;
                line-height:48px;
                cursor:pointer;
                color:#888C96;
            }
        }
        .login-out-header-title{
            line-height:48px;
            font-size: 16px;
            color: #262626;
            font-weight:600;
            float:left;
        }
        .login-out-content{
            width:100%;
            height:182px;
            background:#fff;
            padding-top:48px;
        }
        .content-text{
            width:100%;
            text-align:center;
            font-size: 14px;
            color: #262626;
            line-height:22px;
        }
        .log-out-footer{
            width:176px;
            margin:0 auto;
            margin-top:48px;
        }
    }
</style>
