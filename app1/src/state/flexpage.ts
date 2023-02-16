import type { AnyAction } from "@reduxjs/toolkit"
import { UpdateFieldData, UpdateFieldEnabled } from "./fieldActions"
import CB from '../components/MockComponentCodeBehind'
import { Field } from "./fieldEntety"

type State = {
	fields: Field[]
}

const initial: State = {
	fields: [{
		id: '1',
		data: 'hello world',
		enabled: true,
	}]
}

type Action = UpdateFieldData | UpdateFieldEnabled

export const MockComponentLoading = new CB() 

const reducer = (state: State = initial, action: AnyAction): State => {
	const a = action as Action
	switch(a.type) {
		case "updateFieldData": {
			const {id, data} = a

			const fields = state.fields.map(field => {
				if(field.id !== id)
					return field
				
				return {
					...field,
					data,
				}
			})

			return {
				...state,
				fields
			}
		}
		case "updateFieldEnabled": {
			const {id, enabled} = a

			const fields = state.fields.map(field => {
				if(field.id !== id)
					return field
				
				return {
					...field,
					enabled,
				}
			})

			return {
				...state,
				fields
			}
		}
		default: return state
	}
	return state
}

export default reducer
