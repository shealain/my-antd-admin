import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
	token: getToken(),
	name: '',
	avatar: '',
	roles: []
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	}
}

const actions = {
	// 用户登录
	login({ commit }, userInfo) {
		window.console.log('login')

		const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password }).then(res => {
				const { data } = res
				commit('SET_TOKEN', data.token)
				setToken(data.token)
				resolve()
			}).catch(err => {
				reject(err)
			})
		})
	},

	// 获取用户的信息
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token).then(res => {
				const { data } = res

				if (!data) {
					reject('验证失败，请再次登录')
				}

				const { name, avatar, roles } = data

				if (!roles || roles.length <= 0) {
					reject('getInfo: roles 必须是非null数组！')
				}

				commit('SET_NAME', name)
				commit('SET_AVATAR', avatar)
				commit('SET_ROLES', roles)
				resolve(data)
			}).catch(err => {
				reject(err)
			})
		})
	},

	// 用户注销
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				removeToken()
				resetRouter()
				resolve()
			}).catch(err => {
				reject(err)
			})
		})
	},

	// 移除 token
	resetToken({ commit }) {// permission.js
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			removeToken()
			resolve()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}