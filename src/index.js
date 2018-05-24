const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const RateLimit = require('express-rate-limit')
const api = require('./routes/api')
const workerController = require('./controllers/workerController')


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
  
  let idnum = socket.handshake.query['id']

  //if client is user, not worker 
  if(typeof idnum === 'undefined') { 
    console.log('client has connected')
    socket.join('clients') //join clients 

    socket.on('disconnect', function(){
      console.log('client has disconnected')
    })
  }

  //if user is worker
  else {
    let worker = workerController.getWorker(idnum)
      if(typeof worker !== 'undefined') {
        workerController.setWorkerSocket(idnum, socket)
        socket.to('clients').emit('newWorker', worker) //tells all clients that a new worker has registered

        socket.on('disconnect', function(){
          let removedNum = workerController.removeWorker(idnum) //returns the id number
          socket.to('clients').emit('endWorker', idnum) //tells all clients that worker with this id has disconnected
          console.log('worker with id  ' + removedNum + ' has disconnected')
        })
      }
      
    else {
      //occurs if attempt to connect happens by an unregistered worker number
      console.error('id ' + idnum + ' is not a valid worker id number') 
    }
  }
})


// Start server
http.listen(port, () => console.log('Server is listening on port ' + port))