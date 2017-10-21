import { combineReducers } from 'redux'
import { ConnectionReducer } from './connection'

const cassandraApp = combineReducers({
  connection: ConnectionReducer
})

export default cassandraApp
