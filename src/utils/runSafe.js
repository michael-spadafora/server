const Promise = require('bluebird')

/**
 * Executes a code block inside a promise inside a try catch
 * 
 * @param {function} reject Promise reject call back
 * @param {callback} block Function to run inside try catch
 */
const runSafe = async (reject, block) => {
    try {
        await block()
    }
    catch (e){
        reject(e)
    } 
}

/**
 * Executes a code block inside a promise inside a try catch and returns a promise
 * 
 * @param {callback} block Function to run inside try catch inside a promise
 * @returns A promise
 */
const runSafePromise = (block) => {
    return new Promise(async (resolve, reject) => {
        runSafe(reject, async () => {
            resolve(block())
        })
    })
}

module.exports = { runSafe, runSafePromise }