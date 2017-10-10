// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as cassandra from 'cassandra-driver'
import * as store from 'electron-json-storage'
import * as electron from 'electron'
import * as path from 'path'

const form = (document.getElementById('connection') as HTMLFormElement);

const contactPoints = form.elements["contactpoint"]
const port = form.elements["port"]
const keyspace = form.elements["keyspace"]
const query = form.elements["query"]
const result = document.getElementById('result')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
store.setDataPath(path.join(userDataPath, 'user-preferences'))

store.get('connection', (err, data) => {
  debugger;
  if (err) throw err
  contactPoints.value = data.contactPoints
  port.value = data.port
  keyspace.value = data.keyspace
})

function connect () {
  const client = new cassandra.Client({
    contactPoints: contactPoints.value.split(','),
    protocolOptions: { port: port.value }
  })

  client.connect((err) => {
    if (err) {
      result.innerText = err
    }

    result.innerText = 'connected successfully'
  })

//   client.execute('SELECT * FROM system_schema.keyspaces')
//     .then(res => { for (let i = 0; i < res.rows.length; i++) { result.innerText += res.rows[i].keyspace_name } })
}

function makeQuery () {
  const client = new cassandra.Client({
    contactPoints: contactPoints.value.split(','),
    protocolOptions: { port: port.value },
    keyspace: keyspace.value })

  store.set('connection', { contactPoints: contactPoints.value, port: port.value, keyspace: keyspace.value }, (err) => { if (err) throw err })
  client.execute(query.value)
      .then(res => { writeResults(res) })
      .catch(err => console.log(err))
}

function writeResults (res) {
  let print = ''
  if (res.rows) {
    print = createTable(res)
  } else {
    print = res.wasApplied ? 'applied' : 'not applied'
  }

  result.innerHTML = print
}

function createTable (res) {
  return `<table class="table table-striped">
    ${createTableHead(res)}
    ${createTableBody(res)}
  </table>`
}

function createTableHead (res) {
  let head = '<thead><tr>'
  for (let i = 0; i < res.columns.length; i++) {
    head += `<th>${res.columns[i].name}</th>`
  }

  return head + '</tr></thead>'
}

function createTableBody (res) {
  let body = '<tbody>'
  for (let row = 0; row < res.rows.length; row++) {
    body += '<tr>'
    for (let cell = 0; cell < res.columns.length; cell++) {
      body += `<td>${res.rows[row][res.columns[cell].name]}</td>`
    }
    body += '</tr>'
  }
  return body + '</tbody>'
}
