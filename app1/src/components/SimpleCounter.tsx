import { useState } from "react"

export const SimpleCounter = () => {
	const [counter, setCounter] = useState(0)
	return <button onClick={() => setCounter(c => c + 1)}>SimpleCount: { counter }</button>
}