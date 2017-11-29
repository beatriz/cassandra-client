const driver = require('cassandra-driver')

let client

export function connect (contactPoints, port) {
  return new Promise((resolve, reject) => {
    client = new driver.Client({ contactPoints: contactPoints.split(','), protocolOptions: { port: port } })
    client.connect(err => {
      if (err) reject(err)
      resolve()
    })
  })
}

export function getKeyspaces () {
  client.keyspace = 'system_schema'
  return client.execute('select keyspace_name from keyspaces')
}

export function getKeyspaceInfo (keyspace) {
  const query = 'select keyspace_name, table_name from tables where keyspace_name = ?'
  return executePreparedQuery('system_schema', query, [keyspace])
}

function executePreparedQuery (keyspace, query, params) {
  client.keyspace = keyspace
  return client.execute(query, params, {prepare: true})
}
