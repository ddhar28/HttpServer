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
  return protocol + ' ' + statusCode + ' ' + statusMessage + '\r\n'
}

module.exports = (protocol, statusCode, statusMessage) => {
  const statusLine = setStatus(protocol, statusCode, statusMessage)
  const header = setHeader()

  function send (body) {
    header['Content-Length'] = Buffer.byteLength(body)
    let headerLines = ''
    for (let fieldName in this.header) {
      headerLines += fieldName + ': ' + header[fieldName] + '\r\n'
    }

    return statusLine + headerLines + '\r\n' + body
  }

  return {
    statusLine,
    header,
    send
  }
}
