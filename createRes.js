function setDate () {
  const today = new Date().toString()
  return today.slice(0, today.indexOf('-'))
}

function setHeader (body) {
  let header = {
    Date: setDate(),
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain'
  }

  let text = ''

  for (let fieldName in header) {
    text += fieldName + ': ' + header[fieldName] + '\r\n'
  }
  return text
}

function setStatus (protocol, statusCode, statusMessage) {
  return protocol + ' ' + statusCode + ' ' + statusMessage + '\r\n'
}

module.exports = (protocol, statusCode, statusMessage, body = '') => {
  let response = setStatus(protocol, statusCode, statusMessage) + setHeader(body) + '\r\n'
  if (body) response += body
  return response
}

console.log(setDate())
