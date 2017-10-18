import * as cassandra from 'cassandra-driver'
import * as constants from '../constants'

export interface ConnectionSuccess {
  type: constants.CONNECTION_SUCCESS
}

export interface ConnectionError {
  type: constants.CONNECTION_ERROR
  error: string
}

export interface Connect {
  type: constants.CONNECT
}

export type Actions = ConnectionSuccess | ConnectionError | Connect

export function connectionSuccess(): ConnectionSuccess {
  return {
    type: 'CONNECTION_SUCCESS'
  }
}

export function connectionError(error: string): ConnectionError {
  return {
    type: 'CONNECTION_ERROR',
    error: error
  }
}

export function connect(): Connect {
  return {
    type: 'CONNECT'
  }
}

export function doConnect(contactPoints: string, port: number) {
  return function(dispatch) {
    dispatch(connect())

    // cassandra library that returns a promise
    // and here I do an async await
    const client = new cassandra.Client({
      contactPoints: contactPoints.split(','),
      protocolOptions: { port: port }
    })
    client.connect((err: Error) => {
      if (err) {
        dispatch(connectionError(err.message))
        return
      }

      dispatch(connectionSuccess())
    })
  }
}
