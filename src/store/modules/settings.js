import Cookies from 'js-cookie'
import defaultSettings from '@/settings'

const { theme } = defaultSettings

const state = {
	theme: Cookies.get('theme') ? Cookies.get('theme') : theme
}

const mutations = {
	TOGGLE_THEME: (state, theme) => {
		state.theme = theme
		Cookies.set('theme', theme)
	}
}

const actions = {
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