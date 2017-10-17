import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import cassandraApp from './reducers'
import App from './components/App'

const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__

let store = createStore(cassandraApp, extension && extension())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-app')
)
