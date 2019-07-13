/**
 * 检查元素是否有类名
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
	return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 将类名添加到元素
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
	if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 从元素中删除类名
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
	if (hasClass(ele, cls)) {
		const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
		ele.className = ele.className.replace(reg, ' ')
	}
}