import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui';
import 'virtual:svg-icons-register' // 引入SVG注册脚本
import './styles/index.less'
createApp(App)
    .use(naive)
    .mount('#app')

