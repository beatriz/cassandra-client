import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import cassandraApp from './reducers'
import App from './components/App'

const loggerMiddleware = createLogger()

const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__

let store = createStore(cassandraApp,
  extension && extension(),
  applyMiddleware(ThunkMiddleware, loggerMiddleware))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-app')
)
