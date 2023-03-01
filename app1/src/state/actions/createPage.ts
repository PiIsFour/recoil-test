import { Guid } from "guid-typescript"
import { AppDispatch, codeBehindService, RootState } from "../../store"
import { DataContextId } from "../entities/dataContext"
import { FieldId } from "../entities/field"
import type { PageDefinition } from "../state"
import { createdDataContext } from "./createdDataContext"
import { createField } from "./createdField"
import { loadedPageDefinition } from "./loadedPageDefinition"

export const createPage = (definition: PageDefinition) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	dispatch(loadedPageDefinition(definition))
	codeBehindService.loadPage()

	const contextId = Guid.raw() as DataContextId
	const {data, fields} = definition.content
	dispatch(createdDataContext(contextId, data))

	fields
		.map(field => definition.fields[field])
		.forEach(field => {
			if(!field)
				throw new Error('field not found')

			const fieldId = Guid.raw() as FieldId
			dispatch(createField(fieldId, field.name, contextId))
		})
}
