import * as ko from 'knockout'

export type Unsubscribe = () => void

export type FpObservable<T> = {
	read: () => T
	subscribe: (callback: (newValue: T) => void) => Unsubscribe
}

export const isFpObservable = (value: unknown): value is FpObservable<unknown> => {
	if(typeof value !== 'object' || !value)
		return false

	const obj = value as FpObservable<unknown>

	return typeof obj.read === 'function' && typeof obj.subscribe === 'function'
}

export const koToFpObservable = <T>(observable: ko.Observable<T>): FpObservable<T> => {
	return {
		read: () => observable(),
		subscribe: cb => {
			const subscription = observable.subscribe(cb)
			return () => subscription.dispose()
		}
	}
}