<template lang = "pug">
    .chartDemoM
        .topdiv 今日人数 阿里巴巴
        .chartDemoM1 
            #resultChart(style = "width: 100%;height: 95%;" , ref = "resultChart_View")
        .chartDemoM1 
            #resultChartQQ(style = "width: 100%;height: 95%;" , ref = "resultChart_diqiu")
        .chartDemoM2    
            #citychart(:style="{height:'55vh',width:'100%'}", ref="citychart")
        .chartDemoM3    
            #Provinces(:style="{height:'55vh',width:'100%'}", ref="Provinces")
        .chartDemoM1 
            #demo5(style = "width: 100%;height: 95%;" , ref = "demo5")
        .chartDemoM1 
            #demo6(style = "width: 100%;height: 95%;" , ref = "demo6")
                                
</template>
<script>
const _debugDatas = [
                    {x:172.5, y:55.2,label:"1"}, {x:170.9, y:54.2,label:"2"}, {x:172.9, y:62.5,label:"3"}, {x:153.4, y:42.0,label:"4"}, {x:160.0, y:50.0,label:"1"},
                    {x:170.0, y:59.0,label:"1"}, {x:159.1, y:47.6,label:"2"}, {x:166.0, y:69.8,label:"3"}, {x:176.2, y:66.8,label:"4"}, {x:160.2, y:75.2,label:"1"},
                    {x:161.2, y:51.6,label:"1"}, {x:167.5, y:59.0,label:"2"}, {x:159.5, y:49.2,label:"3"}, {x:157.0, y:63.0,label:"4"}, {x:155.8, y:53.6,label:"1"},
                    {x:147.2, y:49.8,label:"1"}, {x:168.2, y:49.2,label:"2"}, {x:175.0, y:73.2,label:"3"}, {x:157.0, y:47.8,label:"4"}, {x:167.6, y:68.8,label:"1"},
                    {x:159.5, y:50.6,label:"1"}, {x:175.0, y:82.5,label:"2"}, {x:166.8, y:57.2,label:"3"}, {x:176.5, y:87.8,label:"4"}, {x:170.2, y:72.8,label:"1"},
                    {x:174.0, y:54.5,label:"1"}, {x:173.0, y:59.8,label:"2"}, {x:179.9, y:67.3,label:"3"}, {x:170.5, y:67.8,label:"4"}, {x:160.0, y:47.0,label:"1"},
                    {x:154.4, y:46.2,label:"1"}, {x:162.0, y:55.0,label:"2"}, {x:176.5, y:83.0,label:"3"}, {x:160.0, y:54.4,label:"4"}, {x:152.0, y:45.8,label:"1"},
                    {x:162.1, y:53.6,label:"1"}, {x:170.0, y:73.2,label:"2"}, {x:160.2, y:52.1,label:"3"}, {x:161.3, y:67.9,label:"4"}, {x:166.4, y:56.6,label:"1"},
                    {x:168.9, y:62.3,label:"1"}, {x:163.8, y:58.5,label:"2"}, {x:167.6, y:54.5,label:"3"}, {x:160.0, y:50.2,label:"4"}, {x:161.3, y:60.3,label:"1"}
                ]
let _debugDatas3D=[];

// import echarts from "echarts"
// import Map from '@/assets/js/map'
import '@/assets/js/map/js/shanxi1'
import '@/assets/js/map/js/city/xian'

