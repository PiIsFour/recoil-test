import { useDispatch, useSelector } from '../hooks'
import type { AppDispatch } from '../store'

import { getCount, increment } from './CounterSlice'

const wait = (ms: number) => new Promise(resolve => {
	setTimeout(resolve, ms)
})

export const Counter = () => {
	const count = useSelector(getCount)
	const dispatch = useDispatch()
	const incrementDouble = () => async (dispatch: AppDispatch) => {
		dispatch(increment())
		await wait(1000)
		dispatch(increment())
	}

	return <button onClick={() => dispatch(incrementDouble())}>Counter: { count }</button>
}
