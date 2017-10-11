// import React from 'react'
// import ReactDOM from 'react-dom'

// ReactDOM.render(
//   <div>Node version: {process.versions.node}</div>,
//   document.getElementsByTagName('body')[0])

  // This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as cassandra from 'cassandra-driver'
// import * as store from 'electron-json-storage'
// import * as electron from 'electron'
// import * as path from 'path'

const form = (document.getElementById('connection') as HTMLFormElement)

const contactPoints = form.elements['contactpoint']
const port = form.elements['port']
const keyspace = form.elements['keyspace']
const query = form.elements['query']
const result = document.getElementById('result')

// const userDataPath = (electron.app || electron.remote.app).getPath('userData')
// store.setDataPath(path.join(userDataPath, 'user-preferences'))

// store.get('connection', (err, data: Connection) => {
//   debugger
//   if (err) throw err
//   contactPoints.value = data.contactPoints
//   port.value = data.port
//   keyspace.value = data.keyspace
// })

document.getElementById('connectbtn').addEventListener('click', () => connect())
document.getElementById('querybtn').addEventListener('click', () => makeQuery())

function connect () {
  const client = new cassandra.Client({
    contactPoints: contactPoints.value.split(','),
    protocolOptions: { port: port.value }
  })

  client.connect((err: any) => {
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

  // store.set('connection', { contactPoints: contactPoints.value, port: port.value, keyspace: keyspace.value }, (err) => { if (err) throw err })
  client.execute(query.value)
      .then((res: any) => { writeResults(res) })
      .catch((err: any) => console.log(err))
}

function writeResults (res: any) {
  let print = ''
  if (res.rows) {
    print = createTable(res)
  } else {
    print = res.wasApplied ? 'applied' : 'not applied'
  }

  result.innerHTML = print
}

function createTable (res: any) {
  return `<table class="table table-striped">
    ${createTableHead(res)}
    ${createTableBody(res)}
  </table>`
}

function createTableHead (res: any) {
  let head = '<thead><tr>'
  for (let i = 0; i < res.columns.length; i++) {
    head += `<th>${res.columns[i].name}</th>`
  }

  return head + '</tr></thead>'
}

function createTableBody (res: any) {
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

// class Connection {
//   contactPoints: string[]
//   port: number
//   keyspace: string
// }
