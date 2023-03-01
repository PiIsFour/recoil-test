import { configureStore } from '@reduxjs/toolkit'
import counter, { decrement, increment, incrementByAmount } from './components/CounterSlice'
import { CodeBehindService } from './state/codeBehindService'
import flexpage from './state/flexpage'
import { SubscriptionService } from './state/subscriptionService'

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

export const codeBehindService = new CodeBehindService()
export const subscriptionService = new SubscriptionService()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
