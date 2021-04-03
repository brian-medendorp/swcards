import React from 'react';
import { People } from './features/people/People';
import './App.css';

function App() {
	const page = 1;
  return (
    <div className="App">
      <People page={page}/>
    </div>
  );
}

export default App;
