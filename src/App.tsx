import './App.css';
import { ClickCounterUI } from './components/ClickCounterUI/ClickCounterUI';
import { ClickCounterAPI } from './components/ClickCounterAPI/ClickCounterAPI';

function App() {
	return (
		<div id="app">
			<h1 id="app-header">Welcome to Click Counter!</h1>

			<div id="click-counters">
				<ClickCounterUI/>
				<ClickCounterAPI name="Azure" endpoint="FnClickCounter"/>
			</div>
		</div>
	);
}

export default App;
