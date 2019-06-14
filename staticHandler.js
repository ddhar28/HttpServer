const fs = require('fs')
// const methods = ['GET', 'POST']

module.exports = (req, res) => {
  const uri = req.startLine[1]

  if (uri === '/') {
    fs.readFile('./public/index.html', 'utf-8', (err, data) => {
      if (err) console.log(err)
      res.send(data.toString())
    })
  }
  res.header['Content-Type'] = 'text/html'
}
