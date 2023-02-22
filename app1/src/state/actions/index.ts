import { State } from "../flexpage";
import { updateFieldData, UpdateFieldData, updateFieldDataReducer } from "./updateFieldData";
import { UpdateFieldEnabled, updateFieldEnabled, updateFieldEnabledReducer } from "./updateFieldEnabled";

type Actions
	= UpdateFieldEnabled
	| UpdateFieldData

export const actions = {
	updateFieldEnabled,
	updateFieldData,
}

const reducers = {
	updateFieldEnabled: updateFieldEnabledReducer,
	updateFieldData: updateFieldDataReducer
}

export const reducer = (state: State, action: Actions) => {
	const { type } = action
	const reducer = reducers[type]
	if(!reducer)
		return state
		
	return reducer(state, action as any)
}