import { Guid } from "guid-typescript"
import { useDispatch, useSelector } from "../hooks"
import { updateFieldData } from "../state/fieldActions"
import type { RootState } from "../store"

type Props = {
	id: Guid
}

const selectField = (id: Guid) => (state: RootState) => {
	const field = state.flexpage.fields.find(x => x.id === id)
	if(!field)
		throw new Error(`field with id [${ id }] does not exist`)
	
	return field
}

const selectDataContext = (id: Guid) => (state: RootState) => {
	const data = state.flexpage.dataContexts.find(x => x.id === id)
	if(!data)
		throw new Error('missing data context')

	return data
}

export const TextBox = ({ id }: Props) => {
	const field = useSelector(selectField(id))
	const data = useSelector(selectDataContext(field.dataContext))
	const value = (data.data as any)['name']
	const dispatch = useDispatch()

	return <input
		value={value}
		onChange={e => dispatch(updateFieldData(id, e.target.value))}
		disabled={!field.enabled}
	></input>
}