import { useSelector } from '../hooks'
import { TextBox } from './TextBox';

export const MockComponent = () => {
	const fields = useSelector(state => state.flexpage.fields)

	return <div className='mock-component'>
		{fields.map(({id, data}) => <TextBox key={id} id={id} />)}
	</div>
}
