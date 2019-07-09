import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import '@/styles/index.scss'

import router from './router'

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
