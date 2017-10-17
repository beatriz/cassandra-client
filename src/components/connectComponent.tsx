import React from 'react'
// import PropTypes from 'prop-types'

export interface ConnectComponentProps {
  connected: boolean
  errorMsg: string
  onConnectClick()
}

export class ConnectComponent extends React.Component<ConnectComponentProps, {}> {
  render() {
    const className = this.props.connected ? 'text-success' : 'text-danger'
    return(
      <div className='connectComponent'>
        <button type='button' onClick={this.props.onConnectClick()}>Connect</button>
        <div className={className}>{this.props.connected ? 'Connected' : this.props.errorMsg}</div>
      </div>
    )
  }
}
