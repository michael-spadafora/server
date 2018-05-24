
class WorkerController {
    constructor(){
        this.workers = []
        this.nextID = 0
    }

    /**
     * adds a worker, and returns the next available ID number
     * @param {*} os the os of the worker to be set
     * @param {*} infos the capabilites of the worker to be set
     * @returns the ID number
     */
    addWorker(os, infos){
        //puts a new worker in the first available spot in the array
        // return runSafePromise(async () => {
            let capabilities = []
            for (let i  = 0; i < infos.length; i++) {
                capabilities.push(infos[i].name)
            }
            let worker = {
                id:this.nextID, 
                os: os,
                capabilities: capabilities,
                isFree: true,
                socket: null
            }

            for (let i = 0 ;  i < this.workers.length; i++) { //skips over this if empty
                if (this.workers[i].isDefunct) {
                    this.workers[i] = worker
                    return this.nextID++
                }
            }

            this.workers.push(worker)
            return this.nextID++ //this will be the worker's id, starting at 0
        // })
    }

    /**
     * returns first free worker which matches specs sent to it. blocks if workers match specs, but not free. returns -1 if no workers match specs available
     * currently breaks if the match disconnects while this is waiting for it
     * @returns the ID of the first free worker which matches specs sent to it, or -1 if none are available
     */
    //TODO: UPDATE TO MAKE ASYNC
    assignWorker(info){ 
        // return runSafePromise(async () => {
            while (true) {
                let allMatches = this.getAllMatchingWorkers(info) //might need to set timeout
            
                if (allMatches.length === 0) {
                    return -1
                }
                for (let i = 0; i < allMatches.length; i++) {
                    if (this.workers[allMatches[i]].isFree === true) {
                        this.workers[allMatches[i]].isFree = false
                        console.log(this.workers[i].id)
                        return this.workers[i].id
                    }
                }
            }
        // })
    }

    
    /**
     * returns an array of workers which have the os required, as well as the capabilites required
     * @param {*} os the operating system required to run this test
     * @param {*} capabilities the capabilities which are required to run this test
     */
    getAllMatchingWorkers(os,capabilities){
        let info = []

        for (let i = 0; i< capabilities.length; i++) {
            info.push(capabilities[i].name)
        }
        let allMatches = []

        for (let i = 0 ; i < this.workers.length; i++) {
            if (os !== this.workers[i].os) continue

            if (info.every(val => this.workers[i].capabilities.indexOf(val) >= 0)) { //checks if info is subset of current worker's info
                allMatches.push(i)
            }
        }
        return allMatches
    }

    getAllAvailableWorkers(){
        let avWorkers = []
        for (let i = 0; i < this.workers.length; i++){
            if (this.workers[i].isFree === true){
                avWorkers.push(this.workers[i])
            }
        }
        return avWorkers
    }

    getAllWorkers(){
        let avWorkers = []
        for (let i = 0; i < this.workers.length; i++){
                avWorkers.push(this.workers[i])
        }
        return avWorkers
    }

    /**
     * returns the worker corresponding to the id number sent 
     * @param {*} id the id number of the worker which is desired
     */
    getWorker(id){
            let idnum = parseInt(id)
        for (let i = 0 ; i < this.workers.length; i++) {
            if (idnum === this.workers[i].id) { 
                return this.workers[i]
            }
        }
    }

    /**
     * stores a socket in a worker
     * @param {*} id the id of the worker corresponding to the socket to be set
     * @param {*} socket the socket which should be stored in the worker with id of id
     */
    setWorkerSocket(id, socket){
        let idnum = parseInt(id)

        for (let i = 0 ; i < this.workers.length; i++){
            if (this.workers[i].id === idnum){
                console.log("socket attatched to " + idnum + " successfully")
                this.workers[i].socket = socket
                return
            }  
        }

    }

    /**
     * frees a worker, making them available for future work
     * @param {number} idnum the id number of the worker to be freed
     */
    freeWorker(idnum){ //sets a worker as freed
        for (let i = 0 ; i < this.workers.length; i++) {
            if (this.workers[i].id === idnum)
                this.workers[i].isFree = true
                return
        }
    }
    /**
     * removes a worker from the array of available workers
     * @param {number} idnum the number of the worker to be removed
     */
    removeWorker(idnum){ //removes a worker from the array
        idnum = parseInt(idnum)
        for (let i = 0 ; i < this.workers.length; i++) {
            if (this.workers[i].id === idnum) {
                this.workers.splice(i,1)
                return idnum
            } 
        }
    }
}
module.exports = new WorkerController()
