// i will be receiving the project id and test set id

const workerController = require('./workerController')
const Run = require('../runs/run')

class RunController {
    constructor (projectID, testSetID){
        this.run = new Run(projectID, testSetID)
    }

    runAllAutomatedTests() {
        let nextTest = this.run.getNextAutomatedTest
        while (nextTest !== -1) {
            // let nextTest = this.run.getNextAutomatedTest //has id, parameters, script
            worker = workerController.assignWorker([]) //no info for now. change [] to real info when ready
            //todo: wait until current test is done
            nextTest = this.run.getNextAutomatedTest
            if (worker === -1 ) {
                continue 
            }
            worker.attach(nextTest)
        } 
    }


    //we will need to use our workercontroller to schedule runs of specific tests
    //
}

module.exports = RunController
