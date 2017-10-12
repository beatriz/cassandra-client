import React from 'react'
import ReactDOM from 'react-dom'
import * as cassandra from 'cassandra-driver'

class ConnectionForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { 
      contactPoints: "",
      port: "",
      result: "" 
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    connectToCassandra(this.state.title)
    event.preventDefault()
  }

  handleKeyUp(event) {
    if (event.keyCode == 116) console.log('F5 pressed')
  }
  
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit} onKeyUp={this.handleKeyUp}>
        <div className="form-group">
          <label>Contact points: </label>
          <input
           type="text" 
           className="form-control" 
           name="contactpoint" 
           value={this.state.contactPoints}
           onChange={this.handleChange} />
          <small className="form-text text-muted">Separate multiple contact points with comma (,)</small>
        </div>
        <div className="form-group">
          <label>Port: </label>
          <input 
          type="text" 
          className="form-control" 
          name="port"
          value={this.state.port}
           onChange={this.handleChange} />
        </div>
        <input type="submit" value="Connect" />
      </form>
      {this.state.result}
    </div>      
    )
  }
}

function connectToCassandra(contactPoints: string) {
    const client = new cassandra.Client({
    contactPoints: contactPoints.split(','),
    protocolOptions: { port: 9042 }
  })

  client.connect((err: any) => {
    if (err) return err

    return 'connected successfully'
  })
}

// var connection = { contactPoints: "", port: "", keyspace: "" };

ReactDOM.render(
  React.createElement(ConnectionForm),
  document.getElementById('react-app')
)