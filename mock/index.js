// 使用 Mock
import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'



const mocks = [
	...user
]


// 对于前端的模拟
// 请谨慎使用它，它将重新定义 `XMLHttpRequest`
// 这将导致许多第三方库失效（如进度事件）
export function mockXHR() {
	// mock 补丁
	// https://github.com/nuysoft/Mock/issues/300
	Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
	Mock.XHR.prototype.send = function () {
		if (this.custom.xhr) {
			this.custom.xhr.withCredentials = this.withCredentials || false

			if (this.responseType) {
				this.custom.xhr.responseType = this.responseType
			}
		}
		this.proxy_send(...arguments)
	}

	function XHR2ExpressReqWrap(respond) {
		return function (options) {
			let result = null
			if (respond instanceof Function) {
				const { body, type, url } = options
				// https://expressjs.com/en/4x/api.html#req
				result = respond({
					method: type,
					body: JSON.parse(body),
					query: param2Obj(url)
				})
			} else {
				result = respond
			}
			return Mock.mock(result)
		}
	}

	for (const i of mocks) {
		Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
	}
}

// mock服务器使用
const responseFake = (url, type, response) => {
	return {
		url: new RegExp(`/mock${url}`),
		type: type || 'get',
		response(req, res) {
			res.json(
				Mock.mock(response instanceof Function ? response(req, res) : response)
			)
		}
	}
}


/**
 * @params route 
 * {
 *  url: String,
 *  type: String,
 *  response: Function
 * }
 * @returns route 
 * {
 *  url: RegExp,            /\/mock\/user\/login/
 *  type: String,           'post'
 *  response: Function      [Function: response]
 * }
 */
export default mocks.map(route => {
	return responseFake(route.url, route.type, route.response)
})











