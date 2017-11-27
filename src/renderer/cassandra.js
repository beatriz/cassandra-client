const driver = require('cassandra-driver')

let connection

export function connect (contactPoints, port) {
  return new Promise((resolve, reject) => {
    connection = new driver.Client({ contactPoints: contactPoints.split(','), protocolOptions: { port: port } })
    connection.connect(err => {
      if (err) reject(err)
      resolve()
    })
  })
}
