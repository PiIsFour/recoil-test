import { useSelector } from '../hooks'
import { TextBox } from './TextBox';

export const MockComponent = () => {
	const fieldIds = useSelector(state => state.flexpage.fields.map(({id}) => id))

	return <div className='mock-component'>
		{fieldIds.map(id => <TextBox key={id.toString()} id={id} />)}
	</div>
}
