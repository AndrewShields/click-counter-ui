import './App.css';
import { ClickCounterUI } from './components/ClickCounterUI/ClickCounterUI';
import { ClickCounterAPI } from './components/ClickCounterAPI/ClickCounterAPI';
import { ClickCounterAPIAzure } from './components/ClickCounterAPIAzure/ClickCounterAPIAzure';

function App() {
	return (
		<div id="app">
			<h1 id="app-header">Welcome to click counter!</h1>

			<div id="click-counters">
				<ClickCounterUI/>
				{/*<ClickCounterAPI/>*/}
				<ClickCounterAPIAzure/>
			</div>
		</div>
	);
}

export default App;
