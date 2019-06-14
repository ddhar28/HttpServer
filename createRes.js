function setDate () {
  const today = new Date().toString()
  return today.slice(0, today.indexOf('-'))
}

function setHeader () {
  let header = {
    Date: setDate(),
    'Content-Type': 'text/plain'
  }
  return header
}

function setStatus (protocol, statusCode, statusMessage) {
  return protocol + ' ' + statusCode + ' ' + statusMessage
}

module.exports = (protocol, statusCode, statusMessage, socket) => {
  const statusLine = setStatus(protocol, statusCode, statusMessage)
  const header = setHeader()

  function send (body) {
    // console.log('body is..', body)
    header['Content-Length'] = body.length
    let headerLines = ''
    for (let fieldName in this.header) {
      headerLines += fieldName + ': ' + header[fieldName] + '\r\n'
    }
    socket.write(statusLine + '\r\n' + headerLines + '\r\n' + body)
  }

  return {
    statusLine,
    header,
    send,
    socket
  }
}
