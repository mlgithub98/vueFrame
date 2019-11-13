<template>
  <div class="EditUseri">
    <div class="menu-content">
      <div class="menu-title">
        <el-button @click="go_back">返回</el-button>
      </div>
      <el-form :model="sub_dataMsg" status-icon="" :rules="rulesMsg" ref="sysFormMsg" label-width="100px">
        <el-form-item label="手机号" prop="mobile">
          <el-input type="text" v-model="sub_dataMsg.mobile" max-length="11"></el-input>
        </el-form-item>
        <!-- <el-form-item  label="验证码" prop="identifyCode">
          <el-input class="col-7" type="text" v-model="sub_dataMsg.identifyCode"></el-input>
          <el-button class="col-3" @click="get_identifyCode()">获取验证码</el-button>
        </el-form-item> -->
        <el-form-item  label="密码" prop="password">
          <el-input type="password" v-model="sub_dataMsg.password" show-password="show-password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>

      <el-row>
        <el-button @click="sumint()">提交</el-button>  
      </el-row>
    </div>
  </div>
</template>
 
<script>
import { BASE_URL } from "@/config/IPconfig";
export default {
  name: "EditUseri",
  components: {
    // leftMenu
  },
  data() {
    return {
      sys_information: this.$route.params,
      sub_dataMsg: {
        mobile: "",
        identifyCode: "",
        password:"",
        systemNo:"",
        userId:"",
      },
      rulesMsg: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        // identifyCode: [
        //   { required: true, message: "请输入验证码", trigger: "blur" }
        // ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
    };
  },
  mounted(){
      this.sub_dataMsg.mobile = this.$route.params.userInfoEntity?this.$route.params.userInfoEntity.userInfoEntity.mobile:"";
      this.sub_dataMsg.systemNo = this.$route.params.userInfoEntity?this.$route.params.userInfoEntity.sysinfo.systemNo:"";
      this.sub_dataMsg.userId = this.$route.params.userInfoEntity?this.$route.params.userInfoEntity.userInfoEntity.uuid:"";
      
  },
  methods: {
    go_back() {
      this.$router.back(-1);
    },
    get_identifyCode() {
      let _this = this;
      $.ajax({
        url: BASE_URL + "api/messageLog/sendMessageCode",
        type: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify({
          // mobile: 手机号, systemNo: 系统编号, type: 类型（1：注册，2：登录）
            mobile: this.sub_dataMsg.mobile,
            systemNo: this.sub_dataMsg.systemNo,
            type: "2"
        }),
        success: function(result) {
          if (result.code == 0) {
            _this.$message({
              message: "获取验证码成功"
            });
            console.log(result);
          } else {
            _this.$message({
              message: result.msg,
              type: "warning"
            });
          }
        },
        error: function(result) {
          _this.$message({
            message: result.msg,
            type: "warning"
          });
        }
      });
    },
    sumint() { 
      //密码登录  
      this.$refs["sysFormMsg"].validate(valid => {
        if (valid) {
          let _this = this;
          $.ajax({
            url: BASE_URL + "api/userInfo/outUpdatePwd/"+this.sub_dataMsg.userId,
            type: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            data: JSON.stringify({
              // systemNo: 系统编号, roleId: 角色ID, mobile: 手机号, loginType:登录类型(1:手机号密码2：短信验证码), password: 密码, msgCode: 验证码, operDev:操作设备
                mobile: this.sub_dataMsg.mobile,
                password: this.sub_dataMsg.password,
                systemNo: this.sub_dataMsg.systemNo
            }),
            success: function(result) {
              if (result.code == 0) {
                    mercyStore.CLEARuserInfoEntity();
                    _this.$router.push({
                        name:'UserLogin',
                    })
              } else {
                _this.$message({
                  message: result.msg,
                  type: "warning"
                });
              }
            },
            error: function(result) {
              _this.$message({
                message: result.msg,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          this.$message({
            message: "登录失败",
            type: "warning"
          });
          return false;
        }
      });
    },
  }
};
</script>
<style scoped lang="less">
@import "../../assets/style/global.less";
.EditUseri {
  .menu-content {
    width: 450px;
    text-align: left;
    .menu-title {
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      .el-button {
        float: left;
      }
    }
    .menu-header {
      text-align: center;
      margin-bottom: 10px;
      .switch {
        display: inline-block;
        width: 100px;
        height: 30px;
        border: 1px solid #ddd;
        line-height: 30px;
        cursor: pointer;
      }
      .switch-left {
        border-radius: 5px 0 0 5px;
      }
      .switch-right {
        border-radius: 0 5px 5px 0;
      }
      .switch-check {
        border-color: black;
        color: blue;
      }
    }
    .el-form {
      .el-form-item {
        .col-7 {
          width: 70%;
        }
        .col-3 {
          width: 30%;
        }
      }
    }
  }
}
</style>
