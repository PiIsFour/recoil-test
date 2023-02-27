import type { State } from "../state";
import { createdDataContext, CreatedDataContext, createdDataContextReducer } from "./createdDataContext";
import { createdField, CreatedField, createdFieldReducer } from "./createdField";
import { updatedFieldData, UpdatedFieldData, updatedFieldDataReducer } from "./updatedFieldData";
import { UpdatedFieldEnabled, updatedFieldEnabled, updatedFieldEnabledReducer } from "./updatedFieldEnabled";

type Actions
	= UpdatedFieldEnabled
	| UpdatedFieldData
	| CreatedField
	| CreatedDataContext

export const actions = {
	updatedFieldEnabled,
	updatedFieldData,
	createdField,
	createdDataContext
}

const reducers = {
	updatedFieldEnabled: updatedFieldEnabledReducer,
	updatedFieldData: updatedFieldDataReducer,
	createdField: createdFieldReducer,
	createdDataContext: createdDataContextReducer,
}

export const reducer = (state: State, action: Actions) => {
	const { type } = action
	const reducer = reducers[type]
	if(!reducer)
		return state
		
	return reducer(state, action as any)
}