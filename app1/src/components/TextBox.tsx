import { useDispatch, useSelector } from "../hooks"
import { updateFieldData } from "../state/fieldActions"
import type { RootState } from "../store"

type Props = {
	id: string
}

const selectField = (id: string) => (state: RootState) => {
	const field = state.flexpage.fields.find(x => x.id === id)
	if(!field)
		throw new Error(`field with id [${ id }] does not exist`)
	
	return field
}

export const TextBox = ({ id }: Props) => {
	const field = useSelector(selectField(id))
	const dispatch = useDispatch()

	return <input
		value={field.data}
		onChange={e => dispatch(updateFieldData(id, e.target.value))}
		disabled={!field.enabled}
	></input>
}