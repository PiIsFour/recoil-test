import ko from 'knockout'
import { updateFieldEnabled } from '../state/fieldActions'
import { FieldEntity } from '../state/fieldEntety'
import { store } from '../store'

export type ComponentAPI = {
	getField(id: string): FieldEntity
}

class MockComponent{
	public timer = ko.observable(true)

	private interval: NodeJS.Timer

	constructor() {
		this.interval = setInterval(() => {
			this.timer(!this.timer())
		}, 1000)

		this.timer.subscribe((timer) => {
			store.dispatch(updateFieldEnabled('1', timer))
		})
	}

	dispose() {
		clearInterval(this.interval)
		console.log('dispose')
	}
}

export default MockComponent
