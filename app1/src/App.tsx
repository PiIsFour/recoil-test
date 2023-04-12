import { Provider } from 'react-redux';
import './App.css';

import { SimpleCounter } from './components/SimpleCounter';
import { Counter } from './components/Counter';
import { store } from './store';
import { MockComponent } from './components/MockComponent';
import { createPage } from './state/actions/createPage';

import { mine } from 'vue-playground'
import { Counter as MyCounter } from 'react-lib'
import { useEffect, useRef } from 'react';
import { hello } from 'web-ui.core/dist/src/hello'

const wrapVue = (component: {render: (root: Element) => () => void}) =>
	() => {
		const element = useRef<HTMLDivElement | null>(null)
		useEffect(() => {
			return mine.render(element.current as Element)
		}, [])

		return <div ref={element} />
	}

const Mine = wrapVue(mine)

// add test data
store.dispatch(createPage({
	fields: {
		'name': {
			name: 'name',
			enabled: true,
			field: 'name',
		},
		'age': {
			name: 'age',
			enabled: "{{ $fields.name.value }} === 'hello'",
			field: 'age',
		},
		'titel': {
			name: 'titel',
			enabled: "!{{ $fields.age.enabled }}",
			field: 'titel',
		},
		'name2': {
			name: 'name2',
			enabled: "{{ $properties.enabled }}",
			field: 'name',
		}
	},
	content: {
		fields: ['name', 'name', 'age', 'titel', 'name2'],
		data: {
			name: 'hello',
			age: '42',
			titel: 'test',
		}
	}
}))

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				{hello('world')}
				<header className="App-header">
					<SimpleCounter />
					<SimpleCounter />
					<Counter />
					<Counter />
					<MockComponent />
					<Mine />
					<MyCounter />
				</header>
			</div>
		</Provider>
	);
}

export default App;
