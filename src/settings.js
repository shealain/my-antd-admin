export default {
	title: 'My Admin',

	/**
	 * @type {string} 'dark' | 'light'
	 * @description 主题模式。
	 */
	theme: 'dark',

	/**
	 * @type {boolean} true | false
	 * @description 是否需要tagsView
	 */
	tagsView: true,

	/**
	 * @type {boolean} true | false
	 * @description 是否固定头部
	 */
	fixedHeader: false,

	/**
	 * @type {boolean} true | false
	 * @description 是否在左侧菜单中展示logo
	 */
	sidebarLogo: true,

	/**
	 * @type {boolean} true | false
	 * @description 是否显示右侧面板的设置
	 */
	showSettings: true,

	/**
	 * @type {string | array} 'production' | ['production', 'development']
	 * @description 需要显示错误日志组件。
	 * 默认值仅用于生产环境
	 * 如果你想在dev中使用它，你可以传递 ['production', 'development']
	 */
	errorLog: ['production', 'development']
}