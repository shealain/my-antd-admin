/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuData示例：
 * [
 *  {
 *    path: '菜单路由',
 *    hidden: 'boolean, 是否不可见',
 *    meta: {
 *        title: '菜单标题',
 *        icon: '菜单图标'
 *    },
 *    children: [子菜单配置],
 *  }
 * ]
 **/
import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'

import path from 'path'

const { Item, SubMenu } = Menu

export default {
	name: 'MyMenu',
	props: {
		menuData: {
			type: Array,
			required: true
		},
		theme: {
			type: String,
			required: false,
			default: 'dark'
		},
		mode: {
			type: String,
			required: false,
			default: 'inline'
		},
		collapsed: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data() {
		return {
			openKeys: [],
			selectedKeys: [],
			cachedOpenKeys: []
		}
	},
	computed: {
		rootSubmenuKeys: (vm) => {
			let keys = []
			vm.menuData.forEach(item => {
				keys.push(item.path)
			})
			return keys
		}
	},
	created() {
		this.updateMenu()
	},
	watch: {
		collapsed(val) {
			if (val) {
				this.cachedOpenKeys = this.openKeys
				this.openKeys = []
			} else {
				this.openKeys = this.cachedOpenKeys
			}
		},
		'$route': function () {
			this.updateMenu()
		}
	},
	methods: {
		renderIcon: function (h, icon) {
			return icon === 'none' ?
				null :
				h(
					Icon,
					{
						props: {
							type: icon
						}
					}
				)
		},
		renderMenuItem: function (h, menu, basePath) {
			var path = basePath ? this.resolvePath(basePath, menu.path) : menu.path
			return h(
				Item,
				{
					key: path
				},
				[
					h(
						'a',
						{
							attrs: {
								href: '#' + path
							}
						},
						[
							this.renderIcon(h, menu.meta && menu.meta.icon),
							h('span', [menu.meta && menu.meta.title])
						]
					)
				]
			)
		},
		renderSubMenu: function (h, menu) {
			var subMenuVNode = [
				h(
					'span',
					{ slot: 'title' },
					[
						this.renderIcon(h, menu.meta && menu.meta.icon),
						h('span', [menu.meta && menu.meta.title])
					]
				)
			]

			var children = menu.children.filter((child) => {
				return child.hidden !== true
			}).map((child) => {
				let basePath = menu.path
				return this.renderItem(h, child, basePath)
			})

			return h(
				SubMenu,
				{ key: menu.path },
				subMenuVNode.concat(children)
			)
		},
		renderItem: function (h, menu, basePath) {
			return menu.children ?
				this.renderSubMenu(h, menu) :
				this.renderMenuItem(h, menu, basePath)
		},
		renderMenu: function (h, menuData) {
			var menuVNodes = menuData.filter((menu) => {
				return menu.hidden !== true
			}).map((menu) => {
				// 二级菜单中只有一个子节点
				var onlyOneChild = this.hasOneShowingChild(menu.children, menu) || menu
				return this.renderItem(h, onlyOneChild, '/')
			})
			return menuVNodes
		},
		onOpenChange(openKeys) {
			// 二级菜单展开时
			const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
			if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
				this.openKeys = openKeys
			} else {
				this.openKeys = latestOpenKey ? [latestOpenKey] : []
			}
		},
		updateMenu() {
			let routes = this.$route.matched.concat()

			// 当前高亮的菜单，即最后一个是叶子路由，设置为高亮
			this.selectedKeys = [routes.pop().path]

			// 其他为父级路由，都需要展开
			let openKeys = []
			routes.forEach((item) => {
				openKeys.push(item.path)
			})

			// 左侧菜单，收起的情况，则缓存需要展开的路由
			if (this.collapsed || this.mode === 'horizontal') {
				this.cachedOpenKeys = openKeys
			} else {
				this.openKeys = openKeys
			}
		},
		hasOneShowingChild(children = [], parent) {
			let showingChildren = children.filter(item => {
				if (item.hidden) {
					return false
				} else {
					// 缓存 当前 遍历到的 二级菜单项
					return true
				}
			})

			// console.log('showingChildren', showingChildren)

			// 如果只有一个二级菜单，则显示这个二级菜单
			if (showingChildren.length === 1) {
				return showingChildren[0]
			}

			// 如果没有二级菜单，则直接显示一级菜单
			if (showingChildren.length === 0) {
				return {
					...parent,
					path: '',
					noShowingChildren: true
				}
			}

			return false
		},
		resolvePath(basePath, routePath) {
			// 是 http或者https 开头的路由
			return path.resolve(basePath, routePath)
		}
	},
	render(h) {
		return h(
			Menu,
			{
				props: {
					theme: this.$props.theme,
					mode: this.$props.mode,
					openKeys: this.openKeys,
					selectedKeys: this.selectedKeys
				},
				on: {
					openChange: this.onOpenChange,
					select: (obj) => {
						this.selectedKeys = obj.selectedKeys
						this.$emit('select', obj)
					}
				}
			}, this.renderMenu(h, this.menuData)
		)
	}
}
