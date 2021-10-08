const Client = require('../models/influxModel')

async function getLastBlockData(req, res) {
    try {
        const blockData = await Client.findLastBlock()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(blockData))
    } catch (error) {
        console.log(error)
    }
}

async function getBlockData(req, res, num) {
    try {
        const blockData = await Client.findBlock(num)

        if(!blockData) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Block Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(blockData))
        }
    } catch (error) {
        console.log(error)
    }
}

async function getMeasurements(req, res) {
    try {
        const measurements = await Client.getMeasurements()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(measurements))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLastBlockData,
    getBlockData,
    getMeasurements
}