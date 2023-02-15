import { configureStore } from '@reduxjs/toolkit'
import counter, { decrement, increment, incrementByAmount } from './components/CounterSlice'

export const store = configureStore({
  reducer: {
	counter,
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
