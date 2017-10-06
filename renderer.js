// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const cassandra = require('cassandra-driver');
const Store = require('./store.js');

function makeQuery()
{
    const client = new cassandra.Client({ 
        contactPoints: [document.myForm.contactpoint.value], 
        protocolOptions: { port: document.myForm.port.value } , 
        keyspace: document.myForm.keyspace.value });
    var query = document.myForm.query.value;
    console.log(query);
    client.execute(query)
        .then(result => { writeResults(result); })
        .catch(err => console.log(err));
}

function writeResults(res) {
    let print = '';
    if (res.rows) {
        for(let i = 0; i< res.rows.length; i++)
        {
            var columnName = res.columns[1].name;
            print += res.rows[i][columnName] + '\n';
        }
    } else {
        print = res.wasApplied ? 'applied' : 'not applied';
    }

    document.getElementById('result').innerText = print;
}