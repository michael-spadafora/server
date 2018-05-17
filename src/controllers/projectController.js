const Practitest = require('../practitestApi/practitest')
const { runSafePromise } = require('../utils/runSafe')

/**
 * Class for managing projects
 * 
 * @class projectController
 */
class projectController {

    /**
     * Gets the list of projects
     * 
     * @returns Promise with array of projects
     * @memberof projectController
     */
    getProjects () {
        return runSafePromise(async () => {
            const res = await Practitest.getProjects()
            const data = []

            for (let i = 0; i< res.data.length; i ++) {
                data.push ({
                    id: res.data[i].id, 
                    name: res.data[i].attributes.name, 
                    createdAt: res.data[i].attributes['created-at']
                })
            }

            return data
        })
    }

    /**
     * Gets the list of test sets
     * 
     * @returns Promise with array of test sets
     * @memberof projectController
     */
    getTestSets (projectId) {
        return runSafePromise(async () => {
            const res = await Practitest.getTestSets(projectId)
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
}

module.exports = new projectController()