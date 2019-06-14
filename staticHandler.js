const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

function displayError (res) {
  fs.readFile('./public/error.html', (err, data) => {
    if (err) console.log(data)
    res.header['Content-Type'] = 'text/html'
    res.send(data, 404, 'Not found')
  })
}

module.exports = (req, res) => {
  let uri = req.startLine[1]

  if (uri === '/') uri += 'index.html'
  fs.readFile(path.join('./public', uri.slice(1)), (err, data) => {
    if (err) {
      console.log(err)
      displayError(res)
    } else {
      res.header['Content-Type'] = mime.lookup(uri.slice(1))
      res.send(data, 200, 'OK')
    }
  })
}
