const fs = require('fs')
const path = require('path')
const toPromise = require('./promisify')
const mime = require('mime')

const readFileP = toPromise(fs.readFile)

module.exports = async (req, res) => {
  let uri = req.startLine[1]
  if (uri === '/') uri += 'index.html'

  const [err, data] = await readFileP(path.join(__dirname, '../public', uri.slice(1)))

  if (err) {
    return false
  } else {
    res.header['Content-Type'] = mime.getType(uri.slice(1))
    res.send(data, 200, 'OK')
    return true
  }
}
