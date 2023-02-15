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

