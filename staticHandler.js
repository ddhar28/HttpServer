const fs = require('fs')
const path = require('path')

function toPromise (fn) {
  return function (...args) {
    return new Promise(resolve => {
      fn(...args, (err, data) => resolve([err, data]))
    })
  }
}

const readFileP = toPromise(fs.readFile)

module.exports = async (uri) => {
  if (uri === '/') uri += 'index.html'

  const [err, data] = await readFileP(path.join('./public', uri.slice(1)))

  if (err) {
    console.log(err)
    return false
  } else {
    return data
  }
}
