import React from 'react'

export interface ConnectComponentProps {
  connected: boolean
  isConnecting: boolean
  errorMsg: string
  onConnectClick: (contactPoints, port) => {}
}

export interface ConnectComponentState {
  contactPoints: string
  port: number
}

export class ConnectComponent extends React.Component<ConnectComponentProps, ConnectComponentState> {
  constructor(props) {
    super(props)
    this.state = {
      contactPoints: '',
      port: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onConnectClick(this.state.contactPoints, this.state.port)
  }

  render() {
    const className = this.props.isConnecting ? 'text-warning' : this.props.connected ? 'text-success' : 'text-danger'
    return(
      <div className='connectComponent'>
        <form onSubmit={this.handleSubmit}>
          <input name='contactPoints' type='text' onChange={this.handleInputChange} value={this.state.contactPoints} />
          <input name='port' type='text' onChange={this.handleInputChange} value={this.state.port} />
          <input type='submit' value='Connect' />
          <div className={className}>{this.props.isConnecting ? 'connecting' : this.props.connected ? 'Connected' : this.props.errorMsg}</div>
        </form>
      </div>
    )
  }
}
