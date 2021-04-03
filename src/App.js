import React from 'react';
import { People } from './features/people/People';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { page: 1 }
	}

	handleClick = (e) => {
		e.preventDefault();
		this.setState({
			page: this.state.page+1
		});
	}

	render() {
		return (
			<div className="App">
				<People page={this.state.page}/>
				<button onClick={this.handleClick}>Next</button>
			</div>
		);
	}

}

export default App;
