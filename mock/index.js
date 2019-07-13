// 使用 Mock
import Mock from 'mockjs'

import user from './user'



const mocks = [
	...user
]

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











