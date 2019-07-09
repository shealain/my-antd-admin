import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Layout from '@/layout'

/**
 * 注意：子菜单仅在路由children.length> = 1时显示
 * 
 * hidden: true                   如果设置为true，则项目不会显示在侧栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子路径时，
 *                                它将成为嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name: 'router-name'            该名称由<keep-alive>使用（必须设置!!!）
 * meta: {
    roles: ['admin','editor']     控制页面角色（可以设置多个角色）
    title: 'title'                侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'              侧边栏中的图标显示
    breadcrumb: false             如果设置为false，该项将隐藏在面包屑中（默认为true）
    activeMenu: '/example/list'   如果设置路径，侧边栏将突出显示您设置的路径

    noCache: true                 如果设置为true，则不会缓存页面（默认为false）
    affix: true                   如果设置为true，则tag将粘贴在tags-view中
  }
 */

/**
* constantRoutes
* 这些页面不需要权限访问的要求
* 所有角色都可以访问
*/
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作仪表盘', icon: 'dashboard' }
    }]
	},
	
	// 404页面必须放在最后!!!
  {
    path: '*',
    redirect: '/dashboard',// TODO -> /404
    hidden: true
  }

]


const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router