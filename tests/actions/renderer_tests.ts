import * as actions from '../../src/actions/connection'
import * as types from '../../src/constants'

describe('connection actions', () => {
  it('connect sould create CONNECT action', () => {
    expect(actions.connect()).toEqual({
      type: types.CONNECT
    })
  })

  it('connectionSuccess should create CONNECTION_SUCCESS action', () => {
    expect(actions.connectionSuccess()).toEqual({
      type: types.CONNECTION_SUCCESS
    })
  })

  it('connectionError should create CONNECTION_ERROR action', () => {
    expect(actions.connectionError('error message')).toEqual({
      type: types.CONNECTION_ERROR,
      error: 'error message'
    })
  })
})
