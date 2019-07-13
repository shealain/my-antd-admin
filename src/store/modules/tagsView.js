const state = {
	visitedViews: [],// [{"name": "Dashboard", ...}, {"name": "Bar", ...}]
	cachedViews: []// ["Bar"]
}

const mutations = {
	ADD_VISITED_VIEW: (state, view) => {
		if (state.visitedViews.some(v => v.path === view.path)) return
		state.visitedViews.push(
			Object.assign({}, view, {
				title: view.meta.title || 'no-name'
			})
		)
	},
	ADD_CACHED_VIEW: (state, view) => {
		if (state.cachedViews.includes(view.name)) return
		if (!view.meta.noCache) {
			state.cachedViews.push(view.name)
		}
	}
}

const actions = {
	addView({ dispatch }, view) {
		dispatch('addVisitedView', view)
		dispatch('addCachedView', view)
	},
	addVisitedView({ commit }, view) {
		commit('ADD_VISITED_VIEW', view)
	},
	addCachedView({ commit }, view) {
		commit('ADD_CACHED_VIEW', view)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}