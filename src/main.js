// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import JsEncrypt from 'jsencrypt';
Vue.prototype.$jsEncrypt = JsEncrypt

import 'element-ui/lib/index.js';
import elementUI from 'element-ui';
Vue.use(elementUI);
import iView from 'iview';
Vue.use(iView);
import { BASE_URL } from "@/config/IPconfig";
import axios from 'axios';
import echarts from "echarts";
import echarts_gl from "echarts-gl";
// import VueAxios from 'vue-axios'
// Vue.use(axios)
Vue.prototype.axios = axios;
window.axios = axios;
Vue.prototype.$ajax = axios;
import Bus from "@/Bus"
Vue.prototype.bus = Bus
import * as mercyStore from '@/config/mercyStore.js';
window.mercyStore = mercyStore;

import * as mercyWebSocket from '@/assets/js/MercyWebSocket.js';
window.mercyWebSocket = mercyWebSocket;

import Viewer from 'v-viewer'
import '@/assets/style/viewer.css' 
Vue.use(Viewer,{
  defaultOptions:{
    title:false,
    navbar:false,
    transition:true,
    minZoomRatio:0.3,
    maxZoomRatio:3,
  }
})
import '@/assets/style/fonts.css';
import '@/assets/style/element.css'
import 'iview/dist/styles/iview.css';
import '@/assets/style/common.less';

import '../static/ueditor/ueditor.config.js';
import '../static/ueditor/ueditor.all.js';
import '../static/ueditor/lang/zh-cn/zh-cn.js';
import '../static/ueditor/ueditor.parse.min.js';
/**
 * 全局指令
 */
import * as filters from './filters' 

//全局指令注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


// echart 引入
Vue.prototype.$echarts = echarts;


//  我记得这个是 全局点击事件的回调 对 你记得没错    +++++++++++   哦 ， 那就好
Vue.prototype.globalClick = function(ele,callback) {
    document.addEventListener("click",(e)=>{
      e = e || window.event
      e.stopPropagation()
      callback()
    })  
    if (ele == undefined) {
      return
    } else {
        ele.addEventListener("click", (e) => {
            e = e || window.event
            e.stopPropagation()
        })
    }
};

Vue.prototype.tokenInterVal = function(activeLogUuid, time) {
  Vue.prototype.tokenTime=setInterval(()=>{
      axios.post(`${BASE_URL}api/monitorActiveTime`,{
        activeLogUuid:activeLogUuid,
      }).then((res)=>{
          if(res.data.code==0){
          }
      }).catch(res => {
          /* 失败回调 */
          this.$message.error('发送TOKEN失败')
      })
  },time);
};

// 这个方法 ， 改进一了一下刷新的记录
window.addEventListener("beforeunload",()=>{
  if(JSON.stringify(router.currentRoute.params) != "{}"){
    localStorage.setItem("messageStore",JSON.stringify(router.currentRoute.params))
  }
});




// 路由守卫
import { Message } from 'element-ui';
let isback = false,backmsg={};
router.beforeEach((to,from,next)=>{
  if(localStorage.getItem("messageStore")){
    let p = JSON.parse(localStorage.getItem("messageStore"));
    localStorage.removeItem('messageStore');
    next({
      name: to.name,
      params: p
    });
  }else{
    next()  ; 
  }

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return{
      token:""
    }
  }
})

