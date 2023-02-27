import { shallowEqual, TypedUseSelectorHook, useDispatch as d, useSelector as s } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = d
export const useSelector: TypedUseSelectorHook<RootState> = selector => s(selector, shallowEqual)
