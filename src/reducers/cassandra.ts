
const initialState = {
  connected: false,
  connectionError: ''
}

export function ConnectionReducer(state = initialState, action) {
  switch (action.type) {
  case 'CONNECTION_SUCCESS':
    return {
      ...state,
      connected: true
    }

  case 'CONNECTION_ERROR':
    return {
      ...state,
      connected: false,
      connectionError: action.error
    }
  default:
    return state
  }
}
