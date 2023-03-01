import type { AnyAction } from "@reduxjs/toolkit"
import { FieldEntity, FieldRepo } from "./entities/field"
import { DataContextEntity, DataContextRepo } from "./entities/dataContext"
import { reducer as actionsReducer } from './actions'
import type { State } from "./state"
import { codeBehindService } from "../store"
import { isFpObservable } from "./observable"

const initial: State = {
	fields: [],
	dataContexts: [],
	pageDefinition: undefined,
}

interface DataContextRepoInternal extends DataContextRepo {
	update(entity: DataContextEntity): State
	create(entity: DataContextEntity): State
}

export const dataContextRepo = (state: State): DataContextRepoInternal => {
	return {
		getById: (id: string) => {
			const data = state.dataContexts.find(x => x.id === id)
			if(!data)
				throw new Error('could not find dataContext')

			return new DataContextEntity(data)
		},
		update: (entity: DataContextEntity) => {
			const dataContexts = state.dataContexts.map(d => {
				if(d.id !== entity.id)
					return d

				return entity.state
			})
			return {
				...state,
				dataContexts
			}
		},
		create: entity => {
			const dataContexts = [...state.dataContexts, entity.state]
			return {
				...state,
				dataContexts
			}
		},
	}
}

interface FieldRepoInternal extends FieldRepo {
	update(entity: FieldEntity): State
	create(entity: FieldEntity): State
}

export const fieldRepo = (state: State): FieldRepoInternal => {
	return {
		getById: id => {
			const fieldState = state.fields.find(f => f.id === id.toString())
			if(!fieldState)
				throw new Error('field not found')
			
			const definition = state.pageDefinition?.fields[fieldState.definition]
			if(!definition)
				throw new Error('field definition not found')

			return new FieldEntity({
				state: fieldState,
				definition,
			})
		},
		getByName: name => {
			const fieldState = state.fields.find(f => f.definition === name)
			if(!fieldState)
				throw new Error('field not found')
			
			const definition = state.pageDefinition?.fields[fieldState.definition]
			if(!definition)
				throw new Error('field definition not found')

			return new FieldEntity({
				state: fieldState,
				definition,
			})
		},
		update: entity => {
			const fields = state.fields.map(f => {
				if(f.id !== entity.id)
					return f
				
				return entity.state
			})
			return {
				...state,
				fields
			}
		},
		create: entity => {
			const fields = [...state.fields, entity.state]
			return {
				...state,
				fields
			}
		},
	}
}

export const createContext = (state: State) => {
	const context: unknown = {
		'$fields': new Proxy(state, {
			has: (state, fieldName) => {
				if(typeof fieldName !== 'string')
					return false
				try {
					const fields = fieldRepo(state)
					fields.getByName(fieldName)
					return true
				} catch(e) {
					return false
				}
			},
			get: (state, fieldName) => {
				if(typeof fieldName !== 'string')
					return false
				const fields = fieldRepo(state)
				const field = fields.getByName(fieldName)
				const contexts = dataContextRepo(state)
				return {
					get value() {
						return field.getValue(contexts)
					},
					get enabled() {
						return field.getEnabled(context)
					}
				}
			}
		}) as unknown,
		'$properties': new Proxy(state, {
			has: (state, propName) => {
				if(typeof propName === 'symbol')
					return false
				
				return codeBehindService.hasProp(propName)
			},
			get: (state, propName) => {
				if(typeof propName === 'symbol')
					throw new Error(`$properties.${ String(propName) } does not exist`)

				if(!codeBehindService.hasProp(propName))
					throw new Error(`$properties.${ String(propName) } does not exist`)
				
				const prop = codeBehindService.getProp(propName)
				if(isFpObservable(prop))
					return prop.read()
				return prop
			}
		}) as unknown,
	}
	return context
}

const reducer = (state: State = initial, action: AnyAction): State => {
	return actionsReducer(state, action as any)
}

export default reducer
