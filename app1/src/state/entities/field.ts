import { Brand, Flavor } from "../../helpers/brand"
import { CodeExpression, isCodeExpression, parse } from "../../helpers/parser"
import { updatedFieldEnabled } from "../actions/updatedFieldEnabled"
import { DependantValue, externalDependency, hasValue, independentValue, isExternalDependency, withinStateDependency } from "../dependantValue"
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
	readonly enabled: DependantValue<boolean>,
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
		if(hasValue(this.state.enabled))
			return this.state.enabled.value

		if(!isCodeExpression(this.definition.enabled))
			throw new Error('Enabled needs to be a definition to get here')

		const expression = parse(this.definition.enabled)
		const value = expression.evaluate(context)
		if(typeof value !== 'boolean')
			throw new Error('could not evaluate to boolean')

		return value
	}
	setEnabled(enabled: boolean): FieldEntity{
		if(!hasValue(this.state.enabled))
			throw new Error('enabled is bound with a code expression, you can not set it')

		return new FieldEntity({
			state: {
				...this.state,
				enabled: {
					...this.state.enabled,
					value: enabled
				},
			},
			definition: this.definition,
		})
	}

	getExternalDependencies() {
		const enabled = this.state.enabled
		if(!isExternalDependency(enabled))
			return []
		
		return [{
			definition: enabled,
			onUpdate: (value: unknown) => {
				if(typeof value !== 'boolean')
					throw new Error('codeExpression for field enabled needs to evaluate to boolean')
				return updatedFieldEnabled(this.state.id, value)
			}
		}]
	}
}

const getInitialValue = <T>(definition: T | CodeExpression, context: unknown): DependantValue<T> => {
	if(!isCodeExpression(definition))
		return independentValue(definition)
	
	const expression = parse(definition)
	const hasExternalDependencies = expression
		.dependencies()
		.some(path => path.startsWith('$properties.'))
	
	if(!hasExternalDependencies)
		return withinStateDependency(definition)

	const value = expression.evaluate(context) as T
	return externalDependency(value, definition)
}

export const createFieldEntity = ({id, definition, dataContext, context}: {
	id: FieldId,
	definition: FieldDefinition,
	dataContext: DataContextId,
	context: unknown,
}) => {
	const enabled = getInitialValue(definition.enabled, context)

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
