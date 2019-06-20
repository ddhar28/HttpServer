const staticHandler = require('./staticHandler.js')
const fs = require('fs')
const mime = require('mime-types')

function displayError (res) {
  fs.readFile('./public/error.html', (err, data) => {
    if (err) console.log(err)
    res.header['Content-Type'] = 'text/html'
    res.send(data, 404, 'Not found')
  })
}

async function fileHandler (uri, res) {
  const data = await staticHandler(uri)
  if (!data) return false
  else {
    res.header['Content-Type'] = mime.lookup(uri.slice(1))
    res.send(data, 200, 'OK')
    return true
  }
}

let getRoutes = {}

module.exports = {
  get: (uri, handler) => {
    getRoutes[uri] = handler
    console.log(getRoutes)
  },
  execute: async function (req, res) {
    const uri = req.startLine[1]
    let isStatic = await fileHandler(uri, res)

    if (getRoutes[uri] === undefined && !isStatic) {
      console.log('route not found')
      displayError(res)
    } else {
      getRoutes[uri](req, res)
    }
  }
}
