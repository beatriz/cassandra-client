import React from 'react'
// import PropTypes from 'prop-types'

export interface ConnectBtnProps { onClick() }

export class ConnectBtn extends React.Component<ConnectBtnProps, {}> {
  render() {
    return(
    <button type='button' onClick={this.props.onClick()}>Connect</button>
    )
  }
}
