import { Provider } from 'react-redux';
import './App.css';

import { SimpleCounter } from './components/SimpleCounter';
import { Counter } from './components/Counter';
import { store } from './store';
import { MockComponent } from './components/MockComponent';
import { createPage } from './state/actions/createPage';

import xxx from 'vue-playground'
import { useEffect, useRef } from 'react';

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
	const element = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		console.log(element.current)
		xxx.render(element.current as Element)
	}, [])
	return (
		<Provider store={store}>
			<div className="App">
				<header className="App-header">
					<SimpleCounter />
					<SimpleCounter />
					<Counter />
					<Counter />
					<MockComponent />
					<div ref={element} />
				</header>
			</div>
		</Provider>
	);
}

export default App;
