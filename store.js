const electron = require('electron')
const path = require('path')
const fs = require('fs')

class Store {
  constructor (opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, opts.configName + '.json')
    console.log(this.path)

    this.data = parseDataFile(this.path, opts.defaults)
  }

  get (key) {
    return this.data[key]
  }

  set (key, val) {
    this.data[key] = val

    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}

function parseDataFile (filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (error) {
    return defaults
  }
}

module.exports = Store
