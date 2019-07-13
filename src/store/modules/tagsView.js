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
	},

	DEL_VISITED_VIEW: (state, view) => {
		// index，path -> entries
		/**
		 * var arr = ['111', '222', '333']
		 * arr.entries()
		 *  [0, "111"]
		 *  [1, "222"]
		 *  [2, "333"]
		 */
		for (const [i, v] of state.visitedViews.entries()) {
			if (v.path === view.path) {
				state.visitedViews.splice(i, 1)
				break
			}
		}
	},
	DEL_CACHED_VIEW: (state, view) => {
		for (const n of state.cachedViews) {
			if (n === view.name) {
				const index = state.cachedViews.indexOf(n)
				state.cachedViews.splice(index, 1)
				break
			}
		}
	},

	DEL_OTHERS_VISITED_VIEWS: (state, view) => {
		state.visitedViews = state.visitedViews.filter(v => {
			return v.meta.affix || v.path === view.path
		})
	},
	DEL_OTHERS_CACHED_VIEWS: (state, view) => {
		for (const n of state.cachedViews) {
			if (n === view.name) {
				const index = state.cachedViews.indexOf(n)
				state.cachedViews = state.cachedViews.slice(index, index + 1)
				break
			}
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
	},

	delView({ dispatch, state }, view) {
		return new Promise(resolve => {
			dispatch('delVisitedView', view)
			dispatch('delCachedView', view)
			resolve({
				visitedViews: [...state.visitedViews],
				cachedViews: [...state.cachedViews]
			})
		})
	},
	delVisitedView({ commit, state }, view) {
		return new Promise(resolve => {
			commit('DEL_VISITED_VIEW', view)
			resolve([...state.visitedViews])
		})
	},
	delCachedView({ commit, state }, view) {
		return new Promise(resolve => {
			commit('DEL_CACHED_VIEW', view)
			resolve([...state.cachedViews])
		})
	},

	delOthersViews({ dispatch, state }, view) {
		return new Promise(resolve => {
			dispatch('delOthersVisitedViews', view)
			dispatch('delOthersCachedViews', view)
			resolve({
				visitedViews: [...state.visitedViews],
				cachedViews: [...state.cachedViews]
			})
		})
	},
	delOthersVisitedViews({ commit, state }, view) {
		return new Promise(resolve => {
			commit('DEL_OTHERS_VISITED_VIEWS', view)
			resolve([...state.visitedViews])
		})
	},
	delOthersCachedViews({ commit, state }, view) {
		return new Promise(resolve => {
			commit('DEL_OTHERS_CACHED_VIEWS', view)
			resolve([...state.cachedViews])
		})
	}

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}