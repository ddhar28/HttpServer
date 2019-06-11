const net = require('net')
const parseRequest = require('./parseReq.js')
const createResponse = require('./createRes.js')

const tcpServer = net.createServer((socket) => {
  console.log('connected...')

  socket.on('data', (data) => {
    let message = parseRequest(data.toString()).startLine[1].slice(1)
    let response = createResponse('HTTP/1.1', 200, 'OK', message)
    console.log(response)
    socket.write(response)
  })
})

tcpServer.listen(5433, () => {
  console.log('server listening on port 5433')
})
