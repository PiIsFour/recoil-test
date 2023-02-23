import { FieldId } from "../entities/field"
import { dataContextRepo, fieldRepo } from "../flexpage"
import type { State } from "../state"

export type UpdatedFieldData = {
	type: 'updatedFieldData',
	id: FieldId,
	data: string,
}

export const updatedFieldData = (id: FieldId, data: string): UpdatedFieldData => {
	return {
		type: 'updatedFieldData',
		id,
		data,
	}
}

export const updatedFieldDataReducer = (state: State, {id, data}: UpdatedFieldData) => {
	const fields = fieldRepo(state)
	const field = fields.getById(id)
	const dataContexts = dataContextRepo(state)
	const updatedContext = field.setValue(data, dataContexts)
	const updataed = dataContexts.update(updatedContext)
	// return computeSyncronusExpression(updataed)
	return updataed
}
