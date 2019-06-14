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
  // const statusLine = setStatus(protocol, statusCode, statusMessage)
  const header = setHeader()

  function send (body, statusCode, statusMessage) {
    const statusLine = setStatus(protocol, statusCode, statusMessage)
    header['Content-Length'] = Buffer.byteLength(body)
    let headerLines = ''
    for (let fieldName in this.header) {
      headerLines += fieldName + ': ' + header[fieldName] + '\r\n'
    }

    // console.log(statusLine)
    let message = Buffer.from(statusLine + '\r\n' + headerLines + '\r\n')
    socket.write(Buffer.concat([message, body]))
  }

  return {
    header,
    send,
    socket
  }
}
