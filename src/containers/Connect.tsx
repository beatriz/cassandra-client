import { connect } from 'react-redux'
import { doConnect, Action } from '../actions/connection'
import { ConnectComponent } from '../components/connection'
import { Dispatch } from 'redux'

function mapStateToProps(state) {
  return {
    connected: state.connection.connected,
    errorMsg: state.connection.connectionError,
    isConnecting: state.connection.isConnecting
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    onConnectClick: (contactPoints, port) => dispatch(doConnect(contactPoints, port))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectComponent)
