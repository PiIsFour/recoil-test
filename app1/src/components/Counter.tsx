import { useDispatch, useSelector } from 'react-redux'

import { getCount, increment } from './CounterSlice'


export const Counter = () => {
	const count = useSelector(getCount)
	const dispatch = useDispatch()

	return <button onClick={() => dispatch(increment())}>Counter: { count }</button>
}
