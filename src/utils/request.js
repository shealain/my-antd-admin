import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Modal from 'ant-design-vue/es/modal'
import Message from 'ant-design-vue/es/message'


// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = baseURL + request url
  timeout: 5000 // 请求超时时间
})

// 请求的拦截器
service.interceptors.request.use(config => {
  // 请求发送之前做一些前置的操作
  if (store.getters.token) {
    // 让每一个请求都带上`token`
    // ['X-Token'] 是一个自定义 headers 的key值
    // 根据真实的场景对它进行修改
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  // 当请求出错时，做一些错误的处理
  window.console.log(error) // for debug
  return Promise.reject(error)
})

// 响应的拦截器
service.interceptors.response.use(response => {
  /**
   * 如果你想获取诸如`headers`或状态之类的http信息
   * 请返回  response => response
   */

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 你还可以通过HTTP状态代码判断状态
   */
  const res = response.data



  // 如果自定义代码不是20000，则判断为错误。
  if (res.code !== 20000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })

    /**
     * 50008: 无效的 token; 
     * 50012: 其他客户登录; 
     * 50014: Token 已过期;
     */
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      // 需要重新登录
      Modal.confirm({
        title: '确认注销',
        content: '您已退出，可以取消此页面，或者重新登录',
        okText: '重新登录',
        cancelText: '取消',
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, error => {
  window.console.log('err' + error) // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
