import { DataContextRepo } from "./dataContext"
import { FieldDefinition, FieldEntity, FieldId, FieldRepo } from "./field"

export type ComponentDefinition = {
	data: unknown
	fields: FieldDefinition[]
}

export type ComponentState = {
	readonly id: string,
	readonly data: Record<string, unknown>,
	readonly fields: FieldId[]
}

type Props = {
	readonly state: ComponentState
	readonly dataContextRepo: DataContextRepo
	readonly fieldRepo: FieldRepo
}

export class ComponentEntity{
	private readonly state: ComponentState
	private readonly dataContextRepo: DataContextRepo
	private readonly fieldRepo: FieldRepo

	constructor({state, dataContextRepo, fieldRepo}: Props) {
		this.state = state
		this.dataContextRepo = dataContextRepo
		this.fieldRepo = fieldRepo
	}

	getField(index: number): FieldEntity {
		const id = this.state.fields[index]
		if(!id)
			throw new Error('index out of bounds')
		
		return this.fieldRepo.getById(id)
	}
}