export default{
    components: {
        // Map
    },
    props: [],
    data() {
        return { 
            labelColor: ['#FFFF00','#FF6347','#8B008B','#4682B4','#008080','#006400','#D2691E','#B22222','#1E90FF','#aaaaff','#84c1ff','#a6ffff','#96fed1','#ffff93','#ffc78e','#cf9e9e','#c2c287','#95caca','#7d7def','#46a3ff','#4dffff','#4efeb3','#f9f900','#ffa042','#b87070','#afaf61','#6fb7b7','#4a4aff','#0080ff','#00e3e3','#02f78e','#c4c400','#ff8000','#984b4b','#949449','#4f9d9d'],
            chart:"",
        }
    },
    mounted(){
       _debugDatas.forEach(item=>{
            item.z=this.randomNum(-200,200);
            _debugDatas3D.push(item);
        })
        this.intEchart3D(_debugDatas3D);
        this.initCountyEchart();
        this.initProvinces();
        this.initCCbiao();
        this.initdemo5();
        this.initdemo6();
    },
    methods:{
        randomNum(minNum,maxNum){ 
            switch(arguments.length){ 
                case 1: 
                    return parseInt(Math.random()*minNum+1,10); 
                break; 
                case 2: 
                    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
                break; 
                    default: 
                        return 0; 
                    break; 
            } 
        },
        intEchart3D(ReceiveData){
            let $this = this
            let myChart =  this.$echarts.init(document.getElementById("resultChart"));
            var xAxis3D={
                type: 'value',
            };
            var yAxis3D={
                type: 'value',
            };
            var zAxis3D = {
                type: 'value',
            };
            var grid3D={
                axisLine: {
                    lineStyle: {
                        color: 'rgba(5, 103, 177, 0.95)'//轴线颜色
                    },
                },
                splitLine:{
                    lineStyle:{
                        color: ['rgba(20, 65, 105, 0.78)'],
                        width: 1,
                        type: 'solid'
                    }
                },
                // axisPointer: {//坐标轴指示线
                //     // lineStyle: {
                //     //     color: '#f00'
                //     // },
                //     show: false,//不坐标轴指示线
                // },
                axisLabel:{
                    show:false,
                },
                boxWidth: 200,
            };
            var series = [];
            var json = {};
            json.xAxis3D = xAxis3D;
            json.yAxis3D = yAxis3D;
            json.zAxis3D = zAxis3D;
            json.grid3D = grid3D;
            json.series = series;
            let arrLabel = new Array() //保存不同的聚类标签

                        ReceiveData.forEach(item => {  
                            let _labeldata = [item.x,item.y,item.z]
                            let _templabel = String(item.label)
                            let _labelidx = arrLabel.indexOf(_templabel) //检查是否是新的聚类标签标签
                            let _labellen = arrLabel.length //聚类标签数量
                            if(_labelidx == -1){ //新标签 
                                //计算新类别标签的颜色
                                let _seriescolor = _labellen < 33 ? $this.labelColor[_labellen] : (`rgb(${Math.floor(Math.random()*(255+1))},${Math.floor(Math.random()*(255+1))},${Math.floor(Math.random()*(255+1))})`)
                                
                                //数据系列series添加一项
                                let _newseries = {
                                    type: 'scatter3D',  
                                    symbolSize: 8,
                                    color: _seriescolor,
                                    data:[_labeldata],
                                    label: {
                                        emphasis: {
                                            show: false,
                                            formatter: function (param) {
                                                return "param.data[3]";
                                            },
                                            position: 'top'
                                        }
                                    }
                                }
                                //总集
                                let _sumseries = $.extend(true,{},_newseries,{
                                    name: _templabel
                                })
                                arrLabel.push(_templabel)
                                json.series.push(_sumseries) 
                            }else{//已经绘制的标签类
                                //查找相应series并更新数据
                                 json.series[_labelidx].data.push(_labeldata)  
                            }
                        })            
                        json.legend = {
                            top: 10,
                            right:30,
                            textStyle: {
                                color: '#2ec5ee'
                            },
                            data: arrLabel
                        }
                        myChart.resize()
                        myChart.setOption(json)
        },
        initCCbiao(){
            let myChart = this.$echarts.init(this.$refs.resultChart_diqiu); 
            let option = {
                backgroundColor: '#1b1b1b',
                tooltip : {
                    formatter: "{a} <br/>{c} {b}"
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series : [
                    {
                        name:'速度',
                        type:'gauge',
                        min:0,
                        max:220,
                        splitNumber:11,
                        radius: '50%',
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                                width: 3,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: {            // 坐标轴小标记
                            textStyle: {       // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: {           // 分隔线
                            length :25,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                width:3,
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {           // 分隔线
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 20,
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail : {
                            backgroundColor: 'rgba(30,144,255,0.8)',
                            borderWidth: 1,
                            borderColor: '#fff',
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 5,
                            offsetCenter: [0, '50%'],       // x, y，单位px
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                color: '#fff'
                            }
                        },
                        data:[{value: 40, name: 'km/h'}]
                    },
                    {
                        name:'转速',
                        type:'gauge',
                        center : ['25%', '55%'],    // 默认全局居中
                        radius : '30%',
                        min:0,
                        max:7,
                        endAngle:45,
                        splitNumber:7,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                                width: 2,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: {            // 坐标轴小标记
                            textStyle: {       // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :12,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: {           // 分隔线
                            length :20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                width:3,
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {
                            width:5,
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title : {
                            offsetCenter: [0, '-30%'],       // x, y，单位px
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail : {
                            //backgroundColor: 'rgba(30,144,255,0.8)',
                        // borderWidth: 1,
                            borderColor: '#fff',
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 5,
                            width: 80,
                            height:30,
                            offsetCenter: [25, '20%'],       // x, y，单位px
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                color: '#fff'
                            }
                        },
                        data:[{value: 1.5, name: 'x1000 r/min'}]
                    },
                    {
                        name:'油表',
                        type:'gauge',
                        center : ['75%', '50%'],    // 默认全局居中
                        radius : '30%',
                        min:0,
                        max:2,
                        startAngle:135,
                        endAngle:45,
                        splitNumber:2,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                                width: 2,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :12,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: {
                            textStyle: {       // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            },
                            formatter:function(v){
                                switch (v + '') {
                                    case '0' : return 'E';
                                    case '1' : return 'Gas';
                                    case '2' : return 'F';
                                }
                            }
                        },
                        splitLine: {           // 分隔线
                            length :15,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                width:3,
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {
                            width:2,
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title : {
                            show: false
                        },
                        detail : {
                            show: false
                        },
                        data:[{value: 0.5, name: 'gas'}]
                    },
                    {
                        name:'水表',
                        type:'gauge',
                        center : ['75%', '50%'],    // 默认全局居中
                        radius : '30%',
                        min:0,
                        max:2,
                        startAngle:315,
                        endAngle:225,
                        splitNumber:2,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                                width: 2,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            show: false
                        },
                        axisLabel: {
                            textStyle: {       // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            },
                            formatter:function(v){
                                switch (v + '') {
                                    case '0' : return 'H';
                                    case '1' : return 'Water';
                                    case '2' : return 'C';
                                }
                            }
                        },
                        splitLine: {           // 分隔线
                            length :15,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                width:3,
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {
                            width:2,
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title : {
                            show: false
                        },
                        detail : {
                            show: false
                        },
                        data:[{value: 0.5, name: 'gas'}]
                    }
                ]
            };

            setInterval(function (){
                option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
                option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
                option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
                option.series[3].data[0].value = (Math.random()*2).toFixed(2) - 0;
                myChart.setOption(option);
            },2000)
        },
        beforeDestroy() {
            if (!this.chart) {
                return;
            }
            this.chart.dispose();
            this.chart = null;
        },
        initCountyEchart(){
            let myChart = this.$echarts.init(this.$refs.citychart); //这里是为了获得容器所在位置
            window.onresize = myChart.resize;
            window.addEventListener("resize", myChart.resize);
            myChart.setOption({ // 进行相关配置
                backgroundColor: "transparent",
                tooltip: {}, // 鼠标移到图里面的浮动提示框
                geo: { // 这个是重点配置区
                    map: '陕西', // 地区名
                    roam: true ,//平移或缩放
                    label: {
                        normal: {
                            show: true,
                            color:'rgba(255, 255, 255, 0.5)'
                        },
                        emphasis: {
                            color:'#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor : '#226DA4',
                            borderColor: 'rgba(255, 255, 255, 0.5)'
                        },
                        emphasis: {
                            areaColor: "#188FFE",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            })
        },
        initProvinces(){
            let myChart = this.$echarts.init(this.$refs.Provinces); //这里是为了获得容器所在位置
            window.onresize = myChart.resize;
            window.addEventListener("resize", myChart.resize);
            myChart.setOption({ // 进行相关配置
                backgroundColor: "transparent",
                tooltip: {}, // 鼠标移到图里面的浮动提示框
                geo: { // 这个是重点配置区
                    map: '西安', // 地区名
                    roam: true ,//平移或缩放
                    label: {
                        normal: {
                            show: true,
                            color:'rgba(255, 255, 255, 0.5)'
                        },
                        emphasis: {
                            color:'#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor : '#226DA4',
                            borderColor: 'rgba(255, 255, 255, 0.5)'
                        },
                        emphasis: {
                            areaColor: "#188FFE",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            })
        },
        initdemo5(){
            let myChart = this.$echarts.init(this.$refs.demo5);
            var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a','10a','11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'];
            var days = ['Saturday', 'Friday', 'Thursday',
                    'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

            var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];
            let option = {
                tooltip: {},
                visualMap: {
                    max: 20,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                },
                xAxis3D: {
                    type: 'category',
                    data: hours
                },
                yAxis3D: {
                    type: 'category',
                    data: days
                },
                zAxis3D: {
                    type: 'value'
                },
                grid3D: {
                    boxWidth: 200,
                    boxDepth: 80,
                    light: {
                        main: {
                            intensity: 1.2
                        },
                        ambient: {
                            intensity: 0.3
                        }
                    }
                },
                series: [{
                    type: 'bar3D',
                    data: data.map(function (item) {
                        return {
                            value: [item[1], item[0], item[2]]
                        }
                    }),
                    shading: 'color',

                    label: {
                        show: false,
                        textStyle: {
                            fontSize: 16,
                            borderWidth: 1
                        }
                    },
                    
                    itemStyle: {
                        opacity: 0.4
                    },

                    emphasis: {
                        label: {
                            textStyle: {
                                fontSize: 20,
                                color: '#900'
                            }
                        },
                        itemStyle: {
                            color: '#900'
                        }
                    }
                }]
            }

            myChart.setOption(option);
        },
        initdemo6(){
            let myChart = this.$echarts.init(this.$refs.demo6);
            // Schema:
            // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
            var dataBJ = [
                [55,9,56,0.46,18,6,1],
                [25,11,21,0.65,34,9,2],
                [56,7,63,0.3,14,5,3],
                [33,7,29,0.33,16,6,4],
                [42,24,44,0.76,40,16,5],
                [82,58,90,1.77,68,33,6],
                [74,49,77,1.46,48,27,7],
                [78,55,80,1.29,59,29,8],
                [267,216,280,4.8,108,64,9],
                [185,127,216,2.52,61,27,10],
                [39,19,38,0.57,31,15,11],
                [41,11,40,0.43,21,7,12],
                [64,38,74,1.04,46,22,13],
                [108,79,120,1.7,75,41,14],
                [108,63,116,1.48,44,26,15],
                [33,6,29,0.34,13,5,16],
                [94,66,110,1.54,62,31,17],
                [186,142,192,3.88,93,79,18],
                [57,31,54,0.96,32,14,19],
                [22,8,17,0.48,23,10,20],
                [39,15,36,0.61,29,13,21],
                [94,69,114,2.08,73,39,22],
                [99,73,110,2.43,76,48,23],
                [31,12,30,0.5,32,16,24],
                [42,27,43,1,53,22,25],
                [154,117,157,3.05,92,58,26],
                [234,185,230,4.09,123,69,27],
                [160,120,186,2.77,91,50,28],
                [134,96,165,2.76,83,41,29],
                [52,24,60,1.03,50,21,30],
                [46,5,49,0.28,10,6,31]
            ];

            var dataGZ = [
                [26,37,27,1.163,27,13,1],
                [85,62,71,1.195,60,8,2],
                [78,38,74,1.363,37,7,3],
                [21,21,36,0.634,40,9,4],
                [41,42,46,0.915,81,13,5],
                [56,52,69,1.067,92,16,6],
                [64,30,28,0.924,51,2,7],
                [55,48,74,1.236,75,26,8],
                [76,85,113,1.237,114,27,9],
                [91,81,104,1.041,56,40,10],
                [84,39,60,0.964,25,11,11],
                [64,51,101,0.862,58,23,12],
                [70,69,120,1.198,65,36,13],
                [77,105,178,2.549,64,16,14],
                [109,68,87,0.996,74,29,15],
                [73,68,97,0.905,51,34,16],
                [54,27,47,0.592,53,12,17],
                [51,61,97,0.811,65,19,18],
                [91,71,121,1.374,43,18,19],
                [73,102,182,2.787,44,19,20],
                [73,50,76,0.717,31,20,21],
                [84,94,140,2.238,68,18,22],
                [93,77,104,1.165,53,7,23],
                [99,130,227,3.97,55,15,24],
                [146,84,139,1.094,40,17,25],
                [113,108,137,1.481,48,15,26],
                [81,48,62,1.619,26,3,27],
                [56,48,68,1.336,37,9,28],
                [82,92,174,3.29,0,13,29],
                [106,116,188,3.628,101,16,30],
                [118,50,0,1.383,76,11,31]
            ];

            var dataSH = [
                [91,45,125,0.82,34,23,1],
                [65,27,78,0.86,45,29,2],
                [83,60,84,1.09,73,27,3],
                [109,81,121,1.28,68,51,4],
                [106,77,114,1.07,55,51,5],
                [109,81,121,1.28,68,51,6],
                [106,77,114,1.07,55,51,7],
                [89,65,78,0.86,51,26,8],
                [53,33,47,0.64,50,17,9],
                [80,55,80,1.01,75,24,10],
                [117,81,124,1.03,45,24,11],
                [99,71,142,1.1,62,42,12],
                [95,69,130,1.28,74,50,13],
                [116,87,131,1.47,84,40,14],
                [108,80,121,1.3,85,37,15],
                [134,83,167,1.16,57,43,16],
                [79,43,107,1.05,59,37,17],
                [71,46,89,0.86,64,25,18],
                [97,71,113,1.17,88,31,19],
                [84,57,91,0.85,55,31,20],
                [87,63,101,0.9,56,41,21],
                [104,77,119,1.09,73,48,22],
                [87,62,100,1,72,28,23],
                [168,128,172,1.49,97,56,24],
                [65,45,51,0.74,39,17,25],
                [39,24,38,0.61,47,17,26],
                [39,24,39,0.59,50,19,27],
                [93,68,96,1.05,79,29,28],
                [188,143,197,1.66,99,51,29],
                [174,131,174,1.55,108,50,30],
                [187,143,201,1.39,89,53,31]
            ];

            var lineStyle = {
                normal: {
                    width: 1,
                    opacity: 0.5
                }
            };

            let option = {
                backgroundColor: '#161627',
                title: {
                    text: 'AQI - 雷达图',
                    left: 'center',
                    textStyle: {
                        color: '#eee'
                    }
                },
                legend: {
                    bottom: 5,
                    data: ['北京', '上海', '广州'],
                    itemGap: 20,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    selectedMode: 'single'
                },
                // visualMap: {
                //     show: true,
                //     min: 0,
                //     max: 20,
                //     dimension: 6,
                //     inRange: {
                //         colorLightness: [0.5, 0.8]
                //     }
                // },
                radar: {
                    indicator: [
                        {name: 'AQI', max: 300},
                        {name: 'PM2.5', max: 250},
                        {name: 'PM10', max: 300},
                        {name: 'CO', max: 5},
                        {name: 'NO2', max: 200},
                        {name: 'SO2', max: 100}
                    ],
                    shape: 'circle',
                    splitNumber: 5,
                    name: {
                        textStyle: {
                            color: 'rgb(238, 197, 102)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: [
                                'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                                'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                            ].reverse()
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(238, 197, 102, 0.5)'
                        }
                    }
                },
                series: [
                    {
                        name: '北京',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataBJ,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#F9713C'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.1
                            }
                        }
                    },
                    {
                        name: '上海',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataSH,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#B3E4A1'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.05
                            }
                        }
                    },
                    {
                        name: '广州',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataGZ,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: 'rgb(238, 197, 102)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.05
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);
        }
    }
}
</script>
<style lang="less">
@import '../../assets/style/global.less';
.chartDemoM{
    .topdiv{
        position: absolute;
        color: #fff;
        background: pink;
    }
    .chartDemoM1{
        width: 500px;
        height:500px;
        // margin: 0 auto;
        background: #6c6ce2;
        display: inline-block;
        margin-right: 20px;
    }
    .chartDemoM2{
        margin-top:10px;
        background: #6c6ce2;
    }
    .chartDemoM3{
        margin-top:10px;
        background: #6c6ce2;
    }
}
</style>