import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import '@/styles/index.scss'

import router from './router'
import store from './store'

import '@/permission'


Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
