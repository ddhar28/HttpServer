function setDate () {
  const today = new Date().toString()
  return today.slice(0, today.indexOf('-'))
}

function setHeader () {
  let header = {
    Date: setDate()
  }
  return header
}

function setStatus (protocol, statusCode, statusMessage) {
  return protocol + ' ' + statusCode + ' ' + statusMessage
}

module.exports = (protocol, socket) => {
  const header = setHeader()

  function send (body, statusCode = 200, statusMessage = 'OK') {
    if (typeof body === 'string') body = Buffer.from(body)

    const statusLine = setStatus(protocol, statusCode, statusMessage)
    header['Content-Length'] = Buffer.byteLength(body)
    let headerLines = ''
    for (let fieldName in this.header) {
      headerLines += fieldName + ': ' + header[fieldName] + '\r\n'
    }

    let message = Buffer.from(statusLine + '\r\n' + headerLines + '\r\n')
    socket.write(Buffer.concat([message, body]))
  }

  return {
    header,
    send,
    socket
  }
}
