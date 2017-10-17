import * as cassandra from 'cassandra-driver'

export enum TypesEnum {
  CONNECT
}

export const connectionSuccess = () => {
  return {
    type: 'CONNECTION_SUCCESS'
  }
}

export const connectionError = error => {
  return {
    type: 'CONNECTION_ERROR',
    error: error
  }
}

export const connect = () => {
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
