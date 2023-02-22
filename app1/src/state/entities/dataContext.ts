
export interface DataContextRepo {
	getById<T>(id: string): DataContextEntity<T>
}

export type DataContextState<T> = {
	readonly id: string,
	readonly data: T,
}

export class DataContextEntity<T>{
	constructor(public readonly state: DataContextState<T>) {}

	get id() {
		return this.state.id
	}

	getProp<K extends keyof T>(key: K): T[K] {
		return this.state.data[key]
	}

	setProp<K extends keyof T>(key: K, value: T[K]): DataContextEntity<T> {
		return new DataContextEntity({
			...this.state,
			data: {
				...this.state.data,
				[key]: value
			}
		})
	}
}
