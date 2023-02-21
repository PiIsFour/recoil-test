import type { AnyAction } from "@reduxjs/toolkit"
import { UpdateFieldData, UpdateFieldEnabled } from "./fieldActions"
import { FieldEntity, FieldRepo, FieldState } from "./entities/field"
import { Guid } from "guid-typescript"
import { DataContextEntity, DataContextRepo, DataContextState } from "./entities/dataContext"

export type State = {
	fields: FieldState[]
	dataContexts: DataContextState<unknown>[]
}

const data = {
	id: Guid.create(),
	data: {
		name: 'hello'
	}
} satisfies DataContextState<unknown>

const initial: State = {
	fields: [{
		id: Guid.create(),
		dataContext: data.id,
		enabled: true
	}],
	dataContexts: [data]
}

interface DataContextRepoInternal extends DataContextRepo {
	update<T>(entity: DataContextEntity<T>): State
}

const dataContextRepo = (state: State): DataContextRepoInternal => {
	return {
		getById: <T>(id: Guid) => {
			const data = state.dataContexts.find(x => x.id === id)
			if(!data)
				throw new Error('could not find dataContext')

			return new DataContextEntity<T>(data as DataContextState<T>)
		},
		update: <T>(entity: DataContextEntity<T>) => {
			const dataContexts = state.dataContexts.map(x => {
				if(x.id !== entity.id)
					return x

				return entity.state
			})
			return {
				...state,
				dataContexts
			}
		},
	}
}

interface FieldRepoInternal extends FieldRepo {
	update<T>(entity: FieldEntity): State
}

const fieldRepo = (state: State): FieldRepoInternal => {
	return {
		getById: id => {
			const fieldState = state.fields.find(x => x.id === id)
			if(!fieldState)
				throw new Error('field not found')

			return new FieldEntity({
				state: fieldState,
				definition: {
					name: 'name',
					enabled: true,
					field: 'name',
				},
				dataContextRepo: dataContextRepo(state)
			})
		},
		update: entity => {
			const fields = state.fields.map(x => {
				if(x.id === entity.id)
					return x
				
				return entity.state
			})
			return {
				...state,
				fields
			}
		}
	}
}

type Action = UpdateFieldData | UpdateFieldEnabled

const reducer = (state: State = initial, action: AnyAction): State => {
	const a = action as Action
	switch(a.type) {
		case "updateFieldData": {
			const {id, data} = a
			const fields = fieldRepo(state)
			const field = fields.getById(id)
			const updatedContext = field.setValue(data)
			const dataContexts = dataContextRepo(state)
			return dataContexts.update(updatedContext)
		}
		case "updateFieldEnabled": {
			const {id, enabled} = a
			const fields = fieldRepo(state)
			const field = fields.getById(id)
			const updatedField = field.setEnabled(enabled)
			return fields.update(updatedField)
		}
		default: return state
	}
	return state
}

export default reducer
