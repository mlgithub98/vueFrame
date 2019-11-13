<template>
    <div class="tablepartdemo" @click="closeDownList()">
        <div class="tablepartdemo-main">
            <div class="tablepartdemo-miantable">
                <!-- 表格头部 -->
                <div class="tablepartdemo-miantable-header clear-fix">
                    <div class="tablepartdemo-miantable-header-td" style="cursor:pointer;width:200px;" @click="checkAll()" v-if="opearate.isCheck">
                        <span class="el-icon-circle-check-outline" :style="{color:checkAllStatus?'#409eff':''}"></span>
                    </div>
                    <div class="tablepartdemo-miantable-header-td"   v-for="item in tableHeader"  v-if="item.isShow">
                        <span> {{item.label}}</span>
                        <span v-if="item.sort" class="sortPart" :style="{cursor:(item.sort?'pointer':'')}" @click="changeSort(item.key);$event.stopPropagation();">
                            <span class="sortPartUp el-icon-caret-top"  :style="{color:((srotName==item.key&&sortStatus=='up')?'#409EFF':'#909399')}"></span>
                            <span class="sortPartDown el-icon-caret-bottom" :style="{color:((srotName==item.key&&sortStatus=='down')?'#409EFF':'#909399')}"></span>
                        </span>
                        <span v-if="item.dropDownListData" class="dropDownPart" >
                            <span class="el-icon-caret-bottom" @click="showDownList(item.key);$event.stopPropagation()" :style="{color:((downListStatus&&downListName==item.key)?'#409EFF':'#909399')}" style="display: inline-block;padding: 10px 10px 10px 0;cursor:pointer;"></span>
                            <div class="dropDownBox" v-if="downListStatus&&downListName==item.key">
                               <div class="dropDownBoxItem" v-for="downList in item.dropDownListData" :style="{color:((checkDownListName==downList.name)?'#409EFF':'#606266')}" @click="checkDownList(downList.name,downList.value)">{{downList.name}}</div>
                            </div>
                        </span>
                        <!-- <div class="sortPart">
                            <div class="sortPartUp"><span class="el-icon-caret-top"></span></div>
                            <div class="sortPartDown"><span class="el-icon-caret-bottom"></span></div>
                        </div> -->
                    </div>
                    <div class="tablepartdemo-miantable-header-td" v-if="opearate.title">{{opearate.title}}</div>
                </div>
                <!-- 表格内容 -->
                <div class="tablepartdemo-miantable-main">
                    <div class="tablepartdemo-miantable-main-tr clear-fix"  v-for='(item,index) in tableContent'>
                        <div class="tablepartdemo-miantable-main-tr-td" style="cursor:pointer;width:200px;" @click="checkOne(index)" v-if="opearate.isCheck">
                            <span class="el-icon-circle-check-outline" :style="{color:item.isCheck?'#409eff':''}"></span>
                        </div>
                        <div class="tablepartdemo-miantable-main-tr-td" v-for="tableK in tableHeader" v-if="tableK.isShow">
                            {{item[tableK.key]}}
                        </div>
                        <div class="tablepartdemo-miantable-main-tr-td" v-if="opearate.title">
                            <!-- item -->
                            <el-button class="opearateBtn" style="color:#fff;" :style="{background:opearatelist.bgColor}"  @click="$parent.opearateTable(item,opearatelist.key)"  size="mini"  v-for="(opearatelist,index) in opearate.opearateBtn" :key="index">{{opearatelist.name}}</el-button>
                            <!-- <el-button type="danger" size="mini" v-if="opearate.delete" @click="deleteTable(item.uuid)"><span class="el-icon-delete"></span> {{opearate.delete}}</el-button> -->
                        </div>
                    </div>
                </div>
                <el-pagination style="text-align: right;margin-top: 10px;"
                    @size-change="handleSizeChange"  
                    @current-change="handleCurrentChange" 
                    :current-page="currentPage" 
                    :page-sizes="[1, 2, 4, 8]" 
                    :page-size="pageSize"  
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="tableContentList.length" >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'tablepartdemo',
    components:{
    },
    props: ['childData'],
    data () {
        return {
            srotName:'',
            sortStatus:'down',
            downListStatus:false,
            downListName:'',
            checkDownListName:"",
            checkDownListValue:"",
            currentPage:1,
            pageSize:4,
            tableHeader:[],
            tableContentList:[],
            tableContent:[],
            opearate:{},
            checkAllStatus:false,
            checkList:[]
        }
    },
    methods:{
        // 全选
        checkAll(){
            this.checkAllStatus = !this.checkAllStatus;
            if(this.checkAllStatus==false){
                for(let i=0;i<this.tableContent.length;i++){
                    this.tableContent[i].isCheck = false;
                }
                this.checkList =[];
            }else{
                this.checkList =[];
                for(let i=0;i<this.tableContent.length;i++){
                    this.tableContent[i].isCheck = true;
                    this.checkList.push(this.tableContent[i])
                }
            }
             this.$parent.checkAll(this.checkList);
        },
        // 单选
        checkOne(index){
            this.checkList =[];
            for(let i=0;i<this.tableContent.length;i++){
                if(i==index){
                    this.tableContent[index].isCheck = !this.tableContent[index].isCheck;
                }
            }
            // let checknum = 0;
             for(let i=0;i<this.tableContent.length;i++){
                if(this.tableContent[i].isCheck==true){
                    // checknum +=1;
                    this.checkList.push(this.tableContent[i])
                }
            }
            if(this.checkList.length==this.tableContent.length){
                this.checkAllStatus = true;
            }else{
                this.checkAllStatus = false;
            }
             this.$parent.checkOne(this.checkList);
        },
        // 排序
        changeSort(name){
            this.srotName = name;
            if(this.sortStatus == 'up'){
                this.sortStatus = 'down';
            }else{
                this.sortStatus = 'up';
            }
            this.$parent.sortTableDate(name,this.sortStatus,this.currentPage,this.pageSize);
        },
        // 展示下拉列表
        showDownList(name){
            this.downListStatus = !this.downListStatus;
            this.downListName = name;
        },
        // 选中下拉选项
        checkDownList(name,value){
            this.downListStatus = false;
            this.checkDownListName = name;
            this.checkDownListValue = value;
            this.currentPage = 1;
            this.$parent.changeCheckdownListDate(name,value,this.currentPage,this.pageSize);
        },
        // 点击其他区域关闭浮层
        closeDownList(){
            this.downListStatus = false;
        },
        handleCurrentChange(val){
            this.currentPage = val;
             this.getData(this.currentPage, this.pageSize);
             console.log(`当前页:`+this.currentPage);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;    //动态改变
            this.currentPage=1;
             this.getData(this.currentPage, this.pageSize);
        },
        getData(currentPage,pageSize){
            this.$parent.getTableDate(currentPage,pageSize);
            console.log(this.childData.tableContentList)
            this.tableContentList = this.childData.tableContentList;
            this.tableContent = this.tableContentList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    },
    mounted() {
        this.tableHeader = this.childData.tableHeader;
        this.tableContentList = this.childData.tableContentList;
        if(this.childData.opearate){
            this.opearate = this.childData.opearate;
        }
        this.getData(this.currentPage, this.pageSize);
    },

}
</script>
<style>
    .opearateBtn:active{
        border: 1px solid #DCDFE6;
    }
    .opearateBtn:hover{
        opacity:0.9;
    }
    .tablepartdemo{
       margin: 0 auto;
       padding: 0;
       margin: 0;
       outline: none;
    } 
    .tablepartdemo-main{
        width:80%;
        min-width: 800px;
        padding: 10px;
        border:1px solid #e3e3e3;
        border-radius: 2px;
    }
    .tablepartdemo-miantable{
        width: 100%;
    }
    /* 表格头部 */
    .tablepartdemo-miantable-header{
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        border-bottom:1px solid #e3e3e3;
        color: #909399;
        font-weight: 600;
        display: flex;
    }
    .tablepartdemo-miantable-header-td{
        width: 100%;
        float: left;
        text-align: center;
        padding: 0 8px;
        user-select: none;
        box-sizing: border-box;
        white-space: nowrap;   /*强制一行显示*/
        text-overflow: ellipsis;  /*溢出文本时显示省略标记*/
        /* overflow: hidden; */
        position: relative;
    }
    .sortPart{
        /* position:absolute;
        left:0;
        top:0; */
        /* float:left */
        display:inline-block;
        position:relative;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin: 13px 0;
    }
    .sortPartUp{
        display:inline-block;    
        left: 0px;
        top: -3px;
        position: absolute;
    }
    .sortPartDown{
        height:7px;
        display:inline-block;
        left: 0px;
        top: 4px;
        position: absolute;
    }
    .dropDownBox{
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-sizing: border-box;
        z-index:99;
        padding:5px 0;
        margin-top: -3px;

    }
    .dropDownBoxItem{
            font-size: 14px;
            padding: 0 10px;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #606266;
            height: 34px;
            line-height: 34px;
            box-sizing: border-box;
            cursor: pointer;
            font-weight:normal;
    }
    .dropDownBoxItem:hover{
        background:#f5f7fa;
    }
    /* 表格内容 */
    .tablepartdemo-miantable-main{
        width: 100%;
        max-height: 480px;
        overflow-y: scroll;
    }
    .tablepartdemo-miantable-main::-webkit-scrollbar-thumb {
        background: #fff;
    }
    .tablepartdemo-miantable-main-tr{
        width: 100%;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        color: #606266;
        border-bottom:1px solid #e3e3e3;
        display: flex;
    }
    .tablepartdemo-miantable-main-tr:hover{
        background: #F2F6FC;
    }
    .tablepartdemo-miantable-main-tr-td{
        float: left;
        text-align: center;
        padding: 0 8px;
        width: 100%;
        white-space: nowrap;   /*强制一行显示*/
        text-overflow: ellipsis;  /*溢出文本时显示省略标记*/
        overflow: hidden;
    }
</style>