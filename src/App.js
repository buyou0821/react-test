import React, { Component } from 'react'
import TReact from './TReact'
import logo from './logo.svg'
import './App.css'
import ReactChildren from './TestComponent/ReactChildren'

class App extends Component {
  render() {
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
        </header>
        <div>{/* <ReactChildren /> */}</div>
      </div>
    )
  }
}

export default App
