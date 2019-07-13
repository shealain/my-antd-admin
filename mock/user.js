const tokens = {
	admin: {
		token: 'admin-token'
	},
	editor: {
		token: 'editor-token'
	}
}

const users = {
	'admin-token': {
		roles: ['admin'],
		introduction: 'I am a super administrator',
		avatar: '/my-antd-admin/favicon.ico',
		name: 'Super Admin'
	},
	'editor-token': {
		roles: ['editor'],
		introduction: 'I am an editor',
		avatar: '/my-antd-admin/favicon.ico',
		name: 'Normal Editor'
	}
}

export default [
	// 用户登录
	{
		url: '/user/login',
		type: 'post',
		response: req => {
			const { username } = req.body
			const token = tokens[username]

			if (!token) {
				return {
					code: 60204,
					message: 'Account and password are incorrect.',
				}
			}

			return {
				code: 20000,
				data: token
			}
		}
	},

	// 获取用户信息
	{
		url: '/user/info\\.*',
		type: 'get',
		response: req => {
			const { token } = req.query
			const info = users[token]

			if (!info) {
				return {
					code: 50008,
					message: 'Login failed, unable to get user details.',
				}
			}

			return {
				code: 20000,
				data: info
			}
		}
	},

	// 用户登出
	{
		url: '/user/logout',
		type: 'post',
		response: () => {
			return {
				code: 20000,
				data: 'success'
			}
		}
	}
]
