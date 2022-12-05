import logo from './logo.svg';
import './App.css';

import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="/blog"
          rel="noopener noreferrer"
        >
          Blog
        </a>
        <a
          className="App-link"
          href="/pixel-tester"
          rel="noopener noreferrer"
        >
          Pixel Tester
        </a>
      </header>
    </div>
  );
}

export default App;
