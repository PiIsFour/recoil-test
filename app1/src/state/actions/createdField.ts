import { parse } from "../../helpers/parser"
import { AppDispatch, codeBehindService, RootState, subscriptionService } from "../../store"
import { DataContextId } from "../entities/dataContext"
import { createFieldEntity, FieldDefinitionName, FieldEntity, FieldId, FieldState } from "../entities/field"
import { createContext, fieldRepo } from "../flexpage"
import { isFpObservable } from "../observable"
import type { State } from "../state"

export const createField = (id: FieldId, definitionName: FieldDefinitionName, dataContext: DataContextId) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	const state = getState().flexpage
	const definition = state.pageDefinition?.fields[definitionName]
	if(!definition)
		throw new Error('field definition not found')

	const field = createFieldEntity({
		id,
		definition,
		dataContext,
		context: createContext(state)
	})

	dispatch(createdField(field.state, definitionName))

	field.getExternalDependencies()
		.forEach(({definition, onUpdate}) => {
			const expression = parse(definition.expression)
			const onChange = () => {
				console.log('change detected')
				const newValue = expression.evaluate(createContext(getState().flexpage))
				dispatch(onUpdate(newValue))
			}
			const subscriptions = expression.dependencies()
				.filter(path => path.startsWith('$properties.'))
				.map(path => path.slice('$properties.'.length))
				.map(prop => codeBehindService.getProp(prop))
				.filter(isFpObservable)
				.map(dep => dep.subscribe(onChange))
			
			subscriptionService.addSubscriptions(field.id, subscriptions)
		})
}

export type CreatedField = {
	type: 'createdField',
	fieldState: FieldState,
	definition: FieldDefinitionName,
}

export const createdField = (fieldState: FieldState, definition: FieldDefinitionName): CreatedField => {
	return {
		type: 'createdField',
		fieldState,
		definition
	}
}

export const createdFieldReducer = (state: State, {fieldState, definition: definitionName}: CreatedField) => {
	const fields = fieldRepo(state)
	const definition = state.pageDefinition?.fields[definitionName]
	if(!definition)
		throw new Error('field definition not found')

	const field = new FieldEntity({
		state: fieldState,
		definition,
	})

	const updated = fields.create(field)
	return updated
}
