import { dataContextRepo, fieldRepo, State } from "../flexpage"

export type UpdateFieldData = {
	type: 'updateFieldData',
	id: string,
	data: string,
}

export const updateFieldData = (id: string, data: string): UpdateFieldData => {
	return {
		type: 'updateFieldData',
		id,
		data,
	}
}

export const updateFieldDataReducer = (state: State, {id, data}: UpdateFieldData) => {
	const fields = fieldRepo(state)
	const field = fields.getById(id)
	const updatedContext = field.setValue(data)
	const dataContexts = dataContextRepo(state)
	const updataed = dataContexts.update(updatedContext)
	// return computeSyncronusExpression(updataed)
	return updataed
}
