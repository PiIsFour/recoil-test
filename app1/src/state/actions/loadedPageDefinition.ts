import type { PageDefinition, State } from "../state"

export type LoadedPageDefinition = {
	type: 'loadedPageDefinition',
	definition: PageDefinition,
}

export const loadedPageDefinition = (definition: PageDefinition): LoadedPageDefinition => {
	return {
		type: 'loadedPageDefinition',
		definition,
	}
}

export const loadedPageDefinitionReducer = (state: State, {definition}: LoadedPageDefinition) => {
	return {
		...state,
		pageDefinition: definition
	}
}
