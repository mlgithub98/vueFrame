<template lang="pug">
    .ClosedTest
        .info
            | UE编辑器示例
            br
            | 需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。
        button(@click='getUEContent()') 获取内容
        .editor-container
            UE(:defaultmsg='defaultMsg', :config='config', ref='ue')
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1        
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1
        div()
            | 1

    
</template>

<script>
import UE from '@/components/editModel/editModel';
export default {
    name: 'ClosedTest',
    components:{
        UE
    },
    data () {
        return {
            defaultMsg: '这里是UE测试',
            msg: 'ClosedTest.',
            config: {
                initialFrameWidth: null,
                initialFrameHeight: "500"
            }
        }
    },
    methods: {
        getUEContent() {
            let content = this.$refs.ue.getUEContent();
            console.log(content)
        }
    }
}
</script>
<style scoped lang="less">
@import '../../assets/style/global.less';
    .ClosedTest{
        color:@c-blue3;
        border-radius: 10px;
        line-height: 20px;
        padding: 10px;
        margin: 10px;
        background-color: #ffffff;

    }
</style>
