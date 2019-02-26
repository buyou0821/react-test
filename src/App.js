import React, { Component } from 'react'
import TReact from './TReact'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  componentDidMount() {
    const TReactEle1 = {
      $$typeof: 'TReact-element',
      val: 1,
    }
    const TReactEle2 = {
      $$typeof: 'TReact-element',
      val: 2,
    }
    const result = TReact.Children.map([TReactEle1, TReactEle2], c => [c, c, c])
    console.info('@result: ', result)
  }
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
      </div>
    )
  }
}

export default App
