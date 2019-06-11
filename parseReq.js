
let startLine = []

function parseStartLine (req) {
  req = req.split('\r\n')
  let startLine = req[0]
  startLine = startLine.split(' ')
  return [startLine, req.slice(1)]
}

module.exports = (request) => {
  request = parseStartLine(request)
  startLine = request[0]
  return {
    startLine
  }
}
