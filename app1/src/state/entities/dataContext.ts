import { Brand } from "../../helpers/brand"

export interface DataContextRepo {
	getById(id: DataContextId): DataContextEntity
}

export type DataContextId = Brand<string, 'DataContextId'>

export type DataContextState = {
	readonly id: DataContextId,
	readonly data: unknown,
}

export class DataContextEntity{
	constructor(public readonly state: DataContextState) {}

	get id() {
		return this.state.id
	}

	getProp(key: string): unknown {
		const { data } = this.state
		if(typeof data !== 'object' || !data)
			throw new Error('data is no object, therfore we can not set props')

		return (data as Record<string, unknown>)[key]
	}

	setProp(key: string, value: unknown): DataContextEntity {
		if(typeof this.state.data !== 'object' || !this.state.data)
			throw new Error('data is no object, therfore we can not set props')
		
		return new DataContextEntity({
			...this.state,
			data: {
				...this.state.data,
				[key]: value
			}
		})
	}
}
