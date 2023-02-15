import { Provider } from 'react-redux';
import './App.css';

import { SimpleCounter } from './components/SimpleCounter';
import { Counter } from './components/Counter';
import { store } from './store';
import { useSelector } from './hooks'
import { TextBox } from './components/TextBox';

const MockComponent = () => {
	const fields = useSelector(state => state.flexpage.fields)
	return <div className='mock-component'>
		{fields.map(({id, data}) => <TextBox key={id} id={id} />)}
	</div>
}

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
