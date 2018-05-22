//information about the worker will be sent to me

//i will assign the worker a number (their index in our worker array)
//and send that number back to them

class WorkerController {
    constructor(){
        this.workers = []
    }

    addWorker(info){
        return runSafePromise(async () => {
            let worker = new Worker(info)

            this.workers.push(worker)
            return this.workers.length //this will be the worker's id, starting at 1
        })
    }
}
module.exports = new WorkerController()
