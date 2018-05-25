const workerController = require('./workerController')
const runController = require('./runController')
class SocketController{
    constructor(socket){
        this.socket = socket
        this.nextRunId = 0
    }

    setupSocket() {
        let socket = this.socket
        let idnum = socket.handshake.query['id']
        if(typeof idnum === 'undefined') { 
            this.setupClient()
        }
        else {
            this.setupWorker(idnum)
        }
    }
    setupWorker(idnum) {
        let socket = this.socket
        let worker = workerController.getWorker(idnum)
        // console.log(worker)
        if(typeof worker !== 'undefined') {
            socket.to('clients').emit('newWorker', worker) //tells all clients that a new worker has registered
            workerController.setWorkerSocket(idnum, socket)
            
            /*
            TODO: Eventually make the worker search for a test to run immediately when connected
            we can do this by attaching one run controller to several workers
            */
           
           socket.on('finishedTest', function() {               
                if (worker.runController.runTest()!== -1) { //if this returns -1 then we are done w automated
                    if (worker.isFree === true){
                        socket.to('clients').emit('refresh')
                    }
                    worker.isFree = false
                } 
                else {
                    if (worker.isFree === false){
                        socket.to('clients').emit('refresh')
                    }
                    worker.isFree = true
                }
            })
            
            socket.on('disconnect', function() {
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
    
    setupClient(){
        let socket = this.socket
        console.log('client has connected')
        socket.join('clients') //join clients 
    
        socket.on('runWithWorker', function(data) { //client side
            let workerID = data.workerID
            let testSetID = data.testSetID
            let projectID = data.projectID
            let runcont = new runController(projectID, testSetID)
            runcont.runID = this.runID++

            workerController.attachRunControllerToWorker(workerID, runcont)
            let worker = workerController.getWorker(workerID)
            if (worker.runController.runTest()!== -1) { //if this returns -1 then we are done w automated
                worker.isFree = false
                socket.to('clients').emit('refresh')
            } 
            else {
                worker.isFree = true
            }
        })
    
        socket.on('disconnect', function() {
            console.log('client has disconnected')
        })
    }
}

module.exports = SocketController