// https://github.com/Microsoft/TypeScript-React-Starter/tree/master/src/reducers
const initialState = {
  connected: false,
  isConnecting: false,
  connectionError: ''
}

export function ConnectionReducer(state = initialState, action) {
  switch (action.type) {
  case 'CONNECTION_SUCCESS':
    return {
      ...state,
      connected: true,
      isConnecting: false
    }

  case 'CONNECTION_ERROR':
    return {
      ...state,
      connected: false,
      isConnecting: false,
      connectionError: action.error
    }
  case 'CONNECT':
    return {
      ...state,
      connected: false,
      isConnecting: true
    }
  default:
    return state
  }
}
