import React from 'react'
// import PropTypes from 'prop-types'

export interface ConnectComponentProps {
  connected: boolean
  isConnecting: boolean
  errorMsg: string
  onConnectClick: (contactPoints, port) => {}
}

export class ConnectComponent extends React.Component<ConnectComponentProps, {contactPoints, port}> {
  constructor(props) {
    super(props)
    this.state = {
      contactPoints: '',
      port: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick() {
    this.props.onConnectClick(this.state.contactPoints, this.state.port)
  }

  render() {
    const className = this.props.isConnecting ? 'text-warning' : this.props.connected ? 'text-success' : 'text-danger'
    return(
      <div className='connectComponent'>
        <form>
          <input name='contactPoints' type='text' onChange={this.handleInputChange} value={this.state.contactPoints} />
          <input name='port' type='text' onChange={this.handleInputChange} value={this.state.port} />
          <button type='button' onClick={this.handleClick}>Connect</button>
          <div className={className}>{this.props.isConnecting ? 'connecting' : this.props.connected ? 'Connected' : this.props.errorMsg}</div>
        </form>
      </div>
    )
  }
}
