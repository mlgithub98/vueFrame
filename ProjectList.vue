<template lang = 'pug'>
.project
    <!--头部-->
    .project-top
        setting-btn(:btnName = "'创建项目'")
        form.project-search-from
            input.search(type = "text", name = "search", placeholder = "可根据项目名称模糊查询", autocomplete = "off", v-model="searchValue", @keyup.enter = "search", onkeypress = " if(event.keyCode === 13) return false")
            img.search-icon( src = '../../assets/images/project/searchIcon.png', @click = 'search')
    <!--列表-->
    .project-list
        .list-box
            ul.list-header
                li 序号
                li 项目名称
                li 项目简介
                li 创建时间
                li 操作
            ul.list-body
                li(v-for = "(item,index) in listData")
                    ul.sub-list
                        li {{index+1}}
                        li {{item.name}}
                        li(:title = "item.intro") {{item.intro}}
                        li {{item.createTeime | date}}
                        li
                            span(@click = "gotoWorkBench(item)") 进入工作区
                            span(@click = "editProject(item)") 编辑
                            span(@click = "deleteProject(item)") 删除
    <!--列表分页-->
    paging(:total = "total", :pageNum = "pageNum", @pagingDatas = "pagingDatas", v-if = "total > 0")
    <!--新建项目-->
    add-project(@afterAdd = "getPageDatas")
    <!--修改项目 -->
    edit-project(@afterEdit = "getPageDatas")
</template>
<script>
  import bus from '@/components/Bus.js'
  import paging from '@/components/Paging/Paging'
  import settingBtn from '@/components/SettingBtn/SettingBtn'
  import addProject from '@/pages/project/ProjectAdd'
  import editProject from '@/pages/project/ProjectEdit'
  import { BASE_URL } from '@/IPconfig.js'
    export default {
        name: "project",
        components: {
            paging,
            settingBtn,
            addProject,
            editProject
        },
        data() {
            return{
                listData: [],
                searchValue: '',
                total: 0,
                pageNum: 1,
                pageSize: 10
            }
        },
        mounted() {
          this.pageNum = this.$route.params.pageNum ||"1";
          this.getPageDatas();
        },
        methods:{
          search(data){
            this.getPageDatas();
          },
          getPageDatas() {
              var searchValue=this.searchValue;
              this.axios.get(`${BASE_URL}sctProject/sctProjectList`, {params:{pageNum: this.pageNum, pageSize: this.pageSize,name:searchValue}},
              {
                  headers: {
                  "Content-Type": "application/json"
                  }
              }
              ).then(
              (res) => {
                  //成功回调
                  this.listData = res.data.data.list;
                  this.total = res.data.data.total;
                  this.pageNum = res.data.data.pageNum;
              }
              ).catch(res => {
              })
          },
          pagingDatas(pagemsg) {
              this.pageNum = pagemsg.pageNum;
              this.pageSize = pagemsg.pageSize;
              this.getPageDatas();
          },
          gotoWorkBench(data){
            this.resetSetItem('projectName', data.name);
            this.$router.push({
              name: 'workbench',
              params: {
                projectid:data.id,
                pageNum: this.pageNum
              }
            })
          },
          editProject(data){
            bus.$emit('openEditModel' , true , data)
          },
          deleteProject(data){
            this.$confirm('是否确认删除该项目?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
                let url = `${BASE_URL}sctProject/sctProjectDelete`;
                this.axios.delete(`${BASE_URL}sctProject/sctProjectDelete`, {data:{id:data.id}},
                  {
                    headers: {
                      "Content-Type": "application/json"
                    }
                  }
                  ).then(
                    (res) => {
                      if(res.data.code === 10000){
                        this.$message({
                          type: 'success',
                          message: '删除成功!'
                        });
                        this.getPageDatas();
                        bus.$emit('ProjectChange');
                      }else{
                        this.$message.error('删除失败');
                      }
                    }
                  ).catch(res => {
                  })
                }).catch(() => {                      
                });
          },
        gomjgtest(){
          this.$router.push('/mjhtest/');
        }
      }
    }
</script>

<style lang="less">
  .project {
    position: relative;
    height: 100%;
    .project-top {
      display: flex;
      position: relative;
      .project-search-from {
        width: 530px;
        height: 38px;
        margin: 20px 0 0 35px;
        position: relative;
        .search {
          width: 530px;
          height: 38px;
          padding-left: 20px;
          border: none;
          border: 2px solid #15669a;
          background: transparent;
          outline: none;
          color: #15669a;
          &::-webkit-input-placeholder {
            color: #15669a;
          }
        }
        .search-icon {
          position: absolute;
          right: 19px;
          top: 5px;
          cursor: pointer;
        }
      }
    }
    .list-box {
      width: 100%;
      margin-top: 58px;
      padding: 0 42px 0 23px;
      box-sizing: border-box;
      .list-header {
        display: flex;
        width: 100%;
        & > li {
          height: 42px;
          background: #0a466d;
          text-align: left;
          padding-left: 15px;
          line-height: 42px;
          color: #9ccbd9;
          font-size: 16px;
          border-right: 1px solid #0a2d44;
        }
        li:nth-child(1) {
          width: 5%;
        }
        li:nth-child(2) {
          width: 12%;
        }
        li:nth-child(3) {
          width: 50%;
        }
        li:nth-child(4) {
          width: 8%;
        }
        li:nth-child(5) {
          width: 25%;
        }
      }
      //下侧列表
      .list-body {
        & > li:hover {
          background: #0b466e;
        }
        & > li {
          height: 42px;
          color: white;
          margin-top: 6px;
          border: 2px solid #15669a;
          .sub-list {
            display: flex;
            & > li {
              height: 38px;
              text-align: left;
              padding-left: 15px;
              line-height: 38px;
              color: #9ccbd9;
              // width: 20%;
            }
            li:nth-child(1) {
              width: 5%;
            }
            li:nth-child(2) {
              width: 12%;
            }
            li:nth-child(3) {
              width: 50%;
              overflow: hidden;
            }
            li:nth-child(4) {
              width: 8%;
            }
            li:nth-child(5) {
              width: 25%;
              & > span{
                cursor: pointer;
                padding: 3px 10px;
                border: 1px solid #525680;
                border-radius: 5px;
                margin: 0 5px;
              }
              & > span:hover{
                border: 1px solid #1615b7;
                background-color: #0b9dbc;
                color: #b9ecff;
              }
            }
          }
        }
      }
    }
  }
</style>

