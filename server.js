const net = require('net')
const parseRequest = require('./parseReq.js')
const createResponse = require('./createRes.js')
const route = require('./routeHandler')
let req
let res

function requestHandler (data, socket) {
  req = parseRequest(data.toString())
  res = createResponse('HTTP/1.1', socket)
  route.execute(req, res)
}

const tcpServer = net.createServer((socket) => {
  console.log('connected...')
  socket.on('data', (data) => {
    requestHandler(data, socket)
  })
})

// routes
route.get('/sayHello', (req, res) => { res.send('Hello') })

tcpServer.listen(5433, () => {
  console.log('server listening on port 5433')
})
