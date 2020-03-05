import React from 'react';
import logo from './logo.svg';
import './App.scss';
import GetBitCoin from './components/getBitcoin/GetBitcoin'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      
       
      </header>
      <GetBitCoin></GetBitCoin>
    </div>
  );
}

export default App;
