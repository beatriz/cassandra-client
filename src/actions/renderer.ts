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
