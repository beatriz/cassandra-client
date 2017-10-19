import { Action } from '../actions/renderer'
import * as Types from '../constants/index'

export interface State {
  connected: boolean
  isConnecting: boolean
  connectionError: string
}

const initialState: State = {
  connected: false,
  isConnecting: false,
  connectionError: ''
}

export function ConnectionReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
  case Types.CONNECTION_SUCCESS:
    return {
      ...state,
      connected: true,
      isConnecting: false
    }

  case Types.CONNECTION_ERROR:
    return {
      ...state,
      connected: false,
      isConnecting: false,
      connectionError: action.error
    }
  case Types.CONNECT:
    return {
      ...state,
      connected: false,
      isConnecting: true
    }
  default:
    return state
  }
}
