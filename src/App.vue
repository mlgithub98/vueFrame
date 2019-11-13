<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { BASE_URL } from "@/config/IPconfig";
import bus from './Bus.js'
export default {
  name: 'App',
  data(){
    return{
      heart_Interval:null,
    }
  },
  mounted(){
    bus.$on('get_heartg', (activeLogUuid,time) => {
      this.heartbeat(activeLogUuid,time);
    });
    bus.$on('stopInterval',(value)=>{
      if(value=="stop"){
        this.heartdead()
      }
    })  
    // mercyStore.GETuserInfoEntity()?this.heartbeat(mercyStore.GETuserInfoEntity().userInfoEntity.uuid,60000):"";
  },
  methods:{
    heartbeat(activeLogUuid,time){
      this.heart_Interval=setInterval(()=>{
          // axios.post(`${BASE_URL}api/monitorActiveTime`,{
          //   activeLogUuid:activeLogUuid,
          // }).then((res)=>{
          //     if(res.data.code==0){
          //     }else{
          //       this.$router.push({name:"UserLogin"});
          //       window.clearInterval(this.heart_Interval)
          //       console.log("定时器停止")
          //     }
          // }).catch(res => {
          //     /* 失败回调 */
          //     this.$message.error(res.msg)
          // })
          console.log("心跳")
      },1000);
    },
    heartdead(){
      window.clearInterval(this.heart_Interval);
      this.heart_Interval = null;
      console.log("定时器停止")
    }
  }
} 
</script>

<style>
body{
    margin: 0;
    padding: 0;
    overflow: hidden;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    /* margin-top: 60px; */
}
</style>
