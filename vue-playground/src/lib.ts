import { createApp } from 'vue'
import Mine from './views/Mine.vue'

export default {
	render(root: Element) {
		const app = createApp(Mine)

		app.mount(root)
	}
}