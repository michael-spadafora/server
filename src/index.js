const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const RateLimit = require('express-rate-limit')
const api = require('./routes/api')

const socketController = require('./controllers/socketController')

//Variables
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000

//Setup rate limit
const limiter = new RateLimit({
    windowMs: 1*60*1000, //Window is 1 minute
    max: 100, //limit each IP to 100 requests per windowMs
    delayAfter: 20, //Begin slowing down responses after 20 request
    delayMs: 50 //Slow down each request by 50ms
  })

//Setup app
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(limiter)
app.use('/api', api)

//Socket.io
io.on('connection', function(socket){
  let socketCon = new socketController(socket)
  socketCon.setupSocket()
})

// Start server
http.listen(port, () => console.log('Server is listening on port ' + port))