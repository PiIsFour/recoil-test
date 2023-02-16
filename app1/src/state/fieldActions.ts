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
