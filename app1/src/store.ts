import { configureStore } from '@reduxjs/toolkit'
import counter, { decrement, increment, incrementByAmount } from './components/CounterSlice'
import flexpage from './state/flexpage'

export const store = configureStore({
	reducer: {
		counter,
		flexpage,
	},
	devTools: {
		actionCreators: {
			increment,
			decrement,
			incrementByAmount,
		}
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
