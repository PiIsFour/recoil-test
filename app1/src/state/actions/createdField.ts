import { createFieldEntity, FieldDefinitionName, FieldId } from "../entities/field"
import { fieldRepo } from "../flexpage"
import type { State } from "../state"

export type CreatedField = {
	type: 'createdField',
	id: FieldId,
	definition: FieldDefinitionName,
	dataContext: string,
}

export const createdField = (id: FieldId, definition: FieldDefinitionName, dataContext: string): CreatedField => {
	return {
		type: 'createdField',
		id,
		definition,
		dataContext,
	}
}

export const createdFieldReducer = (state: State, {id, definition: definitionName, dataContext}: CreatedField) => {
	const fields = fieldRepo(state)
	const definition = state.pageDefinition.fields[definitionName]
	if(!definition)
		throw new Error('field definition not found')

	const field = createFieldEntity({
		id,
		definition,
		dataContext,
	})
	const updated = fields.create(field)
	return updated
}
