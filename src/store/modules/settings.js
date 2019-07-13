import Cookies from 'js-cookie'
import defaultSettings from '@/settings'

const { theme, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
	theme: Cookies.get('theme') ? Cookies.get('theme') : theme,
	tagsView,
	fixedHeader,
	sidebarLogo
}

const mutations = {
	CHANGE_SETTING: (state, { key, value }) => {
		if (state.hasOwnProperty(key)) {
			state[key] = value
		}
	},
	TOGGLE_THEME: (state, theme) => {
		state.theme = theme
		Cookies.set('theme', theme)
	}
}

const actions = {
	changeSetting({ commit }, data) {
		commit('CHANGE_SETTING', data)
	},
	toggleTheme({ commit }, theme) {
		commit('TOGGLE_THEME', theme)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}