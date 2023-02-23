import { useDispatch, useSelector } from "../hooks"
import { updatedFieldData } from "../state/actions/updatedFieldData"
import { FieldId } from "../state/entities/field"
import { createContext, dataContextRepo, fieldRepo } from "../state/flexpage"
import type { RootState } from "../store"

type Props = {
	id: FieldId
}

const selectField = (id: FieldId) => (state: RootState) => {
	const fields = fieldRepo(state.flexpage)
	const contexts = dataContextRepo(state.flexpage)
	const field = fields.getById(id)
	return [field.getValue(contexts), field.getEnabled(createContext(state.flexpage))] as const
}

export const TextBox = ({ id }: Props) => {
	const [value, enabled] = useSelector(selectField(id))
	const dispatch = useDispatch()

	return <input
		value={value}
		onChange={e => dispatch(updatedFieldData(id, e.target.value))}
		disabled={!enabled}
	></input>
}