import type { State } from "../state";
import { createdField, CreatedField, createdFieldReducer } from "./createdField";
import { updatedFieldData, UpdatedFieldData, updatedFieldDataReducer } from "./updatedFieldData";
import { UpdatedFieldEnabled, updatedFieldEnabled, updatedFieldEnabledReducer } from "./updatedFieldEnabled";

type Actions
	= UpdatedFieldEnabled
	| UpdatedFieldData
	| CreatedField

export const actions = {
	updatedFieldEnabled,
	updatedFieldData,
	createdField,
}

const reducers = {
	updatedFieldEnabled: updatedFieldEnabledReducer,
	updatedFieldData: updatedFieldDataReducer,
	createdField: createdFieldReducer,
}

export const reducer = (state: State, action: Actions) => {
	const { type } = action
	const reducer = reducers[type]
	if(!reducer)
		return state
		
	return reducer(state, action as any)
}