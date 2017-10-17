import { connect } from 'react-redux'
import { connectionSuccess } from '../actions/renderer'
import { ConnectComponent } from '../components/connectComponent'

const mapStateToProps = state => {
  return {
    connected: state.connection.connected,
    errorMsg: state.connection.connectionError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConnectClick: () => {
      dispatch(connectionSuccess())
    }
  }
}

const ConnectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectComponent)

export default ConnectContainer
