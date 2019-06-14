const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

module.exports = (req, res) => {
  let uri = req.startLine[1]

  if (uri === '/') uri += 'index.html'
  res.header['Content-Type'] = mime.lookup(uri.slice(1))
  fs.readFile(path.join('./public', uri.slice(1)), (err, data) => {
    if (err) console.log(err)
    res.send(data)
  })
}
