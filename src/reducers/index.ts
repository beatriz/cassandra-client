import { combineReducers } from 'redux'
import { ConnectionReducer } from './cassandra'

const cassandraApp = combineReducers({
  connection: ConnectionReducer
})

export default cassandraApp
