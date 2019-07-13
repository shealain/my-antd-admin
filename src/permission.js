import router from './router'
import { getToken } from '@/utils/auth'


const whiteList = ['/login']// 不需重定向的白名单

router.beforeEach(async (to, from, next) => {

  window.console.log('@/permission/to:', to.path)

  // 确定用户是否已登录
  const hasToken = getToken()

  window.console.log('@/permission/token:', hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* 没有token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入 (白名单之内的路由)
      next()
    } else {
      // 其他无权访问的页面将重定向到登录页面。
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {

})