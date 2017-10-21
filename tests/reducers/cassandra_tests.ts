import { ConnectionReducer } from '../../src/reducers/connection'

describe('connection reducer', () => {
  it('should handle initial state', () => {
    let act = ConnectionReducer(undefined, undefined)
    expect(act.connected).toEqual(false)
    expect(act.isConnecting).toEqual(false)
    expect(act.connectionError).toEqual('')
  })
})
