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

function toPromise (fn) {
  return function (...args) {
    return new Promise(resolve => {
      fn(...args, (err, data) => resolve([err, data]))
    })
  }
}

const readFileP = toPromise(fs.readFile)

module.exports = async (req, res) => {
  let uri = req.startLine[1]

  if (uri === '/') uri += 'index.html'

  const [err, data] = await readFileP(path.join('./public', uri.slice(1)))

  if (err) {
    console.log(err)
    displayError(res)
  } else {
    res.header['Content-Type'] = mime.lookup(uri.slice(1))
    res.send(data, 200, 'OK')
  }
}
