
const axios = require('axios')
const { runSafePromise } = require('../utils/runSafe')

/**
 * Class for using Practitest API
 * 
 * @class practitest
 */
class Practitest {

    constructor(){
        this.email = 'pscala@ips-yes.com'
        this.key = process.env.PRACTITEST_KEY
        this.url = 'https://api.practitest.com/api/v2/'
    
        this.auth = new Buffer.from(this.email + ':' + this.key).toString('base64')
    
        this.api = axios.create({
            baseURL: this.url,
            timeout: 2000,
            headers: {
                'Authorization': 'Basic ' + this.auth
            }
        })
    }
    

    /**
     * Get the list of projects
     * 
     * @returns Promise with list of projects
     * @memberof practitest
     */
    getProjects() {
        return runSafePromise(async () => {
            const res = await this.api.get('projects.json')
            return res.data
        })
    }

    /**
     * Get the custom fields for a project
     * 
     * @param {number} projectId Project Id to get custom fields for
     * @returns Promise with list of custom fields for project form Practitest
     * @memberof practitest
     */
    getCustomFields(projectId) {
        return runSafePromise(async () => {
            const res = await this.api.get('projects/' + projectId + '/custom_fields.json')
            return res.data
        })
    }
    
    /**
     * Get the test sets for a project
     * 
     * @param {any} projectId Project Id to get test sets for
     * @returns Promise with list of test sets for project form Practitest
     * @memberof practitest
     */
    getTestSets(projectId) {
        return runSafePromise(async () => {
            const res = await this.api.get('projects/' + projectId + '/sets.json')
            return res.data
        })
    }
    
    /**
     * Get the test instances for test set in a project
     * 
     * @param {any} projectId Project Id to get test instances for
     * @param {any} testSetId Test set id to get test instances for
     * @returns Promise with list of test instances
     * @memberof practitest
     */
    getTestSetInstances(projectId, testSetId) {
        return runSafePromise(async () => {
            const res = await this.api.get('projects/' + projectId + '/instances.json?set-ids=' + testSetId)
            return res.data
        })
    }
    
    /**
     * Get test for a project
     * 
     * @param {any} projectId Project Id to get test for
     * @param {any} testId Test Id
     * @returns Promise with test
     * @memberof practitest
     */
    getTest(projectId, testId) {
        return runSafePromise(async () => {
            const res = await this.api.get('projects/' + projectId + '/tests/' + testId + '.json')
            return res.data
        })
    }
    
    /**
     * Set run test for test instance
     * 
     * @param {any} projectId Project Id 
     * @param {any} instanceId Instance Id
     * @param {any} result Program result code. 0 for success
     * @param {any} out Program output
     * @returns Promise with response
     * @memberof practitest
     */
    runInstance(projectId, instanceId, result, out) {
        return runSafePromise(async () => {
            const res = await this.api.post('projects/' + projectId + '/runs.json', {
                'data': {
                    'type': 'instances',
                    'attributes': {                            
                        'instance-id': instanceId,
                        'exit-code': result, 
                        'automated-execution-output': out
                    }
                }
            })
            return res
        })
    }
}

module.exports = new Practitest()