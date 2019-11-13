
<template lang="pug">
    .formModel-page 
        h2| 表单验证
        .content
            .box
                //- 修改密码
                .sub-title 修改密码：新密码不能包含空格与中文，并不少于6位，确认密码与新密码必须一致 
                input(type="password" placeholder="请输入不少于6位密码" v-model="newPass" @focus="newPassFocus")
                .new-pass-remind(v-if="newPassRemind") {{passRemind}}
                input(type="password" placeholder="确认新密码" v-model="rePass" @focus="rePassFocus")
                .re-pass-remind(v-if="rePassRemind") 两次密码不一致
                .c-confirm(@click="changePass") 确定
            .box
                //- 不能输入中文与空格
                .sub-title 不能输入中文与空格
                input(placeholder="不能输入中文与空格" v-model="val1")
            .box
                //- 搜索框
                .sub-title 搜索框
                .search
                    input(placeholder="搜索" v-model="val2" @keyup="searchKeyup($event)")
                    span(v-show="val2!=''" @click="searchClear").el-icon-circle-close
                    span(:style="{'color':val2==''?'rgba(0, 0, 0, 0.25)':'#00B8DA'}" @click="search").el-icon-search
            .box
                //- 正则验证方法使用检验
                .sub-title 正则验证方法使用检验
                .check
                    input(placeholder="正则验证方法使用检验" v-model="val3" @focus="checkFocus")
                    .check-remind(v-if="checkRemindShow") {{checkRemind}}
                .c-confirm(@click="checkConfirm") 验证
</template>
<script>
export default {
    name:'formModel',
    data() {
        return {
            // 修改密码验证
            newPass:"",
            rePass:"",
            passRemind:"",
            newPassRemind:false,
            rePassRemind:false,

            //不能输入中文与空格
            val1:"",

            //搜索
            val2:"",

            //正则验证方法
            val3:"",
            checkRemind:"",
            checkRemindShow:false,
            regCheck:{
                ZZnumber: /^[1-9]+$/,                                                   //正整数
                Znumber: /^[0-9]+$/,                                                    //非负整数
                Chtext: /[\u4E00-\u9FA5\uF900-\uFA2D]/,                                 //中文
                Enumber: /^[0-9a-zA-Z]+$/,                                              //英文和数字
                XEnumber: /^[0-9]+([.]{1}[0-9]{1,3})?$/,                                //非负可以精确到小数点后三位的数字
                Xnumber: /^[0-9]+([.]{1}[0-9]+)?$/,                                     //非负可以精确到小数点后任意位的数字
                Email: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,      //邮箱
                telephone: /^[1][3,4,5,7,8][0-9]{9}$/,                                  //手机号
            },
        }
    },
    watch:{
        //不能输入中文与空格
        "val1":function(nv,ov){
            console.log(nv)
            var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
            if(reg.test(nv) || nv.indexOf(" ")>-1){
                this.val1 = ov
            }
        }
    },
    methods: {
        // 修改密码验证
        changePass(){
            this.newPassRemind = false
            this.passRemind = ""
            this.rePassRemind = false
            var regPass = /[\u4E00-\u9FA5\uF900-\uFA2D]/
            if(this.newPass == "" || this.newPass.length < 6){
                this.newPassRemind = true
                this.passRemind = "请输入正确的新密码"
            }else if(regPass.test(this.newPass) || this.newPass.indexOf(" ")>-1){
                this.newPassRemind = true
                this.passRemind = "密码中不能包含中文或者空格"
            }else if(this.newPass != this.rePass){
                this.rePassRemind = true
            }else{
                alert("修改密码成功")
            }
        },
        newPassFocus(){
            this.newPassRemind = false
            this.passRemind = ""
        },
        rePassFocus(){
            this.rePassRemind = false
        },

        //搜索
        searchClear(){
            this.val2 = ""
            alert("清楚搜索")
        },
        search(){
            alert("开始搜索")
        },
        searchKeyup(e){
            if(e.keyCode == "13"){
                this.search()
            }
        },

        //正则验证方法使用检验
        checkConfirm(){
            if(this.regCheck.telephone.test(this.val3)){
                this.checkRemindShow = true
                this.checkRemind = "验证通过"
            }else{
                this.checkRemindShow = true
                this.checkRemind = "验证错误"
            }
        },
        checkFocus(){
            this.checkRemindShow = false
            this.checkRemind = ""
        },
    }
}
</script>
<style scoped lang="less">
.formModel-page {
    padding: 10px;
}
.title{
    font-weight:600;
    font-size:16px;
}
// 修改密码验证
.box{
    overflow: hidden;
    position:relative;
    margin-top:32px;
    .sub-title{
        margin-bottom:24px;
        font-weight:600;
        font-size:14px;
    }
    input{
        margin-bottom:24px;
        display:block;
    }
    .new-pass-remind{
        position:absolute;
        color:#EE2C2C;
        font-size:12px;
        top:75px;
        left:14px;
    }
    .re-pass-remind{
        position:absolute;
        color:#EE2C2C;
        font-size:12px;
        top:132px;
        left:14px;
    }
}
//正则验证检验
.check-remind{
    position:absolute;
    color:#EE2C2C;
    left:10px;
    top:76px;
}
</style>
