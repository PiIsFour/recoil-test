import type { AnyAction } from "@reduxjs/toolkit"
import { UpdateFieldData } from "./fieldActions"

type Field = {
	id: string,
	data: string,
}

type State = {
	fields: Field[]
}

const initial: State = {
	fields: [{
		id: '1',
		data: 'hello world'
	}]
}

type Action = UpdateFieldData

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
	}
	return state
}

export default reducer
