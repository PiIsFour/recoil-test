import { createApp, type Component } from 'vue'
import Mine from './views/Mine.vue'

const wrapComponent = (component: Component) => ({
	render(root: Element) {
		const app = createApp(component)

		app.mount(root)

		return () => app.unmount()
	}
})

export const mine = wrapComponent(Mine)
