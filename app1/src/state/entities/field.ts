import { Brand, Flavor } from "../../helpers/brand"
import { CodeExpression } from "../../helpers/parser"
import { DataContextEntity, DataContextRepo } from "./dataContext"

export interface FieldRepo {
	getById(id: FieldId): FieldEntity
}

export type FieldDefinition = {
	readonly name: FieldDefinitionName,
	readonly field: string,
	readonly enabled: boolean | CodeExpression
}

export type FieldId = Brand<string, 'FieldId'>
export type FieldDefinitionName = Flavor<string, 'FieldDefinitionName'>

export type FieldState = {
	readonly id: FieldId,
	readonly enabled: boolean,
	readonly dataContext: string,
	readonly definition: FieldDefinitionName,
}

type Props = {
	readonly state: FieldState
	readonly definition: FieldDefinition
}

export class FieldEntity{
	public readonly state: FieldState
	private readonly definition: FieldDefinition

	constructor({state, definition}: Props) {
		this.state = state
		this.definition = definition
	}

	get id() {
		return this.state.id
	}

	getValue(dataContextRepo: DataContextRepo): string {
		const data = dataContextRepo.getById<Record<string, unknown>>(this.state.dataContext)
		const value = data.getProp(this.definition.field)
		if(typeof value !== 'string')
			throw new Error('no field data')
		
		return value
	}
	setValue(value: string, dataContextRepo: DataContextRepo): DataContextEntity<unknown> {
		const data = dataContextRepo.getById<Record<string, unknown>>(this.state.dataContext)
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
		})
	}
}

export const createFieldEntity = ({id, definition, dataContext}: {
	id: FieldId,
	definition: FieldDefinition,
	dataContext: string,
}) => {
	return new FieldEntity({
		state: {
			id,
			definition: definition.name,
			enabled: true,
			dataContext,
		},
		definition,
	},)
}
