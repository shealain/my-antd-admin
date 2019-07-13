import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import getters from './getters'
import user from './modules/user'

import permission from './modules/permission'

import tagsView from './modules/tagsView'

import settings from './modules/settings'



Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    tagsView,
    settings
  },
  getters
})

export default store