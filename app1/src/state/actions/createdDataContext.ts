import { DataContextEntity, DataContextId } from "../entities/dataContext"
import { dataContextRepo } from "../flexpage"
import type { State } from "../state"

export type CreatedDataContext = {
	type: 'createdDataContext',
	id: DataContextId,
	data: unknown,
}

export const createdDataContext = (id: DataContextId, data: unknown): CreatedDataContext => {
	return {
		type: 'createdDataContext',
		id,
		data,
	}
}

export const createdDataContextReducer = (state: State, {id, data}: CreatedDataContext) => {
	const contexts = dataContextRepo(state)
	const context = new DataContextEntity({
		id,
		data,
	})
	const updated = contexts.create(context)
	return updated
}
