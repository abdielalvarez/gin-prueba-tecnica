import React, { Component } from 'react'
import Home from './containers/Home';
import './assets/styles/App.scss'

class App extends Component {
  render() {
    return (
      <div className='app_container'>
        <Home />
      </div>
    )
  }
}

export default App

