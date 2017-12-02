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

export function getTables (keyspace) {
  const query = 'select keyspace_name, table_name from tables where keyspace_name = ?'
  return executePreparedQuery('system_schema', query, [keyspace])
}

export function getViews (keyspace) {
  const query = 'select * from views where keyspace_name = ?'
  return executePreparedQuery('system_schema', query, [keyspace])
}

export function getColumns (keyspace, table) {
  const query = 'select * from columns where keyspace_name=? and table_name=?'
  return executePreparedQuery('system_schema', query, [keyspace, table])
}

function executePreparedQuery (keyspace, query, params) {
  client.keyspace = keyspace
  return client.execute(query, params, {prepare: true})
}
