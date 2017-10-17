import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import cassandraApp from './reducers'
import App from './components/App'

let store = createStore(cassandraApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-app')
)
