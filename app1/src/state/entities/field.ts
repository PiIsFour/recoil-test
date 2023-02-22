import { DataContextEntity, DataContextRepo } from "./dataContext"

export interface FieldRepo {
	getById(id: string): FieldEntity
}

export type FieldDefinition = {
	readonly name: string,
	readonly field: string,
	readonly enabled: boolean
}

export type FieldState = {
	readonly id: string,
	readonly enabled: boolean,
	readonly dataContext: string,
}

type Props = {
	readonly state: FieldState
	readonly definition: FieldDefinition
	readonly dataContextRepo: DataContextRepo
}

export class FieldEntity{
	public readonly state: FieldState
	private readonly definition: FieldDefinition
	private readonly dataContextRepo: DataContextRepo

	constructor({state, definition, dataContextRepo}: Props) {
		this.state = state
		this.definition = definition
		this.dataContextRepo = dataContextRepo
	}

	get id() {
		return this.state.id
	}

	get value(): string {
		const data = this.dataContextRepo.getById<Record<string, unknown>>(this.state.dataContext)
		const value = data.getProp(this.definition.field)
		if(typeof value !== 'string')
			throw new Error('no field data')
		
		return value
	}
	setValue(value: string): DataContextEntity<unknown> {
		const data = this.dataContextRepo.getById<Record<string, unknown>>(this.state.dataContext)
		const newDataContext = data.setProp(this.definition.field, value)
		return newDataContext
	}

	get enabled(): boolean{
		return this.state.enabled
	}
	setEnabled(enabled: boolean): FieldEntity{
		return new FieldEntity({
			state: {
				...this.state,
				enabled,
			},
			definition: this.definition,
			dataContextRepo: this.dataContextRepo,
		})
	}
}
