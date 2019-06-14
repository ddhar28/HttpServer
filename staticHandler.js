const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

module.exports = (req, res) => {
  const uri = req.startLine[1]

  if (uri === '/') {
    res.header['Content-Type'] = mime.lookup('index.html')
    fs.readFile('./public/index.html', (err, data) => {
      if (err) console.log(err)
      res.send(data)
    })
  } else if (uri.slice(1) !== 'favicon.ico') {
    res.header['Content-Type'] = mime.lookup(uri.slice(1))
    fs.readFile(path.join('./public', uri.slice(1)), (err, data) => {
      if (err) console.log(err)
      res.send(data)
    })
  }
}
