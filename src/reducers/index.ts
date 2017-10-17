import { combineReducers } from 'redux'
import { ConnectionReducer } from './cassandra'

const cassandraApp = combineReducers({ ConnectionReducer })

export default cassandraApp
