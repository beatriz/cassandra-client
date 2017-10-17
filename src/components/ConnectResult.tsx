import React from 'react'

export interface ConnectResultProps {
  connected: boolean
  errorMessage: string
}

export class ConnectResult extends React.Component<ConnectResultProps, {}> {
  render () {
    const className = this.props.connected ? 'text-success' : 'text-danger'
    return <div className={className}>{this.props.connected ? 'Connected' : this.props.errorMessage}</div>
  }
}
