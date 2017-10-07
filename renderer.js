// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const cassandra = require('cassandra-driver')
const store = require('electron-json-storage')
const electron = require('electron')
const path = require('path')

const contactPoints = document.myForm.contactpoint
const port = document.myForm.port
const keyspace = document.myForm.keyspace
const query = document.myForm.query
const result = document.getElementById('result')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
store.setDataPath(path.join(userDataPath, 'user-preferences'))

store.get('connection', (err, data) => {
  if (err) throw err
  contactPoints.value = data.contactPoints
  port.value = data.port
  keyspace.value = data.keyspace
})

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
