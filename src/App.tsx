import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './Grid';

function App() {
  return (
    <div className="App">
      <Grid numberOfRows={15} numberOfElements={30}/>
    </div>
  );
}

export default App;
