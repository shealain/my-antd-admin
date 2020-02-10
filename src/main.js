import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import '@/styles/index.scss'

import router from './router'
import store from './store'

import '@/permission'
import '@/utils/error-log'

/**
 * 如果你不想使用mock-server
 * 你想使用MockJs进行模拟api
 * 你可以执行：mockXHR（）
 *
 * 目前MockJs将用于生产环境，
 * 请在上网前删除它！！！
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

