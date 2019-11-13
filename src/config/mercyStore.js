global.count=['usermsg','pagemsg','TokenKey'];
import bus from '@/components/Bus.js';
import JQ from '@/assets/js/jquery-1.10.2.min.js'
// import echarts_gl from "echarts-gl"
import moment from 'moment';
import axios from 'axios';
import * as baseajaxload from './ajaxload.js';
import md5 from 'js-md5';
window.md5 = md5;
import Vue from 'vue'
import {BASE_URL} from '@/config/IPconfig';

window.moment = moment;
window.baseajaxload=baseajaxload;

window.onload=function(){

}
window.onunload=function(){
    deforedistory();
}
window.onbeforeunload=function(){
    deforedistory();
}
export function getToken () {
    var arr,reg=new RegExp(`(^| )TokenKey=([^;]*)(;|$)`);
    if(arr=document.cookie.match(reg)){
        global.count.TokenKey = eval('(' + arr[2] + ')');
    }
    return global.count.TokenKey;
}


export function removeusermsg () {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var delValue = getuserinformation("usermsg");
    if (!!delValue) {
        document.cookie = "usermsg"+'='+delValue+';expires='+date.toGMTString();
    }
}


export function setToken(k,i) {
    let s = JSON.stringify(i)
    document.cookie=`${k}=${s}`;
}
export function removeToken(k,i) {
    let s = JSON.stringify(i)
    document.cookie=`${k}=${s};expires=-1`;
}

export function getuserinformation (data) {
    var arr,reg=new RegExp(`(^| )usermsg=([^;]*)(;|$)`);
    if(arr=document.cookie.match(reg)){
        global.count.usermsg = eval('(' + arr[2] + ')');
    }
    if(data) return global.count.usermsg[data];
    return global.count.usermsg;
}
export function getprocessinformation (k,data) {
    var arr,reg=new RegExp(`(^| )${k}=([^;]*)(;|$)`);
    if(arr=document.cookie.match(reg)){
        global.count[k] = eval('(' + arr[2] + ')');
    }
    if(data) return global.count[k][data];
    return global.count[k];
}
function deforedistory(){
    // document.cookie = ";
}
export function forBackstage(){
    return "骚老头子坏得很~~~~ 我信你个鬼!!!!"
}
export function issaveconfirm(tip,content,mothods){
    return bus.$emit('dialogVisible',{i:{"tip":tip,"content":content,"mothods":mothods}})
    // this.$confirm('确认关闭11aa？')
    // .then(_ => {
    // })
    // .catch(_ => {
    // });
}

export function SETuserInfoEntity(data){
    sessionStorage.setItem("userInfoEntity",JSON.stringify(data));
}
export function GETuserInfoEntity(data){
    return JSON.parse(sessionStorage.getItem("userInfoEntity"));
}
export function CLEARuserInfoEntity(data){
    return sessionStorage.removeItem("userInfoEntity");
}
// 字符转换
export function exchange(s){
    // var s=document.getElementById("txt").value;//输入值
    // document.getElementById("oldValue").innerText=s;//原始值
    // var result=document.getElementById("result");//转换结果
    /*正则转换中文标点*/
    s=s.replace(/：/g,':');
    s=s.replace(/。/g,'.');
    s=s.replace(/“/g,'"');
    s=s.replace(/”/g,'"');
    s=s.replace(/【/g,'[');
    s=s.replace(/】/g,']');
    s=s.replace(/《/g,'<');
    s=s.replace(/》/g,'>');
    s=s.replace(/，/g,',');
    s=s.replace(/？/g,'?');
    s=s.replace(/、/g,',');
    s=s.replace(/；/g,';');
    s=s.replace(/（/g,'(');
    s=s.replace(/）/g,')');
    s=s.replace(/‘/g,"'");
    s=s.replace(/’/g,"'");
    s=s.replace(/『/g,"[");
    s=s.replace(/』/g,"]");
    s=s.replace(/「/g,"[");
    s=s.replace(/」/g,"]");
    s=s.replace(/﹃/g,"[");
    s=s.replace(/﹄/g,"]");
    s=s.replace(/〔/g,"{");
    s=s.replace(/〕/g,"}");
    s=s.replace(/—/g,"-");
    s=s.replace(/·/g,".");
    /*正则转换全角为半角*/
    //字符串先转化成数组
    s=s.split("");
    for(var i=0;i<s.length;i++){
        //全角空格处理
        if(s[i].charCodeAt(0)===12288){
           s[i]=String.fromCharCode(32);  
        }
        /*其他全角*/
        if(s[i].charCodeAt(0)>0xFF00 && s[i].charCodeAt(0)<0xFFEF){
           s[i]=String.fromCharCode(s[i].charCodeAt(0)-65248);
        }
    }
    //数组转换成字符串
    s=s.join("");
    return s
}
//  业务类型反馈
export function getauthTypeList () {
    return[{
        value:"0",
        label:"个人认证"
    },{
        value:"1",
        label:"企业认证"
    },{
        value:"2",
        label:"事业单位"
    }];
}
// 获取浏览器类型
export function BrowserKernel(n) {
    var ua = navigator.userAgent.toLowerCase(),  
        s,  
        name = '',  
        ver = 0;  
    //探测浏览器
    (s = ua.match(/msie ([\d.]+)/)) ? _set("IE", _toFixedVersion(s[1])):  
    (s = ua.match(/firefox\/([\d.]+)/)) ? _set("Firefox", _toFixedVersion(s[1])) :  
    (s = ua.match(/chrome\/([\d.]+)/)) ? _set("Chrome", _toFixedVersion(s[1])) :  
    (s = ua.match(/opera.([\d.]+)/)) ? _set("Opera", _toFixedVersion(s[1])) :  
    (s = ua.match(/version\/([\d.]+).*safari/)) ? _set("Safari", _toFixedVersion(s[1])) : 0;  

    function _toFixedVersion(ver, floatLength) {  
    ver = ('' + ver).replace(/_/g, '.');  
    floatLength = floatLength || 1;  
    ver = String(ver).split('.');  
    ver = ver[0] + '.' + (ver[1] || '0');  
    ver = Number(ver).toFixed(floatLength);  
    return ver;  
    }  
    function _set(bname, bver) {  
    name = bname;  
    ver = bver;  
    }  
    return (n == 'n' ? name : (n == 'v' ? ver : name + ver));  
}
