import { Provider } from 'react-redux';
import './App.css';

import { SimpleCounter } from './components/SimpleCounter';
import { Counter } from './components/Counter';
import { store } from './store';
import { MockComponent } from './components/MockComponent';
import { createdField } from './state/actions/createdField';
import { Guid } from 'guid-typescript';
import { FieldId } from './state/entities/field';
import { createdDataContext } from './state/actions/createdDataContext';
import { DataContextId } from './state/entities/dataContext';

// add test data
const testData = {
	id: Guid.raw() as DataContextId,
	data: {
		name: 'hello',
		age: '42',
		titel: 'test',
	}
}
store.dispatch(createdDataContext(testData.id, testData.data))

store.dispatch(createdField(Guid.raw() as FieldId, 'name', testData.id))
store.dispatch(createdField(Guid.raw() as FieldId, 'name', testData.id))
store.dispatch(createdField(Guid.raw() as FieldId, 'age', testData.id))
store.dispatch(createdField(Guid.raw() as FieldId, 'titel', testData.id))


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
