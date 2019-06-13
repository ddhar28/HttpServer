const net = require('net')
const parseRequest = require('./parseReq.js')
const createResponse = require('./createRes.js')

function requestHandler (data) {
  let request = parseRequest(data)
  let response = createResponse('HTTP/1.1', 200, 'OK')
  let body = request.startLine[1].slice(1)

  return response.send(body)
}

const tcpServer = net.createServer((socket) => {
  console.log('connected...')
  socket.on('data', (data) => {
    let response = requestHandler(data.toString())
    // console.log(response)
    socket.write(response)
  })
})

tcpServer.listen(5433, () => {
  console.log('server listening on port 5433')
})
