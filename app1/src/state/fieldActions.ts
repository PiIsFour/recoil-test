import { Guid } from "guid-typescript"

export type UpdateFieldData = {
	type: 'updateFieldData',
	id: Guid,
	data: string,
}

export const updateFieldData = (id: Guid, data: string): UpdateFieldData => {
	return {
		type: 'updateFieldData',
		id,
		data,
	}
}

export type UpdateFieldEnabled = {
	type: 'updateFieldEnabled',
	id: Guid,
	enabled: boolean,
}

export const updateFieldEnabled = (id: Guid, enabled: boolean): UpdateFieldEnabled => {
	return {
		type: 'updateFieldEnabled',
		id,
		enabled,
	}
}
