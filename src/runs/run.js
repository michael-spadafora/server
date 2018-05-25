const Practitest = require('../practitestApi/practitest')

class Run { //has tests
    
    constructor(projectID,testSetID){
        this.projectID = projectID 
        this.testset = testSetID
        this.worker = -1 //may have a designated worker

        let automatedAndAllTests = retrieveTests(projectID, testSetID)

        this.automatedTests = automatedAndAllTests[0]
        this.tests = automatedAndAllTests[1]

        this.index = 0 
        this.automatedIndex = 0
    }

    retrieveTests(projectID, testSetID){
        let customFields = Practitest.getCustomFields(projectID)
        let isAutomatedID = ""
        let scriptID = ""
        let argsID = ""
        let hasAutomatedTests = ""
        
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

        if (isAutomatedID === "") {
            hasAutomatedTests = false
        }
        else {
            hasAutomatedTests = true  
        } 

        isAutomatedID = "---f-" + isAutomatedID
        // use  ---f-customfieldnumber  "yes and no" in quotes
        let allTests = Practitest.getTestSetInstances(projectID, testSetID)

        let tests = []
        let automatedTests = []

        for (let i = 0; i < allTests.data.length; i++) {
            let currTestID = allTests.data[i].testid``
            let currTest = Practitest.getTest(projectID, currTestID)
            let item = {
                id: currTestID,
                script: currTest.attributes['custom-fields'][scriptID],
                parameters: currTest.attributes['custom-fields'][argsID]
            }
            if (hasAutomatedTests && currTest.attributes['custom-fields'][isAutomatedID] === "yes") { //checks if test is automated
                automatedTests.push(item)
            }
            tests.push(item)
        }

        let ret = []
        ret.push(automatedTests)
        ret.push(tests)

        return ret
    }
    
    /**
     * returns the next test, or -1 if there are none. not to be used with getNextAutomatedTest()
     */
    getNextTest() {
        return runSafePromise(async () => {
            if (this.tests.index+1 === this.tests.length) {
                return -1
            }

            this.index = this.index+1
            return this.tests[this.index-1]
        })
    }   

    /**
     * returns the next automated test, or -1 if there are none. not to be used with getNextTest()
     */
    getNextAutomatedTest() {
            if (this.automatedTests.automatedIndex+1 === this.automatedTests.length){
                return -1
            }

            this.automatedIndex = this.automatedIndex+1
            return this.automatedTests[this.automatedIndex-1]
        
    }   

    /**
     * returns all tests
     */
    getAllTests() {
        return this.tests
    }

    /**
     * returns all automated tests
     */
    getAutomatedTests() {
        return this.automatedTests
    }

    /**
     * returns all the automated tests which have not been executed
     */
    getautomatedTestsRemaining() {
        return this.automatedTests.slice(this.automatedIndex)
    }

    /**
     * returns the completed tests
     */
    getautomatedTestsCompleted() {
        return this.automatedTests.slice(0, this.automatedIndex)
    }

    /**
     * returns the tests remaining
     */
    getTestsRemaining() {
        return this.tests.slice(this.index)
    }

    /**
     * returns all completed tests
     */
    getTestsCompleted() {
        return this.tests.slice(0, this.index)
    }

    setDesignatedWorker(worker){
        this.worker = worker
    }

}
module.exports = Run