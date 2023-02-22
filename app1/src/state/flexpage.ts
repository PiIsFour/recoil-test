import type { AnyAction } from "@reduxjs/toolkit"
import { FieldEntity, FieldRepo, FieldState } from "./entities/field"
import { Guid } from "guid-typescript"
import { DataContextEntity, DataContextRepo, DataContextState } from "./entities/dataContext"
import { reducer as actionsReducer } from './actions'

export type State = {
	fields: FieldState[]
	dataContexts: DataContextState<unknown>[]
}

const data = {
	id: Guid.raw(),
	data: {
		name: 'hello'
	}
} satisfies DataContextState<unknown>

const initial: State = {
	fields: [{
		id: Guid.raw(),
		dataContext: data.id,
		enabled: true
	}],
	dataContexts: [data]
}

interface DataContextRepoInternal extends DataContextRepo {
	update<T>(entity: DataContextEntity<T>): State
}

export const dataContextRepo = (state: State): DataContextRepoInternal => {
	return {
		getById: <T>(id: string) => {
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
	update(entity: FieldEntity): State
}

export const fieldRepo = (state: State): FieldRepoInternal => {
	return {
		getById: id => {
			const fieldState = state.fields.find(x => x.id === id.toString())
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

const reducer = (state: State = initial, action: AnyAction): State => {
	return actionsReducer(state, action as any)
}

export default reducer
