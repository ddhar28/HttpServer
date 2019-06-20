const fs = require('fs')
const path = require('path')
const toPromise = require('./promisify')

const readFileP = toPromise(fs.readFile)

module.exports = async function (req, res) {
  const [err, data] = await readFileP(path.join(__dirname, '../public/error.html'))

  if (err) {
    return false
  } else {
    res.header['Content-Type'] = 'text/html'
    res.send(data, 404, 'Not found')
    return true
  }
}