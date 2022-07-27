export default {
    methods:{
        /**
         * 改变事件
         * @param e 入参
         */
        handleChange(e){
            console.log('触发change事件：',e)
            let customFn = new Function('form','view','e', this.element.options.change)
            customFn.call(this,this.model,this.widgetForm, e)
        },
        /**
         * 点击事件
         * @param e 入参
         */
        handleClick(e){
            console.log('触发click事件：',e)
        },
        /**
         * 带回调的点击事件 - 示例
         * @param e 入参
         */
        /*handleClickCallback(e){
            let customFn = (rule, value, callback) => {
              let tmpFunc =  new Function('form','e', this.selectWidget.options.change)
              return tmpFunc.call(this,this.widgetForm, e)
            }
            customFn.call(this,this.widgetForm, e)
        }*/
    }
}
