const Practitest = require('../practitestApi/practitest')
const { runSafePromise } = require('../utils/runSafe')

/**
 * Class for managing projects
 * 
 * @class projectController
 */
class TestSetController {

    /**
     * Gets the list of ALL test sets
     * 
     * @returns Promise with array of test sets
     * @memberof testSetController
     */
    getTestSets () {
        return runSafePromise(async () => {
            const projects = await Practitest.getProjects()
            const ids = []

            for (let i = 0; i< projects.data.length; i ++) {
                ids[i] =  projects.data[i].id
            }

            const data = []
            
            for (let i = 0; i < ids.length; i++){
                let res = await Practitest.getTestSets(ids[i]) //this is one single project
                for (let j = 0; j< res.data.length; j++) {
                    data.push ({
                        id: res.data[j].id, 
                        name: res.data[j].attributes.name, 
                        createdAt: res.data[j].attributes['created-at'],
                        updatedAt: res.data[j].attributes['updated-at'],
                        lastRunAt: res.data[j].attributes['last-run'],
                        instancesCount: res.data[j].attributes['instances-count']
                    })
                }
            }
            return data
        })
    }

    /**
     * Gets the list of test set instances
     * 
     * @returns Promise with array of test set instances
     * @memberof testSetController
     */
    getTestSetInstances (testSetID,projectID) {
        return runSafePromise(async () => {
            const res = await Practitest.getTestSetInstances(projectID, testSetID) 
            const data = []

            for (let i = 0; i< res.data.length; i ++) {
                data.push ({
                    id: res.data[i].id, 
                    testid: res.data[i].attributes['test-id'],
                    runstatus: res.data[i].attributes['run-status'],
                    name: res.data[i].attributes.name, 
                    createdAt: res.data[i].attributes['created-at'],
                    updatedAt: res.data[i].attributes['updated-at'],
                    lastRunAt: res.data[i].attributes['last-run'],
                    instancesCount: res.data[i].attributes['instances-count']
                })
            }

            return data
        })
    }
}

module.exports = new TestSetController()