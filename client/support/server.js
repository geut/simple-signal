var io = require('socket.io')()
var SimpleSignalServer = require('./../../server/src/index')
var signal = new SimpleSignalServer(io)

var PORT = 3000

signal.on('request', function (request) {
  console.log('request', request)
  if (request.metadata.redirect) {
    request.forward(request.metadata.redirect)
  } else {
    request.forward()
  }
})

signal.on('discover', function (request) {
  console.log('discover', request)
  request.discover('abc' + Math.random(), 'discovery metadata')
})

console.log('test server running on port ' + PORT)
io.listen(PORT)