const path = require('path')
const chokidar = require('chokidar')
const chalk = require('chalk')
const bodyParser = require('body-parser')

const mockDir = path.join(process.cwd(), 'mock')

global.console.log(chalk.blueBright(`mockDir: ${mockDir}`))

function registerRoutes(app) {
	let mockLastIndex
	const { default: mocks } = require('./index.js')

	// app._router.stack 中可能不止mock的路由，还有其他的http请求的路由，所以要找出 mock的路由的 起始位置 `mockStartIndex`
	for (const mock of mocks) {
		/**
		 * 接口定义：
		 * app.get('/xxx-api/user/login', (req, res) => {
		 *    doSomething...
		 * })
		 */
		app[mock.type](mock.url, mock.response)
		mockLastIndex = app._router.stack.length
	}

	const mockRoutesLength = Object.keys(mocks).length

	return {
		mockRoutesLength,
		mockStartIndex: mockLastIndex - mockRoutesLength
	}
}

function unregisterRoutes() {
	Object.keys(require.cache).forEach(d => {
		// /Volumes/Seagate/vue-projects/my-admin/mock
		if (d.includes(mockDir)) {
			// console.log(require.cache[require.resolve(d)], d)
			delete require.cache[require.resolve(d)]
		}
	})
}



module.exports = app => {

	require('@babel/register')

	// console.log(app)
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
		extended: true
	}))

	const mockRoutes = registerRoutes(app)
	var mockRoutesLength = mockRoutes.mockRoutesLength
	var mockStartIndex = mockRoutes.mockStartIndex

	chokidar.watch(mockDir, {
		ignored: /mock-server/,
		ignoreInitial: true
	})
		.on('all', (event, path) => {
			if (event === 'change' || event === 'add') {
				try {
					// 将mock的路由全部移除掉
					app._router.stack.splice(mockStartIndex, mockRoutesLength)

					unregisterRoutes()

					const mockRoutes = registerRoutes(app)
					mockRoutesLength = mockRoutes.mockRoutesLength
					mockStartIndex = mockRoutes.mockStartIndex

					global.console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
				} catch (error) {
					global.console.log(chalk.redBright(error))
				}
			}
		})
}