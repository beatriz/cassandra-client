import { connect } from 'react-redux'
import { doConnect } from '../actions/renderer'
import { ConnectComponent } from '../components/connectComponent'

const mapStateToProps = (state) => {
  return {
    connected: state.connection.connected,
    errorMsg: state.connection.connectionError,
    isConnecting: state.connection.isConnecting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConnectClick: (contactPoints, port) => {
      dispatch(doConnect(contactPoints, port))
    }
  }
}

const ConnectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectComponent)

export default ConnectContainer
