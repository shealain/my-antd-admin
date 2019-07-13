import store from '@/store'

const { body } = document
const WIDTH = 992

export default {
	watch: {
		$route(route) {
			// 路由切换时，如果为手机的分辨率 并且 左侧菜单是打开 的状态下，则路由切换成功后过度关闭左侧菜单
			if (this.device === 'mobile' && this.sidebar.opened) {
				store.dispatch('app/closeSideBar', { withoutAnimation: false })
			}
		}
	},
	beforeMount() {
		window.addEventListener('resize', this.$_resizeHandler)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.$_resizeHandler)
	},
	mounted() {
		const isMobile = this.$_isMobile()
		if (isMobile) {
			// TODO log
			window.console.log('resizeHandler.isMobile', isMobile)

			store.dispatch('app/toggleDevice', 'mobile')
			store.dispatch('app/closeSideBar', { withoutAnimation: true })
		}
	},
	methods: {
		$_isMobile() {
			const rect = body.getBoundingClientRect()
			return rect.width - 1 < WIDTH
		},
		$_resizeHandler() {
			if (!document.hidden) {
				const isMobile = this.$_isMobile()
				const device = isMobile ? 'mobile' : 'desktop'

				// TODO log
				window.console.log('resizeHandler.isMobile', isMobile)

				store.dispatch('app/toggleDevice', device)

				if (isMobile) {
					store.dispatch('app/closeSideBar', { withoutAnimation: true })
				}
			}
		}
	}
}