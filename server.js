const net = require('net')
const parseRequest = require('./parseReq.js')
const createResponse = require('./createRes.js')
const staticHandler = require('./staticHandler.js')

async function requestHandler (data, socket) {
  console.log(data.toString())
  const request = parseRequest(data.toString())
  const response = createResponse('HTTP/1.1', socket)
  staticHandler(request, response)
}

const tcpServer = net.createServer((socket) => {
  console.log('connected...')
  socket.on('data', (data) => {
    requestHandler(data, socket)
  })
})

tcpServer.listen(5433, () => {
  console.log('server listening on port 5433')
})
