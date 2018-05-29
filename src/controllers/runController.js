// i will be receiving the project id and test set id


const Run = require('../runs/run')

class RunController {

    constructor (projectID, testSetID) {
        this.run = new Run(projectID, testSetID)
        this.designatedWorkers = []
    }

    removeDesignatedWorker(idnum) {
        for(let i = 0; i < this.designatedWorkers.length; i++){
            if (this.designatedWorkers[i].id === idnum){
                this.designatedWorkers.splice[i,1]
            }
        }
    }

    runTest(){
        if (this.designatedWorkers.length !== 1) {
            runTestsAuto()
        }
        else {
            sendTestsWithWorker()
        }
    }

    runTestsAuto(){
        /**
         * TODO
         */
    }

    /**
     * 
     */
    sendTestsWithWorker() {
        let test = this.run.getNextAutomatedTest()
        if (test === -1){
            //for all workers, remove this from workers
            for (let i = 0; i < this.designatedWorkers.length; i++){
                removeRunController(this, this.designatedWorkers[i])
            }
            return test
        }
        let item  = {
            id: test.id,
            script: test.script,
            parameters: test.parameters
        }
        
        let socket = this.designatedWorkers[0].socket
        socket.emit('nextTest', item)
    }
}

module.exports = RunController
