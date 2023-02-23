import { FieldId } from "../entities/field"
import { fieldRepo } from "../flexpage"
import type { State } from "../state"

export type UpdatedFieldEnabled = {
	type: 'updatedFieldEnabled',
	id: FieldId,
	enabled: boolean,
}

export const updatedFieldEnabled = (id: FieldId, enabled: boolean): UpdatedFieldEnabled => {
	return {
		type: 'updatedFieldEnabled',
		id,
		enabled,
	}
}

export const updatedFieldEnabledReducer = (state: State, {id, enabled}: UpdatedFieldEnabled) => {
	const fields = fieldRepo(state)
	const field = fields.getById(id)
	const updatedField = field.setEnabled(enabled)
	return fields.update(updatedField)
}
