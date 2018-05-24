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
    getTestSets (projectId) {
        return runSafePromise(async () => {
            const res = await Practitest.getTestSets(projectId) //this is one single item
            const data = []

            for (let i = 0; i< res.data.length; i ++) {
                data.push ({
                    id: res.data[i].id, 
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
                    projectId: res.data[i].attributes['project-id'],
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