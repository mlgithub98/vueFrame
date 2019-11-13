import axios from 'axios';

import { Message, Loading } from 'element-ui';
// import _this from '../main.js';
import Router from  '../router';
// import Cookies from 'js-cookie';

// import router from '@/router/index'

let loading        //定义loading变量
let token = '';
axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}
function endLoading() {    //使用Element loading-close 方法
    if(loading&&loading.close()){
        loading.close();
    }
}


//http response 拦截器

axios.interceptors.request.use((config)=>{
    config.headers.common['type'] = "1";
    // if(config.url.indexOf("upload")==-1){
        startLoading();
    // }
    token = window.sessionStorage.getItem("AITerminalTest_token");

    if(token){
        config.headers.common['token'] = token;
    }
    return config;
},(error)=>{
    endLoading();
    return Promise.reject(error);
}
);

axios.interceptors.response.use( (res)=> {
    if(res.config.url.indexOf("api/monitorActiveTime")==-1){
        endLoading();
    }
    if(res.data.code==99999){
        Message.error(res.data.msg);
        Router.push('/UserLogin');
    }
    return res;
},(error)=>{
    endLoading();
    return Promise.reject(error);
});


$.ajaxSetup({
    complete: function (res,status) {
        if (res&&res.responseJSON&&res.responseJSON.code == "99999"&&status == "success") {
            Message.error(res.responseJSON.msg);
            Router.push('/UserLogin');
        }else{
            // console.log("已经登录！")
        }
    },
    beforeSend: function (xhr) { //可以设置自定义标头
        token = mercyStore.getToken("TokenKey");
        if(token){
            xhr.setRequestHeader('token', token.token);
        }
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader('type', "1");
        // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }

});