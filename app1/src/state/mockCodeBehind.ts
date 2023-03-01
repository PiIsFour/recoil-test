import * as ko from 'knockout'
import { koToFpObservable } from './observable'

export class PageCodeBehind {
	private koEnabled = ko.observable(true)
	public enabled = koToFpObservable(this.koEnabled)

	constructor() {
		let count = 0
		const timer = setInterval(() => {
			this.koEnabled(!this.koEnabled())
			count++
			if(count > 4)
				clearInterval(timer)
		}, 1000)
	}
}