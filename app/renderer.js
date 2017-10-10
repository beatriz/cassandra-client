"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var cassandra = require("cassandra-driver");
var store = require("electron-json-storage");
var electron = require("electron");
var path = require("path");
var form = document.getElementById('connection');
var contactPoints = form.elements["contactpoint"];
var port = form.elements["port"];
var keyspace = form.elements["keyspace"];
var query = form.elements["query"];
var result = document.getElementById('result');
var userDataPath = (electron.app || electron.remote.app).getPath('userData');
store.setDataPath(path.join(userDataPath, 'user-preferences'));
store.get('connection', function (err, data) {
    debugger;
    if (err)
        throw err;
    contactPoints.value = data.contactPoints;
    port.value = data.port;
    keyspace.value = data.keyspace;
});
function connect() {
    var client = new cassandra.Client({
        contactPoints: contactPoints.value.split(','),
        protocolOptions: { port: port.value }
    });
    client.connect(function (err) {
        if (err) {
            result.innerText = err;
        }
        result.innerText = 'connected successfully';
    });
    //   client.execute('SELECT * FROM system_schema.keyspaces')
    //     .then(res => { for (let i = 0; i < res.rows.length; i++) { result.innerText += res.rows[i].keyspace_name } })
}
function makeQuery() {
    var client = new cassandra.Client({
        contactPoints: contactPoints.value.split(','),
        protocolOptions: { port: port.value },
        keyspace: keyspace.value
    });
    store.set('connection', { contactPoints: contactPoints.value, port: port.value, keyspace: keyspace.value }, function (err) { if (err)
        throw err; });
    client.execute(query.value)
        .then(function (res) { writeResults(res); })
        .catch(function (err) { return console.log(err); });
}
function writeResults(res) {
    var print = '';
    if (res.rows) {
        print = createTable(res);
    }
    else {
        print = res.wasApplied ? 'applied' : 'not applied';
    }
    result.innerHTML = print;
}
function createTable(res) {
    return "<table class=\"table table-striped\">\n    " + createTableHead(res) + "\n    " + createTableBody(res) + "\n  </table>";
}
function createTableHead(res) {
    var head = '<thead><tr>';
    for (var i = 0; i < res.columns.length; i++) {
        head += "<th>" + res.columns[i].name + "</th>";
    }
    return head + '</tr></thead>';
}
function createTableBody(res) {
    var body = '<tbody>';
    for (var row = 0; row < res.rows.length; row++) {
        body += '<tr>';
        for (var cell = 0; cell < res.columns.length; cell++) {
            body += "<td>" + res.rows[row][res.columns[cell].name] + "</td>";
        }
        body += '</tr>';
    }
    return body + '</tbody>';
}
//# sourceMappingURL=renderer.js.map