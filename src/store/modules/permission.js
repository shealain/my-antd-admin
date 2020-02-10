import { asyncRoutes, constantRoutes } from "@/router"

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param {Array} roles ['admin']
 * @param {Object} route 
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some(role => route.meta.roles.includes(role))
	} else {
		return true
	}
}

/**
 * 通过递归过滤异步路由表
 * @param {Array} routes asyncRoutes
 * @param {Array} roles ['admin']
 */
export function filterAsyncRoutes(routes, roles) {
	const res = []

	routes.forEach(route => {
		const tmp = { ...route }
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles)
			}
			res.push(tmp)
		}
	})

	return res
}

const state = {
	routes: [],
	addRoutes: []
}

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.addRoutes = routes
		state.routes = constantRoutes.concat(routes)
	}
}

const actions = {
	// 根据用户角色列表生成可访问的路由列表
	generateRoutes({ commit }, roles) {
		return new Promise(resolve => {
			let accessedRoutes
			if (roles.includes('admin')) {
				accessedRoutes = asyncRoutes || []
			} else {
				accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)				
			}
			commit('SET_ROUTES', accessedRoutes)
			resolve(accessedRoutes)
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}