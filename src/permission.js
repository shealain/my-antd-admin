import router from './router'
import store from './store'
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
      // 确定用户是否通过getInfo获取了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      window.console.log('@/permission/hasRoles:', hasRoles)

      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 注意：角色必须是对象数组！ 例如：['admin']或['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')
          window.console.log('@/permission/roles:', roles)

          // 根据角色生成可访问的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack方法确保addRoutes完整
          // 设置replace：true，因此导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (err) {
          // 移除 token，跳到登录页面去重新登录
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
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