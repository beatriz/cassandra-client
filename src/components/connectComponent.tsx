import React from 'react'
// import PropTypes from 'prop-types'

export interface ConnectComponentProps {
  connected: boolean
  isConnecting: boolean
  errorMsg: string
  onConnectClick: (e) => {}
}

export class ConnectComponent extends React.Component<ConnectComponentProps, {}> {
  render() {
    const className = this.props.isConnecting ? 'text-warning' : this.props.connected ? 'text-success' : 'text-danger'
    return(
      <div className='connectComponent'>
        <button type='button' onClick={this.props.onConnectClick}>Connect</button>
        <div className={className}>{this.props.isConnecting ? 'connecting' : this.props.connected ? 'Connected' : this.props.errorMsg}</div>
      </div>
    )
  }
}
