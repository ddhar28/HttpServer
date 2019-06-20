const net = require('net')
const parseRequest = require('./parseReq.js')
const createResponse = require('./createRes.js')
const route = require('./handlers/routeHandler')
const fetchResult = require('./handlers/requestHandler')

function requestHandler (data, socket) {
  const req = parseRequest(data.toString())
  const res = createResponse('HTTP/1.1', socket)
  fetchResult(req, res)
}

const tcpServer = net.createServer((socket) => {
  console.log('connected...')
  socket.on('data', (data) => {
    requestHandler(data, socket)
  })
})

// routes
route.get('/sayHello', (req, res) => {
  res.send('Hello')
})

route.get('/test', (req, res) => {
  res.send('test')
})

tcpServer.listen(5433, () => {
  console.log('server listening on port 5433')
})
