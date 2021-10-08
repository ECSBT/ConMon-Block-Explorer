const Influx = require('influx');

const client = new Influx.InfluxDB('http://user:pwd4user@172.18.0.10:8086/influxdb_node1')

function findLastBlock() {
    return new Promise((resolve, reject) => {
        const found = client.query(`SELECT * FROM "Blocks" ORDER BY time DESC LIMIT 1`)
        resolve(found)
    })
}

function findBlock(num) {
    return new Promise((resolve, reject) => {
        const found = client.query(`SELECT * FROM "Blocks" WHERE last_block = '${num}'`)
        resolve(found)
    })
}

function getMeasurements() {
    return new Promise((resolve, reject) => {
        const got = client.getSeries()
        resolve(got)
    })
}

module.exports = {
    findLastBlock,
    findBlock,
    getMeasurements
}