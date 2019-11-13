<template lang="pug">
    .edit-model
        | 文本编辑器
        .editor-content
            script#editor(type="text/plain").
            .btn(@click="getUEContent") 获取内容
            //- .btn(@click="setContent") 插入内容
        .push-content(v-html = "html_msg")
            div {{html_msg}}

</template>

<script>
import {PANRONG_URL,UE_URL} from '@/config/IPconfig';

export default {
    name: 'editModel',
    components:{
        
    },
    props:['Msg','config'],
    data () {
        return {
            editor: null,
            defaultMsg:"asdasd",
            html_msg:"",
            ready: false,
        }
    },
    mounted(){
        this.init_edit();

    },
    updated(){
    },
    methods: {
        getUEContent() { // 获取内容方法
            console.log(this.editor.getContent())
            this.html_msg = this.editor.getContent();
            return this.editor.getContent()
        },
        init_edit(){
            if (this.editor != null) {
                this.editor.destroy();
            }
            const _this = this;
            this.editor = UE.getEditor('editor', this.config); // 初始化UE
            this.editor.addListener("ready", function () {
                _this.ready = true;
                _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
            });
            //实例化编辑器
            //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
            var ue = UE.getEditor('editor');
            if(!UE.Editor.prototype._bkGetActionUrl){
                UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
                UE.Editor.prototype.getActionUrl = function(action){
                    console.log(action);
                    if(action=='uploadimage'||action=='uploadscrawl'||action=='upladimage'){
                        return `${UE_URL}api/uploadPic/uploadUedit`
                    }else if(action=='uploadvideo'){
                        return this._bkGetActionUrl.call(this,action);
                    }
                    else{
                        return this._bkGetActionUrl.call(this,action);
                    }
                }
            }
        }
    },
    beforeDestroy () {
        // 组件销毁的时候，要销毁 UEditor 实例
        if(this.editor !== null && this.editor.destroy) {
            this.editor.destroy();
        }
    },
}
</script>
<style scoped lang="less">
@import '../../assets/style/global.less';
    .edit-model{
        color:@c-blue3;
        width: 100%;
        height: 100%;
    }
</style>
