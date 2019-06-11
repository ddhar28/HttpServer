const net = require('net')

const tcpServer = net.createServer((socket) => {
  console.log('connected...')

  socket.on('data', (data) => {
    console.log('received data from client: ' + data)
    socket.write('received back: ' + data)
  })
})

tcpServer.listen(5433, () => {
  console.log('server listening on port 5433')
})
