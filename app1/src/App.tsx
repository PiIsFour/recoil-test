import { Provider } from 'react-redux';
import './App.css';

import { SimpleCounter } from './components/SimpleCounter';
import { Counter } from './components/Counter';
import { store } from './store';
import { MockComponent } from './components/MockComponent';
import { createPage } from './state/actions/createPage';

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
		}
	},
	content: {
		fields: ['name', 'name', 'age', 'titel'],
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
				<header className="App-header">
					<SimpleCounter />
					<SimpleCounter />
					<Counter />
					<Counter />
					<MockComponent />
				</header>
			</div>
		</Provider>
	);
}

export default App;
