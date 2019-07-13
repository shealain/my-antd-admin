'use strict'

const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = 'My Admin' // page title
// 如果你的端口设置为80,
// 使用管理员权限执行命令行.
// 例如，Mac：sudo npm run
const port = 8080 // 开发环境端口

// 所有配置项说明都可以在 https://cli.vuejs.org/config/ 中找到
module.exports = {
  /**
   * 如果您计划在子路径下部署站点，则需要设置publicPath,
   * 例如GitHub Pages. 如果您计划将您的网站部署到 https://foo.github.io/my-admin/,
   * 然后应将publicPath设置为 "/my-admin/".
   * 在大多数情况下，请使用 '/' !!!
   * 详情: https://cli.vuejs.org/config/#publicpath
   */
	publicPath: '/my-antd-admin',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			// 更改 xxx-api/login => mock/login
			// 详情: https://cli.vuejs.org/config/#devserver-proxy
			[process.env.VUE_APP_BASE_API]: {
				target: `http://127.0.0.1:${port}/mock`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: ''
				}
			}
		},
		after: require('./mock/mock-server.js')
	},
	configureWebpack: {
		// 在webpack的名称字段中提供应用程序的标题，以便
		// 可以在index.html中访问它以注入正确的标题
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
	},
	chainWebpack(config) {
		config.plugins.delete('preload') // TODO: 需要测试
		config.plugins.delete('prefetch') // TODO: 需要测试

		// 设置 preserveWhitespace
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true
				return options
			})
			.end()

		config
			// https://webpack.js.org/configuration/devtool/#development
			.when(process.env.NODE_ENV === 'development',
				config => config.devtool('cheap-source-map')
			)

		config
			.when(process.env.NODE_ENV !== 'development', config => {
				config
					.plugin('ScriptExtHtmlWebpackPlugin')
					.after('html')
					.use('script-ext-html-webpack-plugin', [{
						// `runtime` 必须与runtimeChunk名称相同. 默认是 `runtime`
						inline: /runtime\..*\.js$/
					}])
					.end()
				config
					.optimization.splitChunks({
						chunks: 'all',
						cacheGroups: {
							libs: {
								name: 'chunk-libs',
								test: /[\\/]node_modules[\\/]/,
								priority: 10,
								chunks: 'initial' // 仅包括最初依赖的第三方
							},
							antDesignVue: {
								name: 'chunk-ant-design-vue', // 将 ant-design-vue 拆分为单个包
								priority: 20, // 重量需要大于libs和app，否则它将被打包到libs或app中
								test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // 为了适应cnpm
							},
							commons: {
								name: 'chunk-commons',
								test: resolve('src/components'), // 可以自定义你的规则
								minChunks: 3, //  最小公共号码
								priority: 5,
								reuseExistingChunk: true
							}
						}
					})
				config.optimization.runtimeChunk('single')
			})
	}
}
