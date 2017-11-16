import React, { Component } from 'react'
import Slider from './Slider'
require('./style.scss')

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Slider />
      </div>
    )
  }
}
