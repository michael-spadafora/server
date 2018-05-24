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

        if (isAutomatedID === "") {
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
        return runSafePromise(async () => {
            if (this.automatedTests.automatedIndex+1 === this.automatedTests.length){
                return -1
            }

            this.automatedIndex = this.automatedIndex+1
            return this.automatedTests[this.automatedIndex-1]
        })
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

}
module.exports = Run