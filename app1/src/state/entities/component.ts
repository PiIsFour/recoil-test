import { DataContextRepo } from "./dataContext"
import { FieldDefinition, FieldEntity, FieldRepo } from "./field"

export type ComponentDefinition = {
	data: unknown
	fields: FieldDefinition[]
}

export type ComponentState = {
	readonly id: string,
	readonly data: Record<string, unknown>,
	readonly fields: string[]
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
		return this.fieldRepo.getById(this.state.fields[index])
	}
}
