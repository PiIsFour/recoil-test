import { fieldRepo, State } from "../flexpage"

export type UpdateFieldEnabled = {
	type: 'updateFieldEnabled',
	id: string,
	enabled: boolean,
}

export const updateFieldEnabled = (id: string, enabled: boolean): UpdateFieldEnabled => {
	return {
		type: 'updateFieldEnabled',
		id,
		enabled,
	}
}

export const updateFieldEnabledReducer = (state: State, {id, enabled}: UpdateFieldEnabled) => {
	const fields = fieldRepo(state)
	const field = fields.getById(id)
	const updatedField = field.setEnabled(enabled)
	return fields.update(updatedField)
}
