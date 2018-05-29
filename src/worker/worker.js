
class Worker{
    constructor(ID, os, capabilities){
        this.id = ID
        this.os = os
        this.capabilities = capabilities
        this.isFree = true
        this.socket = null
        this.runControllers = []
    }


    addRunController(runController){
        this.runControllers.push(runController)
    }

    removeRunController(runController){
        for (let i = 0; i < this.runControllers.length;i++){
            if (this.runControllers[i] === runController){
                this.runControllers.splice(i,1)
                return
            }
        }
        
    }
}

module.exports = Worker