import { store } from "../store"
import { updateFieldData, updateFieldEnabled } from "./fieldActions"

export type Field = {
	readonly id: string,
	readonly data: string,
	readonly enabled: boolean,
}

export type FieldEntity = {
	readonly value: string
	setValue(newValue: string): void
	readonly enabled: boolean
	setEnabled(newValue: boolean): void
}

export const field = ({id, data, enabled}: Field): FieldEntity => ({
	value: data,
	setValue: value => store.dispatch(updateFieldData(id, value)),
	enabled,
	setEnabled: enabled => store.dispatch(updateFieldEnabled(id, enabled)),
})