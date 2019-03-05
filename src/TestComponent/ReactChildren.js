import React, { Component } from 'react'
import TReact from '../TReact'

export default class ReactChildren extends Component {
  componentDidMount() {
    const TReactEle1 = {
      $$typeof: 'TReact-element',
      val: 1,
    }
    const TReactEle2 = {
      $$typeof: 'TReact-element',
      val: 2,
    }
    const result = TReact.Children.map([TReactEle1, TReactEle2], c => [
      c,
      [[c]],
      c,
    ])
    // const result = TReact.Children.map(TReactEle1, c => c)
    // const result = TReact.Children.map([TReactEle1, TReactEle2], c => c)
    // const result = TReact.Children.map(TReactEle1, c => [c, [c]])
    console.info('#', result)
  }
  render() {
    return (
      <div className="App">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}
