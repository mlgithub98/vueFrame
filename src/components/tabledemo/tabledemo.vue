<template>
    <div>
        <tablepartdemo :child-data="tableDate"></tablepartdemo>
    </div>
</template>
<script>
import tablepartdemo from './tablepartdemo';
export default {
  name: 'tabledemo',
    components:{
        tablepartdemo
    },
    data () {
        return {
            tableDate:{
                tableHeader:[
                    {label:"姓名",key:"name",isShow:true,sort:true},
                    {label:"年龄",key:"age",isShow:true,sort:true},
                    {label:"性别",key:"sex",isShow:true,sort:false,dropDownListData:[{name:'男',value:0},{name:'女',value:1}]},
                    {label:"爱好",key:"hobby",isShow:false,sort:false},
                ],
                tableContentList:[
                    {uuid:'1',name:"马建华",age:"28",sex:'女',hobby:"唱歌",isCheck:true},
                    {uuid:'2',name:"李四",age:"28",sex:'男',hobby:"唱歌",isCheck:false},
                    {uuid:'3',name:"王五",age:"28",sex:'女',hobby:"唱歌",isCheck:false},
                    {uuid:'4',name:"张三",age:"18",sex:'男',hobby:"唱歌",isCheck:true},
                ], 
                opearate:{
                    title:'操作',
                    opearateBtn:[
                        {name:'删除',key:"delete",bgColor:"#F56C6C"},
                        {name:'编辑',key:"edit",bgColor:"#67C23A"},
                        // {name:'状态',key:"status",bgColor:"#E6A23C"}
                    ],
                    isCheck:true
                }
            },
            currentPage:1,
            pageSize:4,
        }
    },
    methods: {
        opearateTable(item,opearate){
            if(opearate=='delete'){
                this.opearateDelete(item);
            }else if(opearate=='edit'){
                this.opearateEdit(item);
            }
            // else if(opearate=='status'){
            //     this.opearateStatus(item);
            // }
            this.getTableDate(this.currentPage,this.pageSize)
        },
        // 删除
        opearateDelete(item){
            alert("删除")
            console.log(item)
        },
        // 编辑
        opearateEdit(item){
            alert("编辑"); 
            console.log(item)
        },
        
        // 状态
        // opearateStatus(item){
        //     alert("状态")
        //     console.log(item)
        // },

        // 获取数据
        getTableDate(currentPage,pageSize){
            console.log(currentPage,pageSize)
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            // this.tableDate.tableContentList=[
            //     {uuid:'1',name:"张三",age:"18",sex:'男',hobby:"唱歌"},
            //     {uuid:'2',name:"李四",age:"28",sex:'男',hobby:"唱歌"},
            // ];
        },
        // 排序
        sortTableDate(sortname,sortArr,currentPage,pageSize){
            console.log(sortname,sortArr)
             this.getTableDate(currentPage,pageSize);
        },
        // 下拉选中
        changeCheckdownListDate(name,value,currentPage,pageSize){
            console.log(name,value)
             this.getTableDate(currentPage,pageSize);
        },
        // 全选
        checkAll(checkList){
            console.log(checkList)
        },
        // 单选
        checkOne(checkList){
            console.log(checkList)
        },


    },
}
</script>
<style >
    
</style>