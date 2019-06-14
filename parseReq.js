
function parseStartLine (req) {
  req = req.split('\r\n')
  let startLine = req[0]
  startLine = startLine.split(' ')
  return [startLine, req.slice(1)]
}

function parseHeader (req) {
  let header = {}
  let field = []
  while (req.length) {
    field = req[0].split(/:(.+)/)
    header[field[0]] = field[1]
    req = req.slice(1)
  }
  return header
}

function parseBody (req, contentLength) {
  let body = ''
  while (contentLength > 0) {
    body += req[0]
    req = req.slice(1)
    contentLength--
  }
  return body
}

module.exports = (request) => {
  request = request.split('\r\n\r\n')
  const reqStart = parseStartLine(request[0])
  const startLine = reqStart[0]
  const header = parseHeader(reqStart[1])
  const body = parseBody(request[1], header['Content-Length'])

  return {
    startLine,
    header,
    body
  }
}
