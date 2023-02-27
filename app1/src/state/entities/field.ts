import { Brand, Flavor } from "../../helpers/brand"
import { CodeExpression, isCodeExpression, parse } from "../../helpers/parser"
import { DataContextEntity, DataContextId, DataContextRepo } from "./dataContext"

export interface FieldRepo {
	getById(id: FieldId): FieldEntity
	getByName(name: FieldDefinitionName): FieldEntity
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
	readonly dataContext: DataContextId,
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
		const data = dataContextRepo.getById(this.state.dataContext)
		const value = data.getProp(this.definition.field)
		if(typeof value !== 'string')
			throw new Error('no field data')
		
		return value
	}
	setValue(value: string, dataContextRepo: DataContextRepo): DataContextEntity {
		const data = dataContextRepo.getById(this.state.dataContext)
		const newDataContext = data.setProp(this.definition.field, value)
		return newDataContext
	}

	getEnabled(context: unknown): boolean{
		if(!isCodeExpression(this.definition.enabled))
			return this.state.enabled
		
		const expression = parse(this.definition.enabled)
		const value = expression.evaluate(context)
		if(typeof value !== 'boolean')
			throw new Error('could not evaluate to boolean')

		return value
	}
	setEnabled(enabled: boolean): FieldEntity{
		if(isCodeExpression(this.definition.enabled))
			throw new Error('enabled is bound with a code expression, you can not set it')

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
	dataContext: DataContextId,
}) => {
	const enabled = isCodeExpression(definition.enabled) ? true : definition.enabled

	return new FieldEntity({
		state: {
			id,
			definition: definition.name,
			enabled,
			dataContext,
		},
		definition,
	},)
}
