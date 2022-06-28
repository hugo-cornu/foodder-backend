export function qs(selector, element = document) {
	return element.querySelector(selector)
}
export function qsa(selector, element = document) {
	return [...element.querySelectorAll(selector)]
}
