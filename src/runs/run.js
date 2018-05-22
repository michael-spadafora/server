const Practitest = require('../practitestApi/practitest')

class Run {
    
    constructor(projectID,testSetID){
        this.projectID = projectID 
        this.testset = testSetID

        let customFields = Practitest.getCustomFields(projectID)

        let isAutomatedID = ""
        let scriptID = ""
        let argsID = ""
        
        for (let i = 0; i < customFields.data.length; i++) {
            if (customFields.data[i].attributes.name === 'Automated') {
                isAutomatedID = customFields.data[i].attributes.id
            } 
            else if (customFields.data[i].attributes.name === 'Script') {
                scriptID = customFields.data[i].attributes.id
            } 
            else if (customFields.data[i].attributes.name === 'Parameters') {
                argsID = customFields.data[i].attributes.id
            }
        }

        if (isAutomatedID === null) {
            this.hasAutomatedTests = false
        }
        else {
            this.hasAutomatedTests = true  
        } 



        // if (this.hasAutomatedTests){
            isAutomatedID = "---f-" + isAutomatedID
            // use  ---f-customfieldnumber  "yes and no" in quotes
            let allTests = Practitest.getTestSetInstances(projectID, testSetID)

            this.tests = []
            this.automatedTests = []

            for (let i = 0; i < allTests.data.length; i++) {
                let currTestID = allTests.data[i].testid
                let currTest = Practitest.getTest(projectID, currTestID)
                if (this.hasAutomatedTests && currTest.attributes['custom-fields'][isAutomatedID] === "yes") { //checks if test is automated
                    this.automatedTests.push({ //pushes automated tests
                        id: currTestID,
                        script: currTest.attributes['custom-fields'][scriptID],
                        parameters: currTest.attributes['custom-fields'][argsID]
                    })
                }
                this.tests.push({ //pushes everything, regardless of if its automated or not
                    id: currTestID,
                    script: currTest.attributes['custom-fields'][scriptID],
                    parameters: currTest.attributes['custom-fields'][argsID]
                })
            }

            this.index = 0 
            this.automatedIndex = 0
    }
    
    
    getNextTest() {
        return runSafePromise(async () => {
            if (this.tests.index+1 === this.tests.length) {
                return null
            }

            this.index = this.index+1
            return this.tests[this.index-1]
        })
    }   

    getNextAutomatedTest() {
        return runSafePromise(async () => {
            if (this.automatedTests.automatedIndex+1 === this.automatedTests.length){
                return null
            }

            this.automatedIndex = this.automatedIndex+1
            return this.automatedTests[this.automatedIndex-1]
        })
    }   

    getAllTests() {
        return this.tests
    }

    getAutomatedTestsO() {
        return this.automatedTests

    }

    getautomatedTestsRemaining() {
        return this.automatedTests.slice(this.automatedIndex)
    }

    getautomatedTestsCompleted() {
        return this.automatedTests.slice(0, this.automatedIndex)
    }

    getTestsRemaining() {
        return this.tests.slice(this.index)
    }

    getTestsCompleted() {
        return this.tests.slice(0, this.index)
    }

}
module.exports = new Run()