import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'

const { errorLog: needErrorLog } = settings

// 你可以在settings.js中设置
// errorLog：'production' | ['生产'，'发展']
function checkNeed() {
	const env = process.env.NODE_ENV
	if (isString(needErrorLog)) {
		return env === needErrorLog
	}
	if (isArray(needErrorLog)) {
		return needErrorLog.includes(env)
	}
	return false
}

if (checkNeed()) {
	Vue.config.errorHandler = function (err, vm, info) {
		Vue.nextTick(() => {
			store.dispatch('errorLog/addErrorLog', {
				err, vm, info, url: window.location.href
			})
			window.console.error(err, info)
		})
	}
}